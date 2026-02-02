import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { formatCpfCnpj } from "../Inc/MaskCpfCnpj";

export default function CadastrarVenda({
  isOpenCadastrarVenda,
  setCloseModal,
}) {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [documento, setDocumento] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataVenda, setDataVenda] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [status, setStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");

  function formatarMoedaInput(valor) {
    let numero = valor.replace(/\D/g, "");
    numero = (Number(numero) / 100).toFixed(2);
    const [inteiro, decimal] = numero.split(".");
    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${inteiroFormatado},${decimal}`;
  }

  function removerFormatacaoMoeda(valor) {
    return valor.replace(/[R$\s.]/g, "").replace(",", ".");
  }

  function handlePrecoChange(e) {
    const valorDigitado = e.target.value;
    const valorFormatado = formatarMoedaInput(valorDigitado);
    setPrecoUnitario(valorFormatado);
  }

  const totalVenda = itens.reduce((total, item) => total + item.subtotal, 0);

  useEffect(() => {
    if (isOpenCadastrarVenda) {
      carregarClientes();
      carregarProdutos();
    }
  }, [isOpenCadastrarVenda]);

  const carregarClientes = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/crm/clientsRegistered", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setClientes(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erro ao buscar clientes:", error));
  };

  const carregarProdutos = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/stock/productsRegistered", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setProdutos(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  };

  function handleClienteChange(e) {
    const clienteId = e.target.value;
    setClienteSelecionado(clienteId);

    const cliente = clientes.find(
      (c) => c.id_cliente && c.id_cliente.toString() === clienteId,
    );

    setDocumento(cliente ? cliente.cpf || cliente.cnpj : "");
  }

  function handleProdutoChange(e) {
    const produtoId = e.target.value;
    setProdutoSelecionado(produtoId);

    const produto = produtos.find(
      (p) => p.id_produto && p.id_produto.toString() === produtoId,
    );

    if (produto && produto.preco_venda) {
      const precoFormatado = formatarMoedaInput(
        (produto.preco_venda * 100).toString(),
      );
      setPrecoUnitario(precoFormatado);
    } else {
      setPrecoUnitario("");
    }
  }

  function adicionarItem() {
    if (!produtoSelecionado || !quantidade || !precoUnitario) {
      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Preencha produto, quantidade e preço unitário.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    const produto = produtos.find(
      (p) => p.id_produto && p.id_produto.toString() === produtoSelecionado,
    );
    const preco = parseFloat(removerFormatacaoMoeda(precoUnitario));
    const qtd = parseFloat(quantidade);

    if (isNaN(preco) || isNaN(qtd) || qtd <= 0 || preco <= 0) {
      Swal.fire({
        icon: "error",
        title: "Valores inválidos",
        text: "Quantidade e preço devem ser maiores que zero.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    const subtotal = qtd * preco;

    setItens([
      ...itens,
      {
        id: produtoSelecionado,
        produto: produto.nome,
        quantidade: qtd,
        precoUnitario: preco,
        subtotal,
      },
    ]);

    setProdutoSelecionado("");
    setPrecoUnitario("");
    setQuantidade("");
  }

  function removerItem(index) {
    setItens(itens.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!clienteSelecionado) {
      Swal.fire({
        icon: "error",
        title: "Cliente não selecionado",
        text: "Selecione um cliente para continuar.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (itens.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Nenhum item adicionado",
        text: "Adicione pelo menos um produto à venda.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (!dataVenda) {
      Swal.fire({
        icon: "error",
        title: "Data não informada",
        text: "Informe a data da venda.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (status === 3 && !formaPagamento) {
      Swal.fire({
        icon: "error",
        title: "Forma de pagamento não selecionada",
        text: "Selecione uma forma de pagamento.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (!status) {
      Swal.fire({
        icon: "error",
        title: "Status não selecionado",
        text: "Selecione o status da venda.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    const venda = {
      id_cliente: parseInt(clienteSelecionado),
      itens: itens.map((item) => ({
        id_produto: parseInt(item.id),
        quantidade: item.quantidade,
        preco_unitario: item.precoUnitario,
      })),
      data_venda: dataVenda,
      id_forma_pagamento: formaPagamento ? parseInt(formaPagamento) : null,
      id_status: parseInt(status),
      observacoes: observacoes || null,
      valor_total: totalVenda,
    };

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/sales/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venda),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensagem === "Venda cadastrada com sucesso!") {
          Swal.fire({
            icon: "success",
            title: "Venda cadastrada!",
            text: "A venda foi registrada com sucesso.",
            confirmButtonColor: "#00968F",
          });

          setClienteSelecionado("");
          setDocumento("");
          setItens([]);
          setDataVenda("");
          setFormaPagamento("");
          setStatus("");
          setObservacoes("");
          setProdutoSelecionado("");
          setPrecoUnitario("");
          setQuantidade("");

          setCloseModal();
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro ao cadastrar",
            text: data.mensagem || "Não foi possível cadastrar a venda.",
            confirmButtonColor: "#00968F",
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao cadastrar venda:", error);
        Swal.fire({
          icon: "error",
          title: "Erro de conexão",
          text: "Não foi possível conectar ao servidor.",
          confirmButtonColor: "#00968F",
        });
      });
  }

  const formatarValor = (valor) => {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (!isOpenCadastrarVenda) return null;

  if (typeof document !== "undefined") {
    document.body.classList.add("modal-open");
  }

  return (
    <div className="formulario">
      <h1>Cadastrar venda</h1>
      <div>
        <div className="info">
          <div className="row">
            <div className="col-6">
              <label>Cliente*</label>
              <select
                name="cliente"
                value={clienteSelecionado}
                onChange={handleClienteChange}
                required
              >
                <option value="">Selecione o cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                id="documento"
                name="documento"
                placeholder="CPF/CNPJ"
                value={formatCpfCnpj(documento)}
                onChange={handleClienteChange}
                disabled
                readOnly
                required
              />
            </div>
          </div>
        </div>
        <div className="info">
          <div className="row">
            <div className="col-6">
              <label>Itens da venda*</label>
              <select value={produtoSelecionado} onChange={handleProdutoChange}>
                <option value="">Selecione o produto</option>
                {produtos.map((produto) => (
                  <option key={produto.id_produto} value={produto.id_produto}>
                    {produto.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Preço Unitário</label>
              <input
                type="text"
                placeholder="R$ 0,00"
                value={precoUnitario}
                onChange={handlePrecoChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Quantidade</label>
              <input
                type="number"
                placeholder="0"
                min={0}
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <button type="button" onClick={adicionarItem} className="botao">
                Adicionar
              </button>
            </div>
          </div>
          {itens.length > 0 && (
            <div>
              {itens.length > 0 && (
                <div className="rel">
                  <table className="table-rel">
                    <tr>
                      <th>Produto</th>
                      <th>Preço Unitário</th>
                      <th>Quantidade</th>
                      <th>Subtotal</th>
                    </tr>
                    {itens.map((item, index) => (
                      <tr key={index}>
                        <td>{item.produto}</td>
                        <td>{formatarValor(item.precoUnitario)}</td>
                        <td>{item.quantidade}</td>
                        <td>{formatarValor(item.subtotal)}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => removerItem(index)}
                            className="btn-modal"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="info">
          <div className="row">
            <div className="col-6">
              <label>Data da venda*</label>
              <input
                type="date"
                name="dataVenda"
                value={dataVenda}
                onChange={(e) => setDataVenda(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="info">
          <div className="row">
            <div className="col-6">
              <select
                name="formaPagamento"
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
              >
                <option value="">Forma de pagamento</option>
                <option value="1">Pix</option>
                <option value="2">Cartão Crédito</option>
                <option value="3">Cartão Débito</option>
                <option value="4">Dinheiro</option>
                <option value="5">Boleto</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Status da venda*</option>
                <option value="4">Aberta</option>
                <option value="3">Paga</option>
                <option value="6">Cancelada</option>
                <option value="8">Estornada</option>
              </select>
            </div>
          </div>
        </div>
        <div className="info">
          <div className="row">
            <div className="col-6">
              <label>Observações</label>
              <textarea
                name="observacoes"
                placeholder="Digite observações sobre a venda (opcional)"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows="4"
              />
            </div>
          </div>
        </div>
        <div className="info">
          <div className="row">
            <div className="col-6">
              <label>Total da venda</label>
              <input
                type="text"
                value={formatarValor(totalVenda)}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="botao-form">
          <button type="button" onClick={handleSubmit} className="botao">
            <p>Salvar</p>
          </button>
        </div>
        <div className="botao-form">
          <button type="button" className="botao" onClick={setCloseModal}>
            <p>Voltar</p>
          </button>
        </div>
      </div>
    </div>
  );
}
