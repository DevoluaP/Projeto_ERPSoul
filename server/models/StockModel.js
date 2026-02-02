const connectDB = require("../config/db.js");

exports.create = async (product) => {
  const {
    nome,
    marca,
    preco_custo,
    preco_venda,
    sku,
    codigo,
    quantidade,
    dt_validade,
    descricao,
    producao,
    status,
    id_usuario,
  } = product;

  const db = await connectDB();
  const [result] = await db.query(
    `INSERT INTO tb_produto (
      nome,
      marca,
      preco_custo,
      preco_venda,
      sku,
      codigo_de_barras,
      quantidade,
      dt_validade,
      descricao,
      id_tipo_produto,
      id_status,
      id_usuario
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      nome,
      marca,
      preco_custo,
      preco_venda,
      sku,
      codigo,
      quantidade,
      dt_validade,
      descricao,
      producao,
      status,
      id_usuario,
    ],
  );
  return result;
};

exports.findByUserId = async (id_usuario) => {
  const db = await connectDB();
  const [rows] = await db.query(
    `SELECT * FROM tb_produto WHERE id_usuario = ? ORDER BY nome ASC`,
    [id_usuario],
  );
  return rows;
};

exports.update = async (id_produto, product) => {
  const {
    nome,
    marca,
    preco_custo,
    preco_venda,
    sku,
    codigo,
    producao,
    status,
    quantidade,
  } = product;

  const db = await connectDB();
  const [result] = await db.query(
    `UPDATE tb_produto SET
      nome = ?,
      marca = ?,
      preco_custo = ?,
      preco_venda = ?,
      sku = ?,
      codigo_de_barras = ?,
      quantidade = ?,
      id_tipo_produto = ?,
      id_status = ?
     WHERE id_produto = ?
    `,
    [
      nome,
      marca,
      preco_custo,
      preco_venda,
      sku,
      codigo,
      quantidade,
      producao,
      status,
      id_produto,
    ],
  );
  return result;
};

exports.delete = async (id_produto) => {
  const db = await connectDB();
  const [result] = await db.query(
    `DELETE FROM tb_produto WHERE id_produto = ?`,
    [id_produto],
  );
  return result;
};

exports.reports = async (id_usuario, filtros) => {
  const { producao, status, nome, sku, codigo } = filtros;

  const db = await connectDB();
  let query = `SELECT * FROM tb_produto WHERE id_usuario = ?`;
  const params = [id_usuario];

  if (producao) {
    query += ` AND id_tipo_produto = ?`;
    params.push(parseInt(producao));
  }

  if (status) {
    query += ` AND id_status = ?`;
    params.push(parseInt(status));
  }

  if (nome) {
    query += ` AND nome LIKE ?`;
    params.push(`%${nome}%`);
  }

  if (sku) {
    query += ` AND sku LIKE ?`;
    params.push(`%${sku}%`);
  }

  if (codigo) {
    query += ` AND codigo_de_barras LIKE ?`;
    params.push(`%${codigo}%`);
  }

  query += ` ORDER BY nome ASC`;

  const [rows] = await db.query(query, params);
  return [rows];
};

exports.exportReports = async (produtoIds) => {
  const db = await connectDB();
  const placeholders = produtoIds.map(() => "?").join(",");
  const query = `SELECT * FROM tb_produto WHERE id_produto IN (${placeholders}) ORDER BY nome ASC`;

  const [rows] = await db.query(query, produtoIds);
  return [rows];
};
