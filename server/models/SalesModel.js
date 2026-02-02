const connectDB = require("../config/db.js");

exports.create = async (venda) => {
  const {
    id_cliente,
    id_usuario,
    data_venda,
    id_forma_pagamento,
    id_status,
    observacoes,
    valor_total,
    itens,
  } = venda;

  const db = await connectDB();

  try {
    await db.query("START TRANSACTION");

    const [resultVenda] = await db.query(
      `INSERT INTO tb_venda (
        dt_venda,
        total_venda,
        observacoes,
        id_forma_pagamento,
        id_status,
        id_cliente,
        id_usuario
       ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data_venda,
        valor_total,
        observacoes,
        id_forma_pagamento,
        id_status,
        id_cliente,
        id_usuario,
      ],
    );

    const id_venda = resultVenda.insertId;

    for (const item of itens) {
      await db.query(
        `INSERT INTO tb_produtos_venda (
          preco_unitario,
          quantidade,
          id_produto,
          id_venda
         ) VALUES (?, ?, ?, ?)
        `,
        [item.preco_unitario, item.quantidade, item.id_produto, id_venda],
      );

      await db.query(
        `UPDATE tb_produto
         SET quantidade = CASE
          WHEN quantidade IS NOT NULL AND quantidade >= ?
          THEN quantidade - ?
          ELSE quantidade
         END
         WHERE id_produto = ?
        `,
        [item.quantidade, item.quantidade, item.id_produto],
      );
    }

    await db.query("COMMIT");

    return id_venda;
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
};

exports.findByUserId = async (id_usuario) => {
  const db = await connectDB();
  const [rows] = await db.query(
    `SELECT 
      v.*,
      c.nome as nome_cliente,
      GROUP_CONCAT(p.nome ORDER BY p.nome SEPARATOR ', ') as nome_produto,
      GROUP_CONCAT(pv.quantidade ORDER BY p.nome SEPARATOR ', ') as quantidade,
      CASE 
        WHEN v.id_forma_pagamento = 1 THEN 'Pix'
        WHEN v.id_forma_pagamento = 2 THEN 'Cartão Crédito'
        WHEN v.id_forma_pagamento = 3 THEN 'Cartão Débito'
        WHEN v.id_forma_pagamento = 4 THEN 'Dinheiro'
        WHEN v.id_forma_pagamento = 5 THEN 'Boleto'
      END as forma_pagamento,
      CASE 
        WHEN v.id_status = 3 THEN 'Paga'
        WHEN v.id_status = 4 THEN 'Aberta'
        WHEN v.id_status = 6 THEN 'Cancelada'
        WHEN v.id_status = 8 THEN 'Estornada'
      END as status
     FROM tb_venda v
     INNER JOIN tb_cliente c ON v.id_cliente = c.id_cliente
     LEFT JOIN tb_produtos_venda pv ON v.id_venda = pv.id_venda
     LEFT JOIN tb_produto p ON pv.id_produto = p.id_produto
     WHERE v.id_usuario = ? AND v.id_status != 1
     GROUP BY v.id_venda
     ORDER BY v.dt_venda DESC
    `,
    [id_usuario],
  );

  return rows;
};

exports.edit = async (sale, id_venda) => {
  const { forma_pagamento, status } = sale;

  const db = await connectDB();
  const [result] = await db.query(
    `UPDATE tb_venda
     SET id_forma_pagamento = ?, id_status = ?
     WHERE id_venda = ?
    `,
    [forma_pagamento, status, id_venda],
  );
  return result;
};

exports.delete = async (id_venda) => {
  const db = await connectDB();
  const [result] = await db.query(
    `UPDATE tb_venda SET id_status = 1 WHERE id_venda = ?`,
    [id_venda],
  );
  return result;
};

exports.reports = async (
  id_usuario,
  nome_cliente,
  data_venda,
  forma_pagamento,
  status,
) => {
  const db = await connectDB();

  let query = `
    SELECT 
      v.*,
      c.nome as nome_cliente,
      c.cpf,
      c.cnpj,
      GROUP_CONCAT(p.nome ORDER BY p.nome SEPARATOR ', ') as nome_produto,
      GROUP_CONCAT(pv.quantidade ORDER BY p.nome SEPARATOR ', ') as quantidade,
      s.descricao as status,
      fp.descricao as forma_pagamento
    FROM tb_venda v
    INNER JOIN tb_cliente c ON v.id_cliente = c.id_cliente
    LEFT JOIN tb_produtos_venda pv ON v.id_venda = pv.id_venda
    LEFT JOIN tb_produto p ON pv.id_produto = p.id_produto
    LEFT JOIN tb_status s ON v.id_status = s.id_status
    LEFT JOIN tb_forma_pagamento fp ON v.id_forma_pagamento = fp.id_forma_pagamento
    WHERE v.id_usuario = ? AND v.id_status != 1
  `;

  const params = [id_usuario];

  if (nome_cliente) {
    query += ` AND c.nome LIKE ?`;
    params.push(`%${nome_cliente}%`);
  }

  if (data_venda) {
    query += ` AND DATE(v.dt_venda) = ?`;
    params.push(data_venda);
  }

  if (forma_pagamento) {
    query += ` AND v.id_forma_pagamento = ?`;
    params.push(parseInt(forma_pagamento));
  }

  if (status) {
    query += ` AND v.id_status = ?`;
    params.push(parseInt(status));
  }

  query += ` GROUP BY v.id_venda ORDER BY v.dt_venda DESC`;

  const [rows] = await db.query(query, params);
  return rows;
};
