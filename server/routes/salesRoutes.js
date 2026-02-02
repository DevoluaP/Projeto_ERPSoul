const express = require("express");
const { body } = require("express-validator");
const { authenticate } = require("../middlewares/auth.js");
const {
  registerSale,
  getSales,
  editSale,
  deleteSale,
  reportsSales,
} = require("../controllers/SalesController.js");

const router = express.Router();

const validateSale = [
  body("id_cliente")
    .notEmpty().withMessage("Cliente é obrigatório")
    .isInt().withMessage("Cliente inválido"),

  body("itens")
    .notEmpty().withMessage("Itens são obrigatórios")
    .isArray({ min: 1 }).withMessage("Adicione pelo menos um item"),

  body("itens.*.id_produto")
    .notEmpty().withMessage("Produto é obrigatório")
    .isInt().withMessage("Produto inválido"),

  body("itens.*.quantidade")
    .notEmpty().withMessage("Quantidade é obrigatória")
    .isFloat({ min: 0.01 }).withMessage("Quantidade deve ser maior que zero"),

  body("itens.*.preco_unitario")
    .notEmpty().withMessage("Preço unitário é obrigatório")
    .isFloat({ min: 0.01 }).withMessage("Preço deve ser maior que zero"),

  body("data_venda")
    .notEmpty().withMessage("Data da venda é obrigatória")
    .isDate().withMessage("Data inválida"),

  body("id_forma_pagamento")
    .if(body("id_status").equals("3")).notEmpty().withMessage("Forma de pagamento é obrigatória")
    .isIn([1, 2, 3, 4, 5]).withMessage("Forma de pagamento inválida"),

  body("id_status")
    .notEmpty().withMessage("Status é obrigatório")
    .isIn([3, 4, 6, 8]).withMessage("Status inválido"),

  body("observacoes")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 250 }).withMessage("Observações deve ter no máximo 500 caracteres"),

  body("valor_total")
    .notEmpty().withMessage("Valor total é obrigatório")
    .isFloat({ min: 0.01 }).withMessage("Valor total deve ser maior que zero"),
];

router.post("/register", authenticate, validateSale, registerSale);
router.get("/salesRegistered", authenticate, getSales);
router.put("/salesRegistered/:id_venda/edit", validateSale, editSale);
router.put("/salesRegistered/:id_venda/delete", deleteSale);
router.post("/reports", authenticate, reportsSales);

module.exports = router;
