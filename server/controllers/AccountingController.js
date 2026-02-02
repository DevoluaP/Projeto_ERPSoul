const AccountingModel = require("../models/AccountingModel.js");
const { validationResult } = require("express-validator");

exports.registerAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensagem: errors.array()[0].msg,
      erros: errors.array(),
    });
  }

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
  } = req.body;

  const id_usuario = req.user.userId;

  try {
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      return res.status(400).json({
        mensagem: "Valor deve ser um número maior que zero",
      });
    }

    await AccountingModel.create({
      tipo_conta: parseInt(tipo_conta),
      fornecedor_cliente: fornecedor_cliente.trim(),
      valor: valorNumerico,
      numero_documento: numero_documento?.trim() || null,
      competencia: competencia?.trim() || null,
      dt_vencimento,
      dt_pagamento: dt_pagamento || null,
      forma_pagamento: forma_pagamento ? parseInt(forma_pagamento) : null,
      status: parseInt(status),
      observacoes: observacoes?.trim() || null,
      id_usuario,
    });

    return res.json({ mensagem: "Conta cadastrada com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar conta:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        mensagem: "Esta conta já está cadastrada",
      });
    }

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        mensagem: "Dados de referência inválidos (usuário, tipo ou status)",
      });
    }

    res.status(500).json({
      mensagem: "Erro ao cadastrar conta. Tente novamente.",
    });
  }
};

exports.getAccounts = async (req, res) => {
  const id_usuario = req.user.userId;

  try {
    const accounts = await AccountingModel.findByUserId(id_usuario);
    return res.json(accounts);
  } catch (err) {
    console.error("Erro ao buscar contas:", err);
    res.status(500).json({ erro: "Erro ao buscar contas" });
  }
};

exports.editAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensagem: errors.array()[0].msg,
      erros: errors.array(),
    });
  }

  const { id_conta } = req.params;
  const {
    tipo_conta,
    fornecedor_cliente,
    valor,
    dt_vencimento,
    dt_pagamento,
    forma_pagamento,
    status,
  } = req.body;

  try {
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      return res.status(400).json({
        mensagem: "Valor deve ser um número maior que zero",
      });
    }

    await AccountingModel.edit(
      {
        tipo_conta: parseInt(tipo_conta),
        fornecedor_cliente: fornecedor_cliente.trim(),
        valor: valorNumerico,
        dt_vencimento,
        dt_pagamento: dt_pagamento || null,
        forma_pagamento: forma_pagamento ? parseInt(forma_pagamento) : null,
        status: parseInt(status),
      },
      id_conta,
    );

    return res.json({
      mensagem: "Conta atualizada com sucesso!",
    });
  } catch (err) {
    console.error("Erro ao atualizar conta:", err);
    res.status(500).json({ erro: "Erro ao atualizar conta" });
  }
};

exports.deleteAccount = async (req, res) => {
  const { id_conta } = req.params;

  try {
    await AccountingModel.delete(id_conta);
    return res.json({
      mensagem: "Conta excluída com sucesso!",
    });
  } catch (err) {
    console.error("Erro ao excluir conta:", err);
    res.status(500).json({ erro: "Erro ao excluir conta" });
  }
};

exports.exportAccounts = async (req, res) => {
  const id_usuario = req.user.userId;
  const { tipo_conta, status } = req.body;

  if (!tipo_conta && !status) {
    return res.status(400).json({ 
      mensagem: "Informe pelo menos um filtro (tipo/status da conta)" 
    });
  }

  try {
    const accounts = await AccountingModel.findAccounts(
      tipo_conta,
      status,
      id_usuario,
    );
    return res.json(accounts);
  } catch (err) {
    console.error("Erro ao buscar contas:", err);
    res.status(500).json({ erro: "Erro ao buscar contas" });
  }
};
