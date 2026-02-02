const connectDB = require("../config/db.js");

exports.create = async (account) => {
  const {
    tipo_conta,
    fornecedor_cliente,
    valor,
    numero_documento,
    competencia,
    dt_vencimento,
    dt_pagamento,
    forma_pagamento,
    status,
    observacoes,
    id_usuario,
  } = account;

  const db = await connectDB();
  const [result] = await db.query(
    `INSERT INTO tb_conta (
      fornecedor,
      cliente,
      dt_vencimento,
      valor,
      numero_documento,
      competencia,
      observacoes,
      dt_pagamento,
      id_forma_pagamento,
      id_tipo_conta,
      id_status,
      id_usuario
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      tipo_conta === 1 ? fornecedor_cliente : null,
      tipo_conta === 2 ? fornecedor_cliente : null,
      dt_vencimento,
      valor,
      numero_documento,
      competencia,
      observacoes,
      dt_pagamento,
      forma_pagamento,
      tipo_conta,
      status,
      id_usuario,
    ],
  );
  return result;
};

exports.findByUserId = async (id_usuario) => {
  const db = await connectDB();
  const [rows] = await db.query(
    `SELECT * FROM tb_conta WHERE id_usuario = ? AND id_status != 1 ORDER BY dt_vencimento DESC`,
    [id_usuario],
  );
  return rows;
};

exports.edit = async (account, id_conta) => {
  const {
    tipo_conta,
    fornecedor_cliente,
    valor,
    dt_vencimento,
    dt_pagamento,
    forma_pagamento,
    status,
  } = account;

  const db = await connectDB();
  const [result] = await db.query(
    `UPDATE tb_conta
     SET fornecedor = ?,
      cliente = ?,
      dt_vencimento = ?,
      valor = ?,
      dt_pagamento = ?,
      id_forma_pagamento = ?,
      id_status = ?
     WHERE id_conta = ?
    `,
    [
      tipo_conta === 1 ? fornecedor_cliente : null,
      tipo_conta === 2 ? fornecedor_cliente : null,
      dt_vencimento,
      valor,
      dt_pagamento,
      forma_pagamento,
      status,
      id_conta,
    ],
  );
  return result;
};

exports.delete = async (id_conta) => {
  const db = await connectDB();
  const [result] = await db.query(
    `UPDATE tb_conta SET id_status = 1 WHERE id_conta = ?`,
    [id_conta],
  );
  return result;
};

exports.findAccounts = async (tipo_conta, status, id_usuario) => {
  const db = await connectDB();

  let query = `SELECT * FROM tb_conta WHERE id_usuario = ?`;

  const params = [id_usuario];

  if (tipo_conta) {
    if (tipo_conta === "3") {
      query += ` AND id_tipo_conta IN (1, 2)`;
    } else {
      query += ` AND id_tipo_conta = ?`;
      params.push(parseInt(tipo_conta));
    }
  }

  if (status) {
    query += ` AND id_status = ?`;
    params.push(parseInt(status));
  }

  query += ` ORDER BY dt_vencimento DESC`;

  const [rows] = await db.query(query, params);
  return rows;
};
