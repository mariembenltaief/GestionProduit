const express = require("express");
const router = express.Router();
const produitController = require("../controllers/produitController");
const { protect, authByRole } = require("../middlewares/auth");

router.post("/", produitController.createProduit);
router.get("/",protect, produitController.getAllProduits);
router.get("/:id", produitController.getProduitById);
router.put("/:id", produitController.updateProduit);
router.delete("/:id", produitController.deleteProduit);

module.exports = router;
