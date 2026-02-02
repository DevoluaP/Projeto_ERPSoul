const SalesModel = require("../models/SalesModel.js");
const { validationResult } = require("express-validator");
const { isValidDate } = require("../utils/validators.js");

exports.registerSale = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensagem: errors.array()[0].msg,
      erros: errors.array(),
    });
  }

  const {
    id_cliente,
    itens,
    data_venda,
    id_forma_pagamento,
    id_status,
    observacoes,
    valor_total,
  } = req.body;

  if (parseInt(id_status) === 3 && !id_forma_pagamento) {
    return res.status(400).json({
      mensagem: "Forma de pagamento é obrigatória para vendas pagas",
    });
  }

  const id_usuario = req.user.userId;

  try {
    const vendaId = await SalesModel.create({
      id_cliente: parseInt(id_cliente),
      id_usuario,
      data_venda,
      id_forma_pagamento: id_forma_pagamento
        ? parseInt(id_forma_pagamento)
        : null,
      id_status: parseInt(id_status),
      observacoes: observacoes || null,
      valor_total: parseFloat(valor_total),
      itens: itens.map((item) => ({
        id_produto: parseInt(item.id_produto),
        quantidade: parseFloat(item.quantidade),
        preco_unitario: parseFloat(item.preco_unitario),
      })),
    });

    return res.status(201).json({
      mensagem: "Venda cadastrada com sucesso!",
      id_venda: vendaId,
    });
  } catch (err) {
    console.error("Erro ao cadastrar venda:", err);
    res.status(500).json({ erro: "Erro ao cadastrar venda" });
  }
};

exports.getSales = async (req, res) => {
  const id_usuario = req.user.userId;

  try {
    const sales = await SalesModel.findByUserId(id_usuario);
    return res.json(sales);
  } catch (err) {
    console.error("Erro ao buscar vendas:", err);
    res.status(500).json({ erro: "Erro ao buscar vendas. Tente novamente." });
  }
};

exports.editSale = async (req, res) => {
  const { id_venda } = req.params;
  const { forma_pagamento, status } = req.body;

  if (!status) {
    return res.status(400).json({
      mensagem: "Status é obrigatório",
    });
  }

  if (parseInt(status) === 3 && !forma_pagamento) {
    return res.status(400).json({
      mensagem: "Forma de pagamento é obrigatória para vendas pagas",
    });
  }

  if (forma_pagamento && ![1, 2, 3, 4, 5].includes(parseInt(forma_pagamento))) {
    return res.status(400).json({
      mensagem: "Forma de pagamento inválida",
    });
  }

  if (![3, 4, 6, 8].includes(parseInt(status))) {
    return res.status(400).json({
      mensagem: "Status inválido",
    });
  }

  try {
    await SalesModel.edit(
      {
        forma_pagamento: forma_pagamento ? parseInt(forma_pagamento) : null,
        status: parseInt(status),
      },
      id_venda,
    );

    return res.json({
      mensagem: "Venda atualizada com sucesso!",
    });
  } catch (err) {
    console.error("Erro ao atualizar venda:", err);
    res.status(500).json({ erro: "Erro ao atualizar venda" });
  }
};

exports.deleteSale = async (req, res) => {
  const { id_venda } = req.params;

  try {
    await SalesModel.delete(id_venda);
    return res.json({
      mensagem: "Venda excluída com sucesso!",
    });
  } catch (err) {
    console.error("Erro ao excluir venda:", err);
    res.status(500).json({ erro: "Erro ao excluir venda" });
  }
};

exports.reportsSales = async (req, res) => {
  const id_usuario = req.user.userId;
  const { nome_cliente, data_venda, forma_pagamento, status } = req.body;

  if (!nome_cliente && !data_venda && !forma_pagamento && !status) {
    return res.status(400).json({
      mensagem: "Preencha pelo menos um dos campos!",
    });
  }

  if (nome_cliente && nome_cliente.length > 50) {
    return res.status(400).json({ mensagem: "Nome inválido!" });
  }

  if (data_venda && !isValidDate(data_venda)) {
    return res.status(400).json({ mensagem: "Data de Venda inválida!" });
  }

  if (forma_pagamento && isNaN(forma_pagamento)) {
    return res.status(400).json({ mensagem: "Forma de pagamento inválida!" });
  }

  if (status && isNaN(status)) {
    return res.status(400).json({ mensagem: "Status inválido!" });
  }

  try {
    const sales = await SalesModel.reports(
      id_usuario,
      nome_cliente,
      data_venda,
      forma_pagamento,
      status,
    );
    return res.json(sales);
  } catch (err) {
    console.error("Erro ao buscar vendas:", err);
    res.status(500).json({ erro: "Erro ao buscar vendas" });
  }
};
