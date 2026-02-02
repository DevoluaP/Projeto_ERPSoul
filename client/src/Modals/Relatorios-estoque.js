import { useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function RelatoriosEstoque({
  isOpenRelatoriosEstoque,
  setCloseModal,
}) {
  const [produtos, setProdutos] = useState([]);
  const [filtros, setFiltros] = useState({
    producao: "",
    status: "",
    nome: "",
    sku: "",
    codigo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  const gerarRelatorio = async (e) => {
    e.preventDefault();

    const { producao, status, nome, sku, codigo } = filtros;

    if (!producao && !status && !nome && !sku && !codigo) {
      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Preencha pelo menos um campo para gerar o relatório.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/stock/reports", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filtros),
      });

      const data = await response.json();

      if (response.ok && data.results) {
        setProdutos(data.results);
        Swal.fire({
          icon: "success",
          title: "Relatório gerado!",
          text: `${data.results.length} produto(s) encontrado(s).`,
          confirmButtonColor: "#00968F",
        });
      } else {
        setProdutos([]);
        Swal.fire({
          icon: "info",
          title: "Nenhum produto encontrado",
          text: data.mensagem || "Nenhum produto corresponde aos filtros.",
          confirmButtonColor: "#00968F",
        });
      }
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao gerar relatório",
        text: "Não foi possível conectar ao servidor.",
        confirmButtonColor: "#00968F",
      });
    }
  };

  const imprimirRelatorio = () => {
    if (produtos.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Nenhum produto",
        text: "Gere um relatório antes de imprimir.",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    Swal.fire({
      title: "Escolha o formato para exportar",
      input: "radio",
      inputOptions: {
        excel: "Exportar como Excel",
        pdf: "Exportar como PDF",
        txt: "Exportar como Documento de Texto",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Você precisa escolher um formato!";
        }
      },
      showCancelButton: true,
      confirmButtonColor: "#00968F",
      confirmButtonText: "Exportar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const produtoIds = produtos.map((produto) => produto.id_produto);

        fetch("http://localhost:5000/api/stock/exportReports", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ produtoIds }),
        })
          .then((response) => response.json())
          .then((data) => {
            switch (result.value) {
              case "excel":
                exportToExcel(data.produtos);
                break;
              case "pdf":
                exportToPDF(data.produtos);
                break;
              case "txt":
                exportToText(data.produtos);
                break;
              default:
                console.error("Formato de exportação inválido:", result.value);
            }
          })
          .catch((error) =>
            console.error("Erro ao exportar relatório:", error),
          );
      }
    });
  };

  const exportToExcel = (produtos) => {
    const wb = XLSX.utils.book_new();
    const ws_data = [
      [
        "SKU",
        "Nome",
        "Marca",
        "Preço de Custo",
        "Preço de Venda",
        "Quantidade",
        "Produção",
        "Status",
      ],
    ];

    produtos.forEach((produto) => {
      const produtoData = [
        produto.sku,
        produto.nome,
        produto.marca || "-",
        formatarValor(produto.preco_custo),
        formatarValor(produto.preco_venda),
        produto.quantidade || 0,
        produto.id_tipo_produto === 1 ? "Própria" : "Terceiro",
        produto.id_status === 2
          ? "Ativo"
          : produto.id_status === 1
            ? "Inativo"
            : "Fora de linha",
      ];
      ws_data.push(produtoData);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Produtos");
    XLSX.writeFile(wb, "relatorio_estoque.xlsx");

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Exportado com sucesso!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const exportToPDF = (produtos) => {
    const doc = new jsPDF();
    const tableColumn = [
      "SKU",
      "Nome",
      "Marca",
      "Preço Custo",
      "Preço Venda",
      "Qtd",
      "Produção",
      "Status",
    ];
    const tableRows = [];

    produtos.forEach((produto) => {
      const produtoData = [
        produto.sku,
        produto.nome,
        produto.marca || "-",
        formatarValor(produto.preco_custo),
        formatarValor(produto.preco_venda),
        produto.quantidade || 0,
        produto.id_tipo_produto === 1 ? "Própria" : "Terceiro",
        produto.id_status === 2
          ? "Ativo"
          : produto.id_status === 1
            ? "Inativo"
            : "Fora de linha",
      ];
      tableRows.push(produtoData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("relatorio_estoque.pdf");

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Exportado com sucesso!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const exportToText = (produtos) => {
    let texto =
      "SKU | Nome | Marca | Preço de Custo | Preço de Venda | Quantidade | Produção | Status\n";

    produtos.forEach((produto) => {
      texto += `${produto.sku} | ${produto.nome} | ${produto.marca || "-"} | ${formatarValor(produto.preco_custo)} | ${formatarValor(produto.preco_venda)} | ${produto.quantidade || 0} | ${produto.id_tipo_produto === 1 ? "Própria" : "Terceiro"} | ${produto.id_status === 2 ? "Ativo" : produto.id_status === 1 ? "Inativo" : "Fora de linha"}\n`;
    });

    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio_estoque.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Exportado com sucesso!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const formatarValor = (valor) => {
    if (!valor) return "-";
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (isOpenRelatoriosEstoque) {
    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <h1>Relatórios</h1>
          <h3>
            Para gerar seu relatório, é necessário que pelo menos um dos campos
            esteja preenchido.
          </h3>
          <form method="post" onSubmit={gerarRelatorio}>
            <div className="row">
              <div className="col-6">
                <select
                  name="producao"
                  id="producao"
                  value={filtros.producao}
                  onChange={handleInputChange}
                >
                  <option value="">Produção</option>
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
                  value={filtros.status}
                  onChange={handleInputChange}
                >
                  <option value="">Status</option>
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
                  id="nome"
                  name="nome"
                  placeholder="Filtrar por nome"
                  value={filtros.nome}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  placeholder="Filtrar por SKU"
                  value={filtros.sku}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  placeholder="Filtrar por código de barras"
                  value={filtros.codigo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="botao-form">
              <button type="submit" className="botao">
                <p>Gerar</p>
              </button>
            </div>
          </form>
          <div className="rel">
            <table id="tb-estoque">
              <tr>
                <th>SKU</th>
                <th>Nome</th>
                <th>Preço de custo</th>
                <th>Preço de venda</th>
                <th>Qtd</th>
                <th>Produção</th>
                <th>Status</th>
              </tr>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                produtos.map((produto, index) => (
                  <tr key={index}>
                    <td>{produto.sku}</td>
                    <td>{produto.nome}</td>
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
                  </tr>
                ))
              )}
            </table>
          </div>
          <div className="botao-form">
            <button type="button" className="botao" onClick={imprimirRelatorio}>
              <p>Imprimir</p>
            </button>
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
