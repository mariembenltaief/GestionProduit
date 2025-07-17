const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/categorieController");

// Les routes fixes d’abord
router.post("/", categorieController.createCategorie); // POST /api/categories
router.get("/", categorieController.getAllCategories); // GET /api/categories

// Les routes avec ID ensuite
router.get("/:id", categorieController.getCategorieById);
router.put("/:id", categorieController.updateCategorie);
router.delete("/:id", categorieController.deleteCategorie);

module.exports = router;
