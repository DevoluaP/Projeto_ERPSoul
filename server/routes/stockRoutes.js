const express = require("express");
const { body } = require("express-validator");
const { authenticate } = require("../middlewares/auth.js");
const {
  registerProduct,
  getProducts,
  editProduct,
  deleteProduct,
  reportsProducts,
  exportReportsProducts,
} = require("../controllers/StockController.js");

const router = express.Router();

const validateProduct = [
  body("nome")
    .notEmpty().withMessage("Nome é obrigatório")
    .trim()
    .isLength({ max: 50 }).withMessage("Nome deve ter no máximo 50 caracteres"),

  body("marca")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 }).withMessage("Marca deve ter no máximo 50 caracteres"),

  body("preco_custo")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 }).withMessage("Preço de custo deve ser maior ou igual a zero"),

  body("preco_venda")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0.01 }).withMessage("Preço de venda deve ser maior que zero"),

  body("producao")
    .notEmpty().withMessage("Tipo de produção é obrigatório")
    .isIn([1, 2]).withMessage("Tipo de produção inválido"),

  body("status")
    .notEmpty().withMessage("Status é obrigatório")
    .isIn([1, 2, 7]).withMessage("Status inválido"),

  body("sku")
    .notEmpty().withMessage("SKU é obrigatório")
    .trim()
    .isLength({ max: 50 }).withMessage("SKU deve ter no máximo 50 caracteres"),

  body("codigo")
    .notEmpty().withMessage("Código de barras é obrigatório")
    .trim()
    .isLength({ max: 50 }).withMessage("Código de barras deve ter no máximo 50 caracteres"),

  body("quantidade")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 }).withMessage("Quantidade deve ser maior ou igual a zero"),

  body("dt_validade")
    .optional({ checkFalsy: true })
    .isDate().withMessage("Data de validade inválida"),

  body("descricao")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 250 }).withMessage("Descrição deve ter no máximo 250 caracteres"),
];

router.post("/register", authenticate, validateProduct, registerProduct);
router.get("/productsRegistered", authenticate, getProducts);
router.put("/productsRegistered/:id_produto/edit", validateProduct, editProduct);
router.put("/productsRegistered/:id_produto/delete", deleteProduct);
router.post("/reports", authenticate, reportsProducts);
router.post("/exportReports", exportReportsProducts);

module.exports = router;
