import { useState } from "react";
import Swal from "sweetalert2";

export default function CadastrarConta({
  isOpenCadastrarConta,
  setCloseModal,
}) {
  const [formData, setFormData] = useState({
    tipo_conta: "",
    fornecedor_cliente: "",
    valor: "",
    numero_documento: "",
    competencia: "",
    dt_vencimento: "",
    dt_pagamento: "",
    forma_pagamento: "",
    status: "",
    observacoes: "",
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

  function validarNome(nome) {
    if (!nome || nome.trim().length < 3) {
      return false;
    }

    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return regex.test(nome.trim());
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "valor") {
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
      tipo_conta,
      fornecedor_cliente,
      valor,
      dt_vencimento,
      dt_pagamento,
      status,
    } = formData;

    if (!tipo_conta) {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Selecione o tipo de conta (A pagar ou A receber).",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (!fornecedor_cliente || fornecedor_cliente.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Preencha o campo Fornecedor/Cliente.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (!validarNome(fornecedor_cliente)) {
      Swal.fire({
        icon: "error",
        title: "Nome inválido",
        text: "O nome do fornecedor/cliente deve ter pelo menos 3 caracteres e conter apenas letras.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (!valor || valor === "R$ 0,00") {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Preencha o valor da conta.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    const valorNumerico = parseFloat(removerFormatacaoMoeda(valor));
    if (valorNumerico <= 0) {
      Swal.fire({
        icon: "error",
        title: "Valor inválido",
        text: "O valor da conta deve ser maior que zero.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (!dt_vencimento) {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Preencha a data de vencimento.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (!status) {
      Swal.fire({
        icon: "error",
        title: "Campo obrigatório",
        text: "Selecione o status da conta.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if (status === "3" && !dt_pagamento) {
      Swal.fire({
        icon: "error",
        title: "Atenção",
        text: "Para contas com status 'Pago', é necessário informar a data de pagamento.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    if ((dt_pagamento || formData.forma_pagamento) && status !== "3") {
      Swal.fire({
        icon: "error",
        title: "Status inválido",
        text: "Contas com data de pagamento ou forma de pagamento devem ter status 'Pago'.",
        confirmButtonColor: "#00968F",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validarFormulario();
    if (!isValid) return;

    const dadosParaEnvio = {
      ...formData,
      valor: removerFormatacaoMoeda(formData.valor),
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/accounting/register",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        },
      );

      const data = await response.json();

      if (response.ok && data.mensagem === "Conta cadastrada com sucesso!") {
        await Swal.fire({
          title: "Conta cadastrada com sucesso!",
          text: "A conta foi inserida nas contas cadastradas!",
          icon: "success",
          confirmButtonColor: "#00968F",
        });

        setFormData({
          tipo_conta: "",
          fornecedor_cliente: "",
          valor: "",
          numero_documento: "",
          competencia: "",
          dt_vencimento: "",
          dt_pagamento: "",
          forma_pagamento: "",
          status: "",
          observacoes: "",
        });

        setCloseModal();
      } else {
        Swal.fire({
          title: "Erro ao cadastrar",
          text: data.mensagem || "Não foi possível cadastrar a conta.",
          icon: "error",
          confirmButtonColor: "#00968F",
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar conta:", error);
      Swal.fire({
        title: "Erro de conexão",
        text: "Não foi possível conectar ao servidor. Tente novamente.",
        icon: "error",
        confirmButtonColor: "#00968F",
      });
    }
  };

  if (isOpenCadastrarConta) {
    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <form onSubmit={handleSubmit}>
            <h1>Cadastrar Conta</h1>
            <div className="row">
              <div className="col-6">
                <select
                  name="tipo_conta"
                  id="tipo_conta"
                  value={formData.tipo_conta}
                  onChange={handleChange}
                  required
                >
                  <option value="">Tipo de conta*</option>
                  <option value="1">A pagar</option>
                  <option value="2">A receber</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="fornecedor_cliente"
                  name="fornecedor_cliente"
                  placeholder="Fornecedor/Cliente*"
                  minLength={3}
                  maxLength={50}
                  value={formData.fornecedor_cliente}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="numero_documento"
                  name="numero_documento"
                  placeholder="Nº documento"
                  maxLength={30}
                  value={formData.numero_documento}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="competencia"
                  name="competencia"
                  placeholder="Competência"
                  maxLength={50}
                  value={formData.competencia}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Valor*</label>
                <input
                  type="text"
                  id="valor"
                  name="valor"
                  placeholder="R$ 0,00"
                  value={formData.valor}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Data de vencimento*</label>
                <input
                  type="date"
                  id="dt_vencimento"
                  name="dt_vencimento"
                  value={formData.dt_vencimento}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Data de pagamento</label>
                <input
                  type="date"
                  id="dt_pagamento"
                  name="dt_pagamento"
                  value={formData.dt_pagamento}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <select
                  name="forma_pagamento"
                  id="forma_pagamento"
                  value={formData.forma_pagamento}
                  onChange={handleChange}
                >
                  <option value="">Forma de pagamento</option>
                  <option value="1">PIX</option>
                  <option value="2">Crédito</option>
                  <option value="3">Débito</option>
                  <option value="4">Dinheiro</option>
                  <option value="5">Boleto</option>
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
                  <option value="4">Em aberto</option>
                  <option value="3">Pago</option>
                  <option value="5">Atrasado</option>
                  <option value="6">Cancelado</option>
                </select>
              </div>
            </div>
            <div className="col-6">
              <label>Observações</label>
              <textarea
                id="observacoes"
                name="observacoes"
                rows="4"
                cols="50"
                placeholder="Digite observações sobre a conta"
                maxLength={250}
                value={formData.observacoes}
                onChange={handleChange}
                style={{ resize: "none" }}
              />
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
