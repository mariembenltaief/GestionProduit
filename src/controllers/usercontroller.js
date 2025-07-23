const jwt = require('jsonwebtoken');
const User = require("../models/User");

// Génération du token JWT
const genereteToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Enregistrement public - rôle forcé à "client"
exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, mdp, adresse, statut,role } = req.body;

    const user = new User({
      nom,
      prenom,
      email,
      mdp,
      adresse,
      statut,
      role // rôle forcé pour éviter qu'un inscrit devienne admin
    });

    await user.save();
    const token = genereteToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Modifier le profil de l'utilisateur connecté
exports.updateProfile = async (req, res) => {
  try {
    // req.user._id est défini par authenticateToken
    const userId = req.user._id;

    // Met à jour l'utilisateur avec les données reçues dans req.body
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,              // Renvoie le document mis à jour
      runValidators: true,    // Valide les champs selon le schéma
      select: '-mdp'          // Ne pas renvoyer le mot de passe
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({
      message: "Profil mis à jour avec succès",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour du profil",
      error: err.message,
    });
  }
};

// Connexion utilisateur
exports.login = async (req, res) => {
  try {
    const { email, mdp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.mdp !== mdp) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    const token = genereteToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Création utilisateur (admin uniquement) - rôle pris en compte ou par défaut "client"
exports.createUser = async (req, res) => {
  try {
    const { nom, prenom, email, mdp, adresse, statut, role } = req.body;

    const user = new User({
      nom,
      prenom,
      email,
      mdp,
      adresse,
      statut,
      role  // rôle depuis la requête sinon "client"
    });

    await user.save();
    const token = genereteToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lister tous les utilisateurs (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier un utilisateur
exports.updateUser = async (req, res) => {
  try {
    // Exemple simple : autoriser modification role si tu veux (ajoute contrôle si besoin)
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un utilisateur (admin)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
