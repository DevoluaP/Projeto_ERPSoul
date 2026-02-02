import { useState } from "react";
import Swal from "sweetalert2";
import { formatCpfCnpj } from "../Inc/MaskCpfCnpj";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function RelatoriosVendas({
  isOpenRelatoriosVendas,
  setCloseModal,
}) {
  const [vendas, setVendas] = useState([]);
  const [formData, setFormData] = useState({
    nome_cliente: "",
    data_venda: "",
    forma_pagamento: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setVendas([]);

    const { nome_cliente, data_venda, forma_pagamento, status } = formData;

    if (!nome_cliente && !data_venda && !forma_pagamento && !status) {
      Swal.fire({
        title: "Preencha pelo menos um dos campos!",
        icon: "warning",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/sales/reports", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setVendas(data);
          Swal.fire({
            icon: "success",
            title: "Relatório gerado!",
            text: `${data.length} venda(s) encontrada(s).`,
            confirmButtonColor: "#00968F",
          });
        } else if (Array.isArray(data) && data.length === 0) {
          Swal.fire({
            title: "Venda não encontrada!",
            text: "Verifique se os campos estão preenchidos corretamente.",
            icon: "info",
            confirmButtonColor: "#00968F",
          });
        } else if (data.mensagem) {
          Swal.fire({
            title: "Erro",
            text: data.mensagem,
            icon: "error",
            confirmButtonColor: "#00968F",
          });
        } else {
          Swal.fire({
            title: "Erro inesperado",
            text: "Formato de resposta inválido do servidor.",
            icon: "error",
            confirmButtonColor: "#00968F",
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao gerar relatórios:", error);
        Swal.fire({
          title: "Erro de conexão",
          text: "Não foi possível conectar ao servidor.",
          icon: "error",
          confirmButtonColor: "#00968F",
        });
      });
  };

  const handleImprimirClick = () => {
    if (vendas.length > 0) {
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
      }).then((result) => {
        if (result.isConfirmed) {
          switch (result.value) {
            case "excel":
              exportToExcel(vendas);
              break;
            case "pdf":
              exportToPDF(vendas);
              break;
            case "txt":
              exportToText(vendas);
              break;
            default:
              console.error("Formato inválido:", result.value);
          }
        }
      });
    } else {
      Swal.fire({
        title: "Nenhuma venda encontrada!",
        text: "Por favor, faça uma busca antes de exportar.",
        icon: "warning",
        confirmButtonColor: "#00968F",
      });
    }
  };

  const exportToExcel = (vendas) => {
    const wb = XLSX.utils.book_new();
    const ws_data = [
      [
        "Cliente",
        "CPF/CNPJ",
        "Produtos",
        "Quantidade",
        "Data",
        "Valor",
        "Forma de Pgto",
        "Status",
        "Observações",
      ],
    ];

    vendas.forEach((venda) => {
      const vendaData = [
        venda.nome_cliente,
        formatCpfCnpj(venda.cpf || venda.cnpj),
        venda.nome_produto || "-",
        venda.quantidade || "-",
        new Date(venda.dt_venda).toLocaleDateString("pt-BR"),
        parseFloat(venda.total_venda).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        venda.forma_pagamento || "-",
        venda.status,
        venda.observacoes || "-",
      ];
      ws_data.push(vendaData);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Vendas");
    XLSX.writeFile(wb, "relatorio_vendas.xlsx");

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Exportado com sucesso!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const exportToPDF = (vendas) => {
    const doc = new jsPDF();
    const tableColumn = [
      "Cliente",
      "CPF/CNPJ",
      "Produtos",
      "Quantidade",
      "Data",
      "Valor",
      "Forma de Pgto",
      "Status",
      "Observações",
    ];
    const tableRows = [];

    vendas.forEach((venda) => {
      const vendaData = [
        venda.nome_cliente,
        formatCpfCnpj(venda.cpf || venda.cnpj),
        venda.nome_produto || "-",
        venda.quantidade || "-",
        new Date(venda.dt_venda).toLocaleDateString("pt-BR"),
        parseFloat(venda.total_venda).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        venda.forma_pagamento || "-",
        venda.status,
        venda.observacoes,
      ];
      tableRows.push(vendaData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("relatorio_vendas.pdf");

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Exportado com sucesso!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const exportToText = (vendas) => {
    let texto =
      "Cliente | CPF/CNPJ | Produtos | Quantidade | Data | Valor | Forma de Pgto | Status | Observações\n";

    vendas.forEach((venda) => {
      texto += `${venda.nome_cliente} | ${formatCpfCnpj(venda.cpf || venda.cnpj)} | ${venda.nome_produto || "-"} | ${venda.quantidade || "-"} | ${new Date(venda.dt_venda).toLocaleDateString("pt-BR")} | ${parseFloat(venda.total_venda).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} | ${venda.forma_pagamento || "-"} | ${venda.status} | ${venda.observacoes || "-"}\n`;
    });

    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio_vendas.txt";
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

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  if (isOpenRelatoriosVendas) {
    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <h1>Relatórios de Vendas</h1>
          <h3>
            Para gerar seu relatório, é necessário que pelo menos um dos campos
            esteja preenchido.
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  name="nome_cliente"
                  id="nome_cliente"
                  placeholder="Nome do Cliente"
                  maxLength={50}
                  value={formData.nome_cliente}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Data da Venda</label>
                <input
                  type="date"
                  id="data_venda"
                  name="data_venda"
                  value={formData.data_venda}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Forma de Pagamento</label>
                <select
                  id="forma_pagamento"
                  name="forma_pagamento"
                  value={formData.forma_pagamento}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
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
                <label>Status da Venda</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Selecione o status</option>
                  <option value="3">Paga</option>
                  <option value="4">Aberta</option>
                  <option value="6">Cancelada</option>
                  <option value="8">Estornada</option>
                </select>
              </div>
            </div>
            <div className="botao-form">
              <button type="submit" className="botao">
                <p>Gerar</p>
              </button>
            </div>
          </form>
          <div className="rel">
            <table id="tb-clientes">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Produtos</th>
                  <th>Quantidade</th>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Forma de Pgto</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {vendas.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Vendas não foram encontradas.
                    </td>
                  </tr>
                ) : (
                  vendas.map((venda) => (
                    <tr key={venda.id_venda}>
                      <td>{venda.nome_cliente}</td>
                      <td>{venda.nome_produto}</td>
                      <td>{venda.quantidade || "-"}</td>
                      <td>{formatarData(venda.dt_venda)}</td>
                      <td>{formatarValor(venda.total_venda)}</td>
                      <td>{venda.forma_pagamento || "-"}</td>
                      <td>{venda.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="botao-form">
            <button
              type="button"
              className="botao"
              onClick={handleImprimirClick}
            >
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
