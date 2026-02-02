import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ContasCadastradas({
  isOpenContasCadastradas,
  setCloseModal,
}) {
  const [contas, setContas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [editandoDados, setEditandoDados] = useState({
    tipo_conta: "",
    fornecedor_cliente: "",
    valor: "",
    dt_vencimento: "",
    dt_pagamento: "",
    forma_pagamento: "",
    status: "",
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

  useEffect(() => {
    if (isOpenContasCadastradas) {
      carregarContas();
    }
  }, [isOpenContasCadastradas]);

  const carregarContas = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/accounting/accountsRegistered", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setContas(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        Swal.fire({
          icon: "error",
          title: "Erro ao carregar contas",
          text: "Não foi possível carregar as contas.",
          confirmButtonColor: "#00968F",
        });
      });
  };

  const startEdit = (conta) => {
    setEditandoId(conta.id_conta);
    setEditandoDados({
      tipo_conta: conta.id_tipo_conta?.toString() || "",
      fornecedor_cliente: conta.fornecedor || conta.cliente || "",
      valor: conta.valor?.toString() || "",
      dt_vencimento: conta.dt_vencimento?.split('T')[0] || "",
      dt_pagamento: conta.dt_pagamento?.split('T')[0] || "",
      forma_pagamento: conta.forma_pagamento?.toString() || "",
      status: conta.id_status?.toString() || "",
    });
  };

  const cancelEdit = () => {
    setEditandoId(null);
    setEditandoDados({
      tipo_conta: "",
      fornecedor_cliente: "",
      valor: "",
      dt_vencimento: "",
      dt_pagamento: "",
      forma_pagamento: "",
      status: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "valor") {
      const valorFormatado = formatarMoeda(value);
      setEditandoDados({
        ...editandoDados,
        [name]: valorFormatado,
      });
    } else {
      setEditandoDados({
        ...editandoDados,
        [name]: value,
      });
    }
  };

  const saveEdit = async (id_conta) => {
    const {
      tipo_conta,
      fornecedor_cliente,
      valor,
      dt_vencimento,
      status,
      dt_pagamento,
      forma_pagamento,
    } = editandoDados;

    if (
      !tipo_conta ||
      !fornecedor_cliente ||
      !valor ||
      !dt_vencimento ||
      !status
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos obrigatórios!",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (fornecedor_cliente.length > 50 || fornecedor_cliente.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Fornecedor/Cliente inválido!",
        text: "O nome deve ter entre 3 e 50 caracteres.",
        color: "#050538",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    const valorNumerico = parseFloat(removerFormatacaoMoeda(valor));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Swal.fire({
        icon: "error",
        title: "Valor inválido",
        text: "O valor da conta deve ser maior que zero.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (status === "3" && !dt_pagamento) {
      Swal.fire({
        icon: "error",
        title: "Atenção",
        text: "Para contas com status 'Pago', é necessário informar a data de pagamento.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if ((dt_pagamento || forma_pagamento) && status !== "3") {
      Swal.fire({
        icon: "error",
        title: "Status inválido!",
        text: "Contas com data de pagamento ou forma de pagamento devem ter status 'Pago'..",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    const token = localStorage.getItem("token");

    const dadosParaEnvio = {
      ...editandoDados,
      valor: removerFormatacaoMoeda(valor),
      dt_pagamento: editandoDados.dt_pagamento || null,
      forma_pagamento: editandoDados.forma_pagamento || null,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/accounting/accountsRegistered/${id_conta}/edit`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        },
      );

      const data = await response.json();

      if (response.ok && data.mensagem === "Conta atualizada com sucesso!") {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Conta atualizada com sucesso.",
          confirmButtonColor: "#00968F",
        });

        carregarContas();
        cancelEdit();
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao atualizar",
          text: data.mensagem || "Não foi possível atualizar a conta.",
          confirmButtonColor: "#00968F",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar conta:", error);
      Swal.fire({
        icon: "error",
        title: "Erro de conexão",
        text: "Não foi possível conectar ao servidor.",
        confirmButtonColor: "#00968F",
      });
    }
  };

  const deleteAccount = (id_conta) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação excluirá a conta!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00968F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch(
            `http://localhost:5000/api/accounting/accountsRegistered/${id_conta}/delete`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          const data = await response.json();
          if (response.ok && data.mensagem === "Conta excluída com sucesso!") {
            Swal.fire({
              icon: "success",
              title: "Excluído!",
              text: "A conta foi excluída com sucesso.",
              confirmButtonColor: "#00968F",
            });

            carregarContas();
          } else {
            Swal.fire({
              icon: "error",
              title: "Erro ao excluir",
              text: data.mensagem || "Não foi possível excluir a conta.",
              confirmButtonColor: "#00968F",
            });
          }
        } catch (error) {
          console.error("Erro ao excluir conta:", error);
          Swal.fire({
            icon: "error",
            title: "Erro de conexão",
            text: "Não foi possível conectar ao servidor.",
            confirmButtonColor: "#00968F",
          });
        }
      }
    });
  };

  const formatarValor = (valor) => {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  if (isOpenContasCadastradas) {
    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <h1>CONTAS CADASTRADAS</h1>
          <div className="rel">
            <table id="tb-contas">
              <tr>
                <th>Tipo</th>
                <th>Fornecedor/Cliente</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Status</th>
                <th>Data pgto</th>
                <th>Forma pgto</th>
              </tr>
              {contas.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Não há contas cadastradas.
                  </td>
                </tr>
              ) : (
                contas.map((conta) => (
                  <tr key={conta.id_conta}>
                    {editandoId === conta.id_conta ? (
                      <>
                        <td>
                          {editandoDados.tipo_conta === "1"
                            ? "A Pagar"
                            : "A Receber"}
                        </td>
                        <td>
                          <input
                            type="text"
                            id="fornecedor_cliente"
                            name="fornecedor_cliente"
                            value={editandoDados.fornecedor_cliente}
                            maxLength={50}
                            required
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            id="valor"
                            name="valor"
                            value={editandoDados.valor}
                            onChange={handleInputChange}
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            name="dt_vencimento"
                            value={editandoDados.dt_vencimento}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <select
                            name="status"
                            value={editandoDados.status}
                            onChange={handleInputChange}
                          >
                            <option value="">Selecione</option>
                            <option value="4">Em aberto</option>
                            <option value="3">Pago</option>
                            <option value="5">Atrasado</option>
                            <option value="6">Cancelado</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="date"
                            name="dt_pagamento"
                            value={editandoDados.dt_pagamento}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <select
                            name="forma_pagamento"
                            value={editandoDados.forma_pagamento}
                            onChange={handleInputChange}
                          >
                            <option value="">Selecione</option>
                            <option value="1">PIX</option>
                            <option value="2">Crédito</option>
                            <option value="3">Débito</option>
                            <option value="4">Dinheiro</option>
                            <option value="5">Boleto</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => saveEdit(conta.id_conta)}
                            className="btn-modal"
                          >
                            Salvar
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={cancelEdit}
                            className="btn-modal"
                          >
                            Cancelar
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          {conta.id_tipo_conta === 1 ? "A Pagar" : "A Receber"}
                        </td>
                        <td>{conta.fornecedor || conta.cliente}</td>
                        <td>{formatarValor(conta.valor)}</td>
                        <td>{formatarData(conta.dt_vencimento)}</td>
                        <td>
                          {conta.id_status === 4 && "Em aberto"}
                          {conta.id_status === 3 && "Pago"}
                          {conta.id_status === 5 && "Atrasado"}
                          {conta.id_status === 6 && "Cancelado"}
                        </td>
                        <td>{formatarData(conta.dt_pagamento)}</td>
                        <td>
                          {conta.id_forma_pagamento === 1 && "PIX"}
                          {conta.id_forma_pagamento === 2 && "Crédito"}
                          {conta.id_forma_pagamento === 3 && "Débito"}
                          {conta.id_forma_pagamento === 4 && "Dinheiro"}
                          {conta.id_forma_pagamento === 5 && "Boleto"}
                          {!conta.id_forma_pagamento && "-"}
                        </td>
                        <td>
                          <i
                            className="fa-solid fa-pen"
                            onClick={() => startEdit(conta)}
                            title="Editar"
                          />
                        </td>
                        <td>
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteAccount(conta.id_conta)}
                            title="Excluir"
                          />
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </table>
          </div>
          <div className="botao-form">
            <button type="button" className="botao" onClick={setCloseModal}>
              <p>Voltar</p>
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
}
