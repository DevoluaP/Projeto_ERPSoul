const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel.js");
const TokenModel = require("../models/TokenModel.js");
const { encrypt } = require("../utils/encrypt.js");
const { validationResult } = require("express-validator");
const { isValidEmail, isValidCpfCnpj } = require("../utils/validators.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, senha, conectado } = req.body;

  if (email.length > 250 || senha.length > 60) {
    return res.status(400).json({ mensagem: "Credenciais inválidas!" });
  }

  try {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ mensagem: "E-mail e/ou Senha inválido!" });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ mensagem: "E-mail e/ou Senha inválido!" });
    }

    await TokenModel.removeAllByUser(user.id_usuario);

    const expiresIn = conectado ? "7d" : "1d";
    const token = jwt.sign({ userId: user.id_usuario }, JWT_SECRET, {
      expiresIn,
    });

    await TokenModel.create(token, expiresIn, user.id_usuario);

    return res.json({ mensagem: "Usuário logado com sucesso!", token });
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
};

exports.logout = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ mensagem: "Acesso negado!" });
  }

  try {
    const removeToken = await TokenModel.remove(token);

    if (removeToken.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Token não encontrado." });
    } else {
      return res.json({ mensagem: "Usuário desconectado com sucesso!" });
    }
  } catch (err) {
    console.error("Erro ao desconectar usuário:", err);
    res.status(500).json({ erro: "Erro ao desconectar usuário" });
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nome, email, senha, cpfOuCnpj, telefone, cargo, faturamento } =
    req.body;

  if (!nome || !email || !senha || !cpfOuCnpj || !telefone || !cargo) {
    return res
      .status(400)
      .json({ mensagem: "Preencha todos os campos requeridos!" });
  }

  if (nome.length > 50 || nome.length < 1) {
    return res.status(400).json({ mensagem: "Nome inválido!" });
  }

  if (email.length > 250 || (email.length > 0 && !isValidEmail(email))) {
    return res.status(400).json({ mensagem: "E-mail inválido!" });
  }

  if (senha.length > 60) {
    return res.status(400).json({ mensagem: "Senha inválida!" });
  }

  if (!isValidCpfCnpj(cpfOuCnpj)) {
    return res.status(400).json({ mensagem: "CPF ou CNPJ inválido!" });
  }

  if (telefone.length > 14) {
    return res.status(400).json({ mensagem: "Telefone inválido!" });
  }

  if (cargo.length > 50) {
    return res.status(400).json({ mensagem: "Cargo inválido!" });
  }

  if (faturamento && faturamento.length > 16) {
    return res.status(400).json({ mensagem: "Faturamento inválido!" });
  }

  try {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar usuário!" });
    }

    const { cryptPass, cryptHash } = await encrypt(senha);
    const newUserId = await UserModel.create({
      nome,
      email,
      senha: cryptPass,
      hash: cryptHash,
      cpfOuCnpj,
      telefone,
      cargo,
      faturamento: faturamento || "",
    });

    const expiresIn = "1d";
    const token = jwt.sign({ userId: newUserId }, JWT_SECRET, { expiresIn });
    await TokenModel.create(token, expiresIn, newUserId);

    return res.json({ mensagem: "Usuário cadastrado com sucesso!", token });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email, cpfCnpj } = req.body;

  if (!email || !cpfCnpj) {
    return res.status(400).json({ mensagem: "Preencha todos os campos!" });
  }

  if (email.length > 250) {
    return res.status(400).json({ mensagem: "E-mail inválido!" });
  }

  if (cpfCnpj.length > 18) {
    return res.status(400).json({ mensagem: "CPF/CNPJ inválido!" });
  }

  try {
    const user = await UserModel.findByEmailAndCpfCnpj(email, cpfCnpj);
    if (!user) {
      return res.status(404).json({ mensagem: "Credenciais inválidas!" });
    }

    return res.json({ 
      mensagem: "Credenciais válidas!",
      idRec: user.hash
    });
  } catch (err) {
    console.error("Erro ao verificar credenciais:", err);
    res.status(500).json({ erro: "Erro ao verificar credenciais" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, senha, confSenha, idRec } = req.body;

  if (senha !== confSenha) {
    return res.status(400).json({ mensagem: "As senhas são diferentes!" });
  }

  if (email.length > 250 || senha.length > 60 || confSenha.length > 60) {
    return res.status(400).json({ mensagem: "Credenciais inválidas!" });
  }

  try {
    const user = await UserModel.findByEmailAndHash(email, idRec);
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário inválido!" });
    }

    const { cryptPass, cryptHash } = await encrypt(senha);
    const updatePassword = await UserModel.updatePassword(
      cryptPass,
      cryptHash,
      user.id_usuario,
    );

    if (updatePassword.affectedRows > 0) {
      return res.json({ mensagem: "Senha alterada com sucesso!" });
    } else {
      return res.status(500).json({ erro: "Erro ao alterar a senha" });
    }
  } catch (err) {
    console.error("Erro ao alterar a senha:", err);
    res.status(500).json({ erro: "Erro ao alterar a senha" });
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas imagens são permitidas!"));
    }
  },
});
exports.updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { nome, removeFoto } = req.body;

  if (!nome || nome.trim().length === 0) {
    return res.status(400).json({ mensagem: "O nome não pode ficar vazio!" });
  }

  if (nome.length > 50) {
    return res.status(400).json({ mensagem: "Nome inválido!" });
  }

  try {
    let fotoBuffer = undefined;

    if (removeFoto === "true") {
      fotoBuffer = null;
    } else if (req.file) {
      fotoBuffer = req.file.buffer;
    }

    await UserModel.updateProfile(userId, nome.trim(), fotoBuffer);
    const updatedUser = await UserModel.findById(userId);

    if (!updatedUser) {
      return res.status(404).json({ mensagem: "Usuário não encontrado!" });
    }

    let fotoBase64 = null;
    if (updatedUser.foto) {
      fotoBase64 = `data:image/jpeg;base64,${updatedUser.foto.toString("base64")}`;
    }

    return res.json({
      mensagem: "Perfil atualizado com sucesso!",
      user: {
        nome: updatedUser.nome,
        email: updatedUser.email,
        foto: fotoBase64,
      },
    });
  } catch (err) {
    console.error("Erro ao atualizar perfil:", err);
    res.status(500).json({ erro: "Erro ao atualizar perfil" });
  }
};
exports.uploadFoto = upload.single("foto");
