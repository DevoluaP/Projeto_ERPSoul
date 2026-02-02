import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function VendasCadastradas({
  isOpenVendasCadastradas,
  setCloseModal,
}) {
  const [vendas, setVendas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [editandoDados, setEditandoDados] = useState({
    forma_pagamento: "",
    status: "",
  });

  useEffect(() => {
    if (isOpenVendasCadastradas) {
      carregarVendas();
    }
  }, [isOpenVendasCadastradas]);

  const carregarVendas = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/sales/salesRegistered", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setVendas(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Erro ao buscar vendas:", error);
        Swal.fire({
          icon: "error",
          title: "Erro ao carregar vendas",
          text: "Não foi possível carregar as vendas.",
          confirmButtonColor: "#00968F",
        });
      });
  };

  const startEdit = (venda) => {
    setEditandoId(venda.id_venda);
    setEditandoDados({
      forma_pagamento: venda.id_forma_pagamento
        ? venda.id_forma_pagamento.toString()
        : "",
      status: venda.id_status ? venda.id_status.toString() : "",
    });
  };

  const cancelEdit = () => {
    setEditandoId(null);
    setEditandoDados({
      forma_pagamento: "",
      status: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditandoDados({
      ...editandoDados,
      [name]: value,
    });
  };

  const saveEdit = async (id_venda) => {
    const { forma_pagamento, status } = editandoDados;

    if (status === 3 && !forma_pagamento) {
      Swal.fire({
        title: "Campo obrigatório",
        text: "Selecione a forma de pagamento.",
        icon: "error",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (!status) {
      Swal.fire({
        title: "Campo obrigatório",
        text: "Selecione o status.",
        icon: "error",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    const token = localStorage.getItem("token");

    const dadosParaEnvio = {
      forma_pagamento: parseInt(forma_pagamento),
      status: parseInt(status),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/sales/salesRegistered/${id_venda}/edit`,
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

      if (response.ok && data.mensagem === "Venda atualizada com sucesso!") {
        Swal.fire({
          title: "Sucesso!",
          text: "Venda atualizada com sucesso.",
          icon: "success",
          confirmButtonColor: "#00968F",
        });

        carregarVendas();
        cancelEdit();
      } else {
        Swal.fire({
          title: "Erro ao atualizar",
          text: data.mensagem || "Não foi possível atualizar a venda.",
          icon: "error",
          confirmButtonColor: "#00968F",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar venda:", error);
      Swal.fire({
        title: "Erro de conexão",
        text: "Não foi possível conectar ao servidor.",
        icon: "error",
        confirmButtonColor: "#00968F",
      });
    }
  };

  const excluirVenda = (id_venda) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação excluirá a venda!",
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
            `http://localhost:5000/api/sales/salesRegistered/${id_venda}/delete`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          const data = await response.json();

          if (response.ok && data.mensagem === "Venda excluída com sucesso!") {
            Swal.fire({
              icon: "success",
              title: "Excluída!",
              text: "A venda foi excluída com sucesso.",
              confirmButtonColor: "#00968F",
            });

            carregarVendas();
          } else {
            Swal.fire({
              icon: "error",
              title: "Erro ao excluir",
              text: data.mensagem || "Não foi possível excluir a venda.",
              confirmButtonColor: "#00968F",
            });
          }
        } catch (error) {
          console.error("Erro ao excluir venda:", error);
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
    if (!valor) return "-";
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  if (isOpenVendasCadastradas) {
    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <h1>VENDAS CADASTRADAS</h1>
          <div className="rel">
            <table id="tb-vendas">
              <tr>
                <th>Cliente</th>
                <th>Produtos</th>
                <th>Quantidade</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Forma de Pgto</th>
                <th>Status</th>
              </tr>
              {vendas.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Não há vendas cadastradas.
                  </td>
                </tr>
              ) : (
                vendas.map((venda, index) => (
                  <tr key={index}>
                    {editandoId === venda.id_venda ? (
                      <>
                        <td>{venda.nome_cliente}</td>
                        <td>{venda.nome_produto}</td>
                        <td>{venda.quantidade}</td>
                        <td>{formatarData(venda.dt_venda)}</td>
                        <td>{formatarValor(venda.total_venda)}</td>
                        <td>
                          <select
                            name="forma_pagamento"
                            value={editandoDados.forma_pagamento}
                            onChange={handleInputChange}
                          >
                            <option value="">Selecione</option>
                            <option value="1">Pix</option>
                            <option value="2">Cartão Crédito</option>
                            <option value="3">Cartão Débito</option>
                            <option value="4">Dinheiro</option>
                            <option value="5">Boleto</option>
                          </select>
                        </td>
                        <td>
                          <select
                            name="status"
                            value={editandoDados.status}
                            onChange={handleInputChange}
                          >
                            <option value="">Selecione</option>
                            <option value="4">Aberta</option>
                            <option value="3">Paga</option>
                            <option value="6">Cancelada</option>
                            <option value="8">Estornada</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => saveEdit(venda.id_venda)}
                            className="btn-modal"
                          >
                            Salvar
                          </button>
                        </td>
                        <td>
                          <button onClick={cancelEdit} className="btn-modal">
                            Cancelar
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{venda.nome_cliente}</td>
                        <td>{venda.nome_produto}</td>
                        <td>{venda.quantidade}</td>
                        <td>{formatarData(venda.dt_venda)}</td>
                        <td>{formatarValor(venda.total_venda)}</td>
                        <td>{venda.forma_pagamento}</td>
                        <td>{venda.status}</td>
                        <td>
                          <i
                            className="fa-solid fa-pen"
                            onClick={() => startEdit(venda)}
                            title="Editar"
                          />
                        </td>
                        <td>
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => excluirVenda(venda.id_venda)}
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
