import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ProdutosCadastrados({
  isOpenProdutosCadastrados,
  setCloseModal,
}) {
  const [produtos, setProdutos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [editandoDados, setEditandoDados] = useState({
    nome: "",
    marca: "",
    preco_custo: "",
    preco_venda: "",
    sku: "",
    codigo: "",
    quantidade: "",
    producao: "",
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
    if (isOpenProdutosCadastrados) {
      carregarProdutos();
    }
  }, [isOpenProdutosCadastrados]);

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
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        Swal.fire({
          icon: "error",
          title: "Erro ao carregar produtos",
          text: "Não foi possível carregar os produtos.",
          confirmButtonColor: "#00968F",
        });
      });
  };

  const startEdit = (produto) => {
    setEditandoId(produto.id_produto);

    const precoCustoFormatado = produto.preco_custo
      ? `R$ ${parseFloat(produto.preco_custo).toFixed(2).replace(".", ",")}`
      : "";
    const precoVendaFormatado = produto.preco_venda
      ? `R$ ${parseFloat(produto.preco_venda).toFixed(2).replace(".", ",")}`
      : "";

    setEditandoDados({
      nome: produto.nome || "",
      marca: produto.marca || "",
      preco_custo: precoCustoFormatado,
      preco_venda: precoVendaFormatado,
      sku: produto.sku || "",
      codigo: produto.codigo_de_barras || "",
      quantidade: produto.quantidade?.toString() || "",
      producao: produto.id_tipo_produto?.toString() || "",
      status: produto.id_status?.toString() || "",
    });
  };

  const cancelEdit = () => {
    setEditandoId(null);
    setEditandoDados({
      nome: "",
      marca: "",
      preco_custo: "",
      preco_venda: "",
      sku: "",
      codigo: "",
      quantidade: "",
      producao: "",
      status: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "preco_custo" || name === "preco_venda") {
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

  const saveEdit = async (id_produto) => {
    const {
      nome,
      sku,
      codigo,
      preco_custo,
      preco_venda,
      quantidade,
      producao,
      status,
    } = editandoDados;

    if (!nome || nome.trim() === "") {
      Swal.fire({
        title: "Campo obrigatório",
        text: "Preencha o campo nome.",
        icon: "error",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (!sku || sku.trim() === "") {
      Swal.fire({
        title: "Campo obrigatório",
        text: "Preencha o campo SKU.",
        icon: "error",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (!codigo || codigo.trim() === "") {
      Swal.fire({
        title: "Campo obrigatório",
        text: "Preencha o campo código de barras.",
        icon: "error",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (!producao) {
      Swal.fire({
        title: "Campo obrigatório",
        text: "Selecione o tipo de produção.",
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
      nome: nome.trim(),
      marca: editandoDados.marca?.trim() || null,
      preco_custo: preco_custo ? removerFormatacaoMoeda(preco_custo) : null,
      preco_venda: preco_venda ? removerFormatacaoMoeda(preco_venda) : null,
      sku: sku.trim(),
      codigo: codigo.trim(),
      quantidade: quantidade ? parseFloat(quantidade) : 0,
      producao: parseInt(producao),
      status: parseInt(status),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/stock/productsRegistered/${id_produto}/edit`,
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

      if (response.ok && data.mensagem === "Produto atualizado com sucesso!") {
        Swal.fire({
          title: "Sucesso!",
          text: "Produto atualizado com sucesso.",
          icon: "success",
          confirmButtonColor: "#00968F",
        });

        carregarProdutos();
        cancelEdit();
      } else {
        Swal.fire({
          title: "Erro ao atualizar",
          text: data.mensagem || "Não foi possível atualizar o produto.",
          icon: "error",
          confirmButtonColor: "#00968F",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      Swal.fire({
        title: "Erro de conexão",
        text: "Não foi possível conectar ao servidor.",
        icon: "error",
        confirmButtonColor: "#00968F",
      });
    }
  };

  const deleteProduct = (id_produto) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação excluirá o produto!",
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
            `http://localhost:5000/api/stock/productsRegistered/${id_produto}/delete`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          const data = await response.json();
          if (
            response.ok &&
            data.mensagem === "Produto excluído com sucesso!"
          ) {
            Swal.fire({
              icon: "success",
              title: "Excluído!",
              text: "O Produto foi excluído com sucesso.",
              confirmButtonColor: "#00968F",
            });

            carregarProdutos();
          } else {
            Swal.fire({
              icon: "error",
              title: "Erro ao excluir",
              text: data.mensagem || "Não foi possível excluir o produto.",
              confirmButtonColor: "#00968F",
            });
          }
        } catch (error) {
          console.error("Erro ao excluir produto:", error);
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

  if (isOpenProdutosCadastrados) {
    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <h1>PRODUTOS CADASTRADOS</h1>
          <div className="rel">
            <table id="tb-produtos">
              <tr>
                <th>Nome</th>
                <th>Marca</th>
                <th>SKU</th>
                <th>Código de barras</th>
                <th>Preço de custo</th>
                <th>Preço de venda</th>
                <th>Qtd</th>
                <th>Produção</th>
                <th>Status</th>
              </tr>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    Não há produtos cadastrados.
                  </td>
                </tr>
              ) : (
                produtos.map((produto, index) => (
                  <tr key={index}>
                    {editandoId === produto.id_produto ? (
                      <>
                        <td>
                          <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={editandoDados.nome}
                            maxLength={50}
                            required
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="marca"
                            value={editandoDados.marca}
                            maxLength={50}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="sku"
                            value={editandoDados.sku}
                            maxLength={50}
                            required
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="codigo"
                            value={editandoDados.codigo}
                            maxLength={50}
                            required
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="preco_custo"
                            value={editandoDados.preco_custo}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="preco_venda"
                            value={editandoDados.preco_venda}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="quantidade"
                            value={editandoDados.quantidade}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <select
                            name="producao"
                            value={editandoDados.producao}
                            onChange={handleInputChange}
                          >
                            <option value="1">Própria</option>
                            <option value="2">Terceiro</option>
                          </select>
                        </td>
                        <td>
                          <select
                            name="status"
                            value={editandoDados.status}
                            onChange={handleInputChange}
                          >
                            <option value="">Selecione</option>
                            <option value="2">Ativo</option>
                            <option value="1">Inativo</option>
                            <option value="7">Fora de linha</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => saveEdit(produto.id_produto)}
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
                        <td>{produto.nome}</td>
                        <td>{produto.marca || "-"}</td>
                        <td>{produto.sku}</td>
                        <td>{produto.codigo_de_barras}</td>
                        <td>{formatarValor(produto.preco_custo)}</td>
                        <td>{formatarValor(produto.preco_venda)}</td>
                        <td>{produto.quantidade || 0}</td>
                        <td>
                          {produto.id_tipo_produto === 1 && "Própria"}
                          {produto.id_tipo_produto === 2 && "Terceiro"}
                        </td>
                        <td>
                          {produto.id_status === 2 && "Ativo"}
                          {produto.id_status === 1 && "Inativo"}
                          {produto.id_status === 7 && "Fora de linha"}
                        </td>
                        <td>
                          <i
                            className="fa-solid fa-pen"
                            onClick={() => startEdit(produto)}
                            title="Editar"
                          />
                        </td>
                        <td>
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteProduct(produto.id_produto)}
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
