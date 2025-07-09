const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

console.log("🔍 DEBUG .env");
console.log("PORT =", process.env.PORT);
console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.log('❌ Erreur connexion MongoDB:', err));

app.get('/', (req, res) => res.send('Backend opérationnel'));
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT}`);
});
