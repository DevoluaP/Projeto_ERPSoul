const StockModel = require("../models/StockModel.js");
const { validationResult } = require("express-validator");

exports.registerProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensagem: errors.array()[0].msg,
      erros: errors.array(),
    });
  }

  const {
    nome,
    marca,
    preco_custo,
    preco_venda,
    producao,
    status,
    sku,
    codigo,
    quantidade,
    dt_validade,
    descricao,
  } = req.body;

  const id_usuario = req.user.userId;

  try {
    await StockModel.create({
      nome: nome.trim(),
      marca: marca?.trim() || null,
      preco_custo: preco_custo || null,
      preco_venda: preco_venda || null,
      producao: parseInt(producao),
      status: parseInt(status),
      sku: sku.trim(),
      codigo: codigo.trim(),
      quantidade: quantidade || 0,
      dt_validade: dt_validade || null,
      descricao: descricao?.trim() || null,
      id_usuario,
    });

    return res.status(201).json({ mensagem: "Produto cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar produto:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        mensagem: "SKU ou Código de barras já cadastrado",
      });
    }

    res.status(500).json({ erro: "Erro ao cadastrar produto" });
  }
};

exports.getProducts = async (req, res) => {
  const id_usuario = req.user.userId;

  try {
    const products = await StockModel.findByUserId(id_usuario);
    return res.json(products);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ erro: "Erro ao buscar produtos. Tente novamente." });
  }
};

exports.editProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      mensagem: errors.array()[0].msg,
      erros: errors.array(),
    });
  }

  const { id_produto } = req.params;
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
  } = req.body;

  try {
    await StockModel.update(id_produto, {
      nome: nome.trim(),
      marca: marca?.trim() || null,
      preco_custo: preco_custo || null,
      preco_venda: preco_venda || null,
      sku: sku.trim(),
      codigo: codigo.trim(),
      producao: parseInt(producao),
      status: parseInt(status),
      quantidade: quantidade || 0,
    });

    return res.json({
      mensagem: "Produto atualizado com sucesso!",
    });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ erro: "Erro ao atualizar produto. Tente novamente." });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id_produto } = req.params;

  try {
    await StockModel.delete(id_produto);

    return res.json({ mensagem: "Produto excluído com sucesso!" });
  } catch (err) {
    console.error("Erro ao excluir produto:", err);
    res.status(500).json({ erro: "Erro ao excluir produto. Tente novamente." });
  }
};

exports.reportsProducts = async (req, res) => {
  const id_usuario = req.user.userId;
  const filtros = req.body;

  const { producao, status, nome, sku, codigo } = filtros;

  if (!producao && !status && !nome && !sku && !codigo) {
    return res.status(400).json({
      mensagem: "Pelo menos um filtro deve ser preenchido.",
    });
  }

  try {
    const [results] = await StockModel.reports(id_usuario, filtros);

    if (results.length > 0) {
      return res.status(200).json({ mensagem: "Produto(s) encontrado(s)!", results });
    }

    return res.status(404).json({ mensagem: "Nenhum produto encontrado!" });
  } catch (err) {
    console.error("Erro ao gerar relatórios:", err);
    res.status(500).json({ erro: "Erro ao gerar relatórios" });
  }
};

exports.exportReportsProducts = async (req, res) => {
  const { produtoIds } = req.body;

  if (!produtoIds || produtoIds.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum produto encontrado!" });
  }

  try {
    const [results] = await StockModel.exportReports(produtoIds);
    return res.status(200).json({ produtos: results });
  } catch (err) {
    console.error("Erro ao exportar relatório:", err);
    res.status(500).json({ erro: "Erro ao exportar relatório" });
  }
};
