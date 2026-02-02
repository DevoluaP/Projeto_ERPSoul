import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { formatCpfCnpj } from "../Inc/MaskCpfCnpj";

export default function CadastrarServico({
  isOpenCadastrarServico,
  setCloseModal,
}) {
  const [formData, setFormData] = useState({
    cliente: "",
    cpfOuCnpj: "",
    servico: "",
    cod_servico: "",
    cod_lc: "",
    imposto: "",
    val_servico: "",
    id_natureza: "",
    data_vencimento: "",
    desc_servico: "",
  });

  const [clientes, setClientes] = useState([]);

  function formatarMoedaInput(valor) {
    let numero = valor.replace(/\D/g, "");
    numero = (Number(numero) / 100).toFixed(2);
    const [inteiro, decimal] = numero.split(".");
    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${inteiroFormatado},${decimal}`;
  }

  function formatarPorcentagem(valor) {
    let numero = valor.replace(/\D/g, "");
    numero = (Number(numero) / 100).toFixed(2);
    return numero.replace(".", ",") + "%";
  }

  function removerFormatacaoMoeda(valor) {
    return valor.replace(/[R$\s.]/g, "").replace(",", ".");
  }

  function removerFormatacaoPorcentagem(valor) {
    return valor.replace("%", "").replace(",", ".");
  }

  useEffect(() => {
    if (isOpenCadastrarServico) {
      const token = localStorage.getItem("token");

      fetch("http://localhost:5000/api/crm/clientsRegistered", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setClientes(data.length === 0 ? [] : data);
        })
        .catch((error) => console.error("Erro ao buscar dados:", error));
    }
  }, [isOpenCadastrarServico]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClienteChange = (e) => {
    const selectedCliente = e.target.value;
    const cliente = clientes.find(
      (c) => c.id_cliente && c.id_cliente.toString() === selectedCliente,
    );

    if (cliente) {
      setFormData({
        ...formData,
        cliente: selectedCliente,
        cpfOuCnpj: cliente.cpf || cliente.cnpj,
      });
    } else {
      setFormData({
        ...formData,
        cliente: "",
        cpfOuCnpj: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dadosParaEnviar = {
      ...formData,
      cpfOuCnpj: formData.cpfOuCnpj.replace(/\D/g, ""),
      val_servico: removerFormatacaoMoeda(formData.val_servico),
      imposto: removerFormatacaoPorcentagem(formData.imposto),
    };

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/services/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosParaEnviar),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensagem === "Serviço cadastrado com sucesso!") {
          Swal.fire({
            title: "Serviço cadastrado com sucesso!",
            text: "O serviço foi inserido nos serviços cadastrados!",
            icon: "success",
            confirmButtonColor: "#00968F",
          });

          setFormData({
            cliente: "",
            cpfOuCnpj: "",
            servico: "",
            cod_servico: "",
            cod_lc: "",
            imposto: "",
            val_servico: "",
            id_natureza: "",
            data_vencimento: "",
            desc_servico: "",
          });

          setCloseModal();
        } else {
          Swal.fire({
            title: data.mensagem || "Não foi possível cadastrar serviço!",
            color: "#050538",
            confirmButtonColor: "#00968F",
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao cadastrar serviço:", error);
        Swal.fire({
          title: "Erro ao cadastrar serviço!",
          text: "Ocorreu um erro na comunicação com o servidor.",
          icon: "error",
          color: "#050538",
          confirmButtonColor: "#00968F",
        });
      });
  };

  if (isOpenCadastrarServico) {
    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <form onSubmit={handleSubmit}>
            <h1>Cadastrar Serviço</h1>
            <div className="row">
              <div className="col-6">
                <select
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleClienteChange}
                  required
                >
                  <option value="">Selecione o Cliente*</option>
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
                  id="cpfOuCnpj"
                  name="cpfOuCnpj"
                  placeholder="CPF/CNPJ do Cliente"
                  value={formatCpfCnpj(formData.cpfOuCnpj)}
                  disabled
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="servico"
                  name="servico"
                  placeholder="Serviço*"
                  value={formData.servico}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="cod_servico"
                  name="cod_servico"
                  placeholder="Código Serviço*"
                  value={formData.cod_servico}
                  onChange={handleChange}
                  maxLength={6}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="cod_lc"
                  name="cod_lc"
                  placeholder="Código LC 116*"
                  value={formData.cod_lc}
                  onChange={handleChange}
                  maxLength={5}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="imposto"
                  name="imposto"
                  placeholder="Alíquota ISS (%)*"
                  value={formData.imposto}
                  onChange={(e) => {
                    const valorFormatado = formatarPorcentagem(e.target.value);
                    setFormData({
                      ...formData,
                      imposto: valorFormatado,
                    });
                  }}
                  maxLength={7}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Valor do Serviço*</label>
                <input
                  type="text"
                  id="val_servico"
                  name="val_servico"
                  placeholder="R$ 0,00"
                  value={formData.val_servico}
                  onChange={(e) => {
                    const valorFormatado = formatarMoedaInput(e.target.value);
                    setFormData({
                      ...formData,
                      val_servico: valorFormatado,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <select
                  name="id_natureza"
                  id="id_natureza"
                  value={formData.id_natureza}
                  onChange={handleChange}
                  required
                >
                  <option value="">Natureza*</option>
                  <option value="1">Pessoa Física</option>
                  <option value="2">Pessoa Jurídica</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Data de vencimento*</label>
                <input
                  type="date"
                  id="data_vencimento"
                  name="data_vencimento"
                  value={formData.data_vencimento}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Descrição do serviço</label>
                <textarea
                  id="desc_servico"
                  name="desc_servico"
                  rows="4"
                  cols="50"
                  placeholder="Digite a descrição do serviço (opcional)"
                  value={formData.desc_servico}
                  maxLength={250}
                  onChange={handleChange}
                  style={{ resize: "none" }}
                />
              </div>
            </div>
            <div className="botao-form">
              <button type="submit" className="botao">
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
