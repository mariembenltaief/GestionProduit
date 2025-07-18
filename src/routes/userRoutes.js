const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, authByRole } = require("../middlewares/auth");

// Public
router.post("/register", userController.register);
router.post("/login", userController.login);

// Admin (peut créer un autre utilisateur)
router.post("/createUser", authenticateToken, authByRole("admin"), userController.createUser);

router.put("/updateprofil", authenticateToken, userController.updateProfile);
// Protégées
router.get("/all", authenticateToken,authByRole("admin"), userController.getAllUsers);
router.get("/:id", authenticateToken, userController.getUserById);
router.put("/:id", authenticateToken, userController.updateUser);
router.delete("/:id", authenticateToken,authByRole("admin"), userController.deleteUser);

module.exports = router;
