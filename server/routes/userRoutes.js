const express = require("express");
const { check } = require("express-validator");
const { loginLimiter } = require("../middlewares/loginLimiter.js");
const {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  uploadFoto,
  updateProfile,
} = require("../controllers/UserController.js");
const { authenticate } = require("../middlewares/auth.js");

const router = express.Router();

router.post(
  "/login",
  loginLimiter,
  [
    check("email").isEmail().withMessage("Credenciais inválidas!")
    .normalizeEmail(),
    check("senha").notEmpty().withMessage("Preencha todos os campos!"),
    check("senha").trim().escape(),
  ],
  login,
);

router.put("/logout", logout);

router.post(
  "/register",
  [
    check("nome").notEmpty().withMessage("Preencha todos os campos requeridos!")
    .trim(),
    check("email").isEmail().withMessage("E-mail inválido!").normalizeEmail(),
    check("senha").notEmpty().withMessage("Preencha todos os campos requeridos!"),
    check("cpfOuCnpj").notEmpty().withMessage("Preencha todos os campos requeridos!"),
    check("telefone").notEmpty().withMessage("Preencha todos os campos requeridos!"),
    check("cargo").notEmpty().withMessage("Preencha todos os campos requeridos!")
    .trim(),
    check("faturamento").optional({ checkFalsy: true })
    .isNumeric().withMessage("Faturamento inválido!"),
  ],
  register,
);

router.post(
  "/forgot-password",
  [
    check("email").isEmail().withMessage("E-mail inválido!"),
    check("cpfCnpj").notEmpty().withMessage("Preencha todos os campos!"),
  ],
  forgotPassword,
);

router.post(
  "/reset-password",
  [
    check("email").isEmail().withMessage("E-mail inválido!"),
    check("senha").notEmpty().withMessage("Preencha todos os campos!"),
    check("confSenha").notEmpty().withMessage("Preencha todos os campos!"),
    check("idRec").notEmpty().withMessage("Não é possível alterar a senha!"),
  ],
  resetPassword,
);

router.put(
  "/update-profile",
  authenticate,
  uploadFoto,
  [
    check("nome").notEmpty().withMessage("O nome não pode ficar vazio!")
    .trim(),
  ],
  updateProfile,
);

module.exports = router;
