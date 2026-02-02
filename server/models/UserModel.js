const connectDB = require("../config/db.js");

exports.findByEmail = async (email) => {
  const db = await connectDB();
  const [rows] = await db.query(
    `SELECT id_usuario, senha, hash FROM tb_usuario WHERE email = ?`,
    [email],
  );

  return rows.length > 0 ? rows[0] : null;
};

exports.create = async (user) => {
  const { nome, email, senha, hash, cpfOuCnpj, telefone, cargo, faturamento } =
    user;

  const db = await connectDB();
  const [result] = await db.query(
    `INSERT INTO tb_usuario (
      nome,
      email,
      senha,
      hash,
      cpf,
      cnpj,
      telefone,
      cargo,
      faturamento,
      id_status
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      nome,
      email,
      senha,
      hash,
      cpfOuCnpj.length === 11 ? cpfOuCnpj : null,
      cpfOuCnpj.length === 14 ? cpfOuCnpj : null,
      telefone,
      cargo,
      faturamento || "",
      2,
    ],
  );

  return result.insertId;
};

exports.findByEmailAndHash = async (email, idRec) => {
  const db = await connectDB();
  const [rows] = await db.query(
    `SELECT id_usuario, email, hash FROM tb_usuario WHERE email = ? AND hash = ?`,
    [email, idRec],
  );

  return rows.length > 0 ? rows[0] : null;
};

exports.findByEmailAndCpfCnpj = async (email, cpfCnpj) => {
  const db = await connectDB();
  
  const cpfCnpjClean = cpfCnpj.replace(/[.\-\/]/g, '');
  
  const [rows] = await db.query(
    `SELECT id_usuario, email, hash, cpf, cnpj 
     FROM tb_usuario 
     WHERE email = ? 
     AND (cpf = ? OR cnpj = ?)
    `,
    [email, cpfCnpjClean, cpfCnpjClean],
  );

  return rows.length > 0 ? rows[0] : null;
};

exports.updatePassword = async (cryptPass, cryptHash, id_usuario) => {
  const db = await connectDB();
  const [rows] = await db.query(
    `UPDATE tb_usuario SET senha = ?, hash = ? WHERE id_usuario = ?`,
    [cryptPass, cryptHash, id_usuario],
  );

  return rows;
};

exports.updateProfile = async (id_usuario, nome, foto) => {
  const db = await connectDB();

  if (foto === undefined) {
    const [rows] = await db.query(
      `UPDATE tb_usuario SET nome = ? WHERE id_usuario = ?`,
      [nome, id_usuario]
    );
    return rows;
  }

  const [rows] = await db.query(
    `UPDATE tb_usuario SET nome = ?, foto = ? WHERE id_usuario = ?`,
    [nome, foto, id_usuario]
  );

  return rows;
};

exports.findById = async (id_usuario) => {
  const db = await connectDB();
  const [rows] = await db.query(
    `SELECT id_usuario, nome, email, foto FROM tb_usuario WHERE id_usuario = ?`,
    [id_usuario]
  );

  return rows.length > 0 ? rows[0] : null;
};
