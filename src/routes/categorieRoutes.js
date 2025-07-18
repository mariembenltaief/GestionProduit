const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/categorieController");
const { authenticateToken, authByRole } = require("../middlewares/auth");

// Les routes fixes d’abord
router.post("/",authenticateToken, authByRole("admin"), categorieController.createCategorie); // POST /api/categories
router.get("/", categorieController.getAllCategories); // GET /api/categories

// Les routes avec ID ensuite
router.get("/:id", categorieController.getCategorieById);
router.put("/:id",authenticateToken, authByRole("admin"), categorieController.updateCategorie);
router.delete("/:id",authenticateToken, authByRole("admin"), categorieController.deleteCategorie);

module.exports = router;
