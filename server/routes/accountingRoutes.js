const express = require("express");
const { body } = require("express-validator");
const { authenticate } = require("../middlewares/auth.js");
const {
  registerAccount,
  getAccounts,
  editAccount,
  deleteAccount,
  exportAccounts,
} = require("../controllers/AccountingController.js");

const router = express.Router();

const validateAccount = [
  body("tipo_conta")
    .notEmpty().withMessage("Tipo de conta é obrigatório")
    .isIn(["1", "2"]).withMessage("Tipo de conta inválido"),

  body("fornecedor_cliente")
    .notEmpty().withMessage("Fornecedor/Cliente é obrigatório")
    .trim()
    .isLength({ min: 3, max: 50 }).withMessage("Fornecedor/Cliente deve ter entre 3 e 50 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/).withMessage("Fornecedor/Cliente deve conter apenas letras"),

  body("valor")
    .notEmpty().withMessage("Valor é obrigatório")
    .isFloat({ min: 0.01 }).withMessage("Valor deve ser maior que zero"),

  body("numero_documento")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 30 }).withMessage("Número do documento deve ter no máximo 30 caracteres"),

  body("competencia")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 }).withMessage("Competência deve ter no máximo 50 caracteres"),

  body("dt_vencimento")
    .notEmpty().withMessage("Data de vencimento é obrigatória")
    .isDate().withMessage("Data de vencimento inválida"),

  body("dt_pagamento")
    .optional({ checkFalsy: true })
    .isDate().withMessage("Data de pagamento inválida"),

  body("forma_pagamento")
    .optional({ checkFalsy: true })
    .isIn(["1", "2", "3", "4", "5"]).withMessage("Forma de pagamento inválida"),

  body("status")
    .notEmpty().withMessage("Status é obrigatório")
    .isIn(["4", "3", "5", "6"]).withMessage("Status inválido")
    .custom((value, { req }) => {
      if (value === "3" && !req.body.dt_pagamento) {
        throw new Error("Data de pagamento é obrigatória para contas pagas");
      }

      if ((req.body.dt_pagamento || req.body.forma_pagamento) && value !== "3") {
        throw new Error("Contas com data de pagamento ou forma de pagamento devem ter status 'Pago'");
      }

      return true;
    }),

  body("observacoes")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 250 }).withMessage("Observações deve ter no máximo 250 caracteres"),
];

router.post("/register", authenticate, validateAccount, registerAccount);
router.get("/accountsRegistered", authenticate, getAccounts);
router.put("/accountsRegistered/:id_conta/edit", validateAccount, editAccount);
router.put("/accountsRegistered/:id_conta/delete", deleteAccount);
router.post("/exportAccounts", authenticate, exportAccounts);

module.exports = router;
