const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, authByRole } = require("../middlewares/auth");

// Public
router.post("/register", userController.register);
router.post("/login", userController.login);

// Admin (peut créer un autre utilisateur)
router.post("/createUser", protect, authByRole("admin"), userController.createUser);

// Protégées
router.get("/all", protect, authByRole("admin"), userController.getAllUsers);
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, authByRole("admin"), userController.deleteUser);

module.exports = router;
