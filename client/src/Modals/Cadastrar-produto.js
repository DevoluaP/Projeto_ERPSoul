import { useState } from "react";
import Swal from "sweetalert2";

export default function CadastrarProduto({
  isOpenCadastrarProduto,
  setCloseModal,
}) {
  const [formData, setFormData] = useState({
    nome: "",
    marca: "",
    preco_custo: "",
    preco_venda: "",
    producao: "",
    status: "",
    sku: "",
    codigo: "",
    quantidade: "",
    dt_validade: "",
    descricao: "",
  });

  function formatarMoeda(valor) {
    let numero = valor.replace(/\D/g, "");
    numero = (Number(numero) / 100).toFixed(2);
    numero = numero.replace(".", ",");
    numero = numero.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return numero ? `R$ ${numero}` : "";
  }

  function removerFormatacaoMoeda(valor) {
    return valor.replace(/[R$\s.]/g, "").replace(",", ".");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "preco_custo" || name === "preco_venda") {
      const valorFormatado = formatarMoeda(value);
      setFormData({
        ...formData,
        [name]: valorFormatado,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validarFormulario = () => {
    const {
      nome,
      preco_custo,
      preco_venda,
      producao,
      status,
      sku,
      codigo,
      quantidade,
    } = formData;

    if (!nome || nome.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Preencha o campo Nome do produto.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (preco_custo) {
      const precoCustoNum = parseFloat(removerFormatacaoMoeda(preco_custo));
      if (isNaN(precoCustoNum) || precoCustoNum < 0) {
        Swal.fire({
          icon: "error",
          title: "Preço inválido",
          text: "O preço de custo deve ser um valor válido.",
          confirmButtonColor: "#00968F",
        });
        return false;
      }
    }

    if (preco_venda) {
      const precoVendaNum = parseFloat(removerFormatacaoMoeda(preco_venda));
      if (isNaN(precoVendaNum) || precoVendaNum <= 0) {
        Swal.fire({
          icon: "error",
          title: "Preço inválido",
          text: "O preço de venda deve ser maior que zero.",
          confirmButtonColor: "#00968F",
        });
        return false;
      }
    }

    if (!producao) {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Selecione o tipo de produção.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (!status) {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Selecione o status do produto.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (!sku || sku.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Preencha o campo SKU.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (!codigo || codigo.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Preencha o campo Código de barras.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (quantidade) {
      const qtd = parseFloat(quantidade);
      if (isNaN(qtd) || qtd < 0) {
        Swal.fire({
          icon: "error",
          title: "Quantidade inválida",
          text: "A quantidade deve ser um número positivo.",
          confirmButtonColor: "#00968F",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validarFormulario();
    if (!isValid) return;

    const dadosParaEnvio = {
      nome: formData.nome.trim(),
      marca: formData.marca?.trim() || null,
      preco_custo: formData.preco_custo
        ? removerFormatacaoMoeda(formData.preco_custo)
        : null,
      preco_venda: formData.preco_venda
        ? removerFormatacaoMoeda(formData.preco_venda)
        : null,
      producao: parseInt(formData.producao),
      status: parseInt(formData.status),
      sku: formData.sku.trim(),
      codigo: formData.codigo.trim(),
      quantidade: formData.quantidade ? parseFloat(formData.quantidade) : null,
      dt_validade: formData.dt_validade || null,
      descricao: formData.descricao?.trim() || null,
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/stock/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      const data = await response.json();

      if (response.ok && data.mensagem === "Produto cadastrado com sucesso!") {
        await Swal.fire({
          title: "Sucesso!",
          text: "Produto cadastrado com sucesso!",
          icon: "success",
          confirmButtonColor: "#00968F",
        });

        setFormData({
          nome: "",
          marca: "",
          preco_custo: "",
          preco_venda: "",
          producao: "",
          status: "",
          sku: "",
          codigo: "",
          quantidade: "",
          dt_validade: "",
          descricao: "",
        });

        setCloseModal();
      } else {
        Swal.fire({
          title: "Erro ao cadastrar",
          text: data.mensagem || "Não foi possível cadastrar o produto.",
          icon: "error",
          confirmButtonColor: "#00968F",
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      Swal.fire({
        title: "Erro de conexão",
        text: "Não foi possível conectar ao servidor. Tente novamente.",
        icon: "error",
        confirmButtonColor: "#00968F",
      });
    }
  };

  if (isOpenCadastrarProduto) {
    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <form method="post">
            <h1>Cadastrar Produto</h1>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Nome*"
                  value={formData.nome}
                  onChange={handleChange}
                  maxLength={50}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  placeholder="Marca"
                  value={formData.marca}
                  onChange={handleChange}
                  maxLength={50}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Preço de Custo</label>
                <input
                  type="text"
                  id="preco_custo"
                  name="preco_custo"
                  placeholder="R$ 0,00"
                  value={formData.preco_custo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Preço de Venda</label>
                <input
                  type="text"
                  id="preco_venda"
                  name="preco_venda"
                  placeholder="R$ 0,00"
                  value={formData.preco_venda}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <select
                  name="producao"
                  id="producao"
                  value={formData.producao}
                  onChange={handleChange}
                  required
                >
                  <option value="">Produção*</option>
                  <option value="1">Própria</option>
                  <option value="2">Terceiro</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Status*</option>
                  <option value="2">Ativo</option>
                  <option value="1">Inativo</option>
                  <option value="7">Fora de linha</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  placeholder="SKU*"
                  value={formData.sku}
                  onChange={handleChange}
                  maxLength={50}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  placeholder="Código de barras*"
                  value={formData.codigo}
                  onChange={handleChange}
                  maxLength={50}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Quantidade</label>
                <input
                  type="number"
                  id="quantidade"
                  name="quantidade"
                  placeholder="0"
                  min={0}
                  value={formData.quantidade}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Data de Validade</label>
                <input
                  type="date"
                  id="dt_validade"
                  name="dt_validade"
                  value={formData.dt_validade}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Descrição do produto</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  rows="4"
                  cols="50"
                  placeholder="Digite a descrição do produto (opcional)"
                  value={formData.descricao}
                  onChange={handleChange}
                  maxLength={250}
                  style={{ resize: "none" }}
                />
              </div>
            </div>
            <div className="botao-form">
              <button type="submit" className="botao" onClick={handleSubmit}>
                <p>Salvar</p>
              </button>
            </div>
            <div className="botao-form">
              <button type="button" className="botao" onClick={setCloseModal}>
                <p>Voltar</p>
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  return null;
}
