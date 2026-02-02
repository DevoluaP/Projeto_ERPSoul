import { useState } from "react";
import Swal from "sweetalert2";

export default function BaixarContas({ isOpenBaixarContas, setCloseModal }) {
  const [tipoConta, setTipoConta] = useState("");
  const [statusConta, setStatusConta] = useState("");

  async function buscarContas() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/accounting/exportAccounts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo_conta: tipoConta,
            status: statusConta,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar contas");
      }

      const contas = await response.json();
      return contas;
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
      throw error;
    }
  }

  function formatarData(data) {
    if (!data) return "-";
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR");
  }

  function formatarValor(valor) {
    return parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function getTipoContaDesc(tipo) {
    const tipos = {
      1: "A Pagar",
      2: "A Receber",
    };
    return tipos[tipo] || tipo;
  }

  function getStatusDesc(status) {
    const statusMap = {
      4: "Em Aberto",
      3: "Pago",
      5: "Atrasado",
      6: "Cancelado",
    };
    return statusMap[status] || status;
  }

  function getFormaPagamentoDesc(forma) {
    const formas = {
      1: "PIX",
      2: "Crédito",
      3: "Débito",
      4: "Dinheiro",
      5: "Boleto",
    };
    return formas[forma] || "-";
  }

  async function gerarPDF() {
    if (!tipoConta && !statusConta) {
      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: "Selecione pelo menos um filtro (Tipo/Status da conta).",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    try {
      const contas = await buscarContas();

      if (!contas || contas.length === 0) {
        Swal.fire({
          icon: "info",
          title: "Nenhuma conta encontrada",
          text: "Não há contas cadastradas com os filtros selecionados.",
          confirmButtonColor: "#00968F",
        });
        return;
      }

      const totalGeral = contas.reduce(
        (acc, conta) => acc + parseFloat(conta.valor),
        0,
      );

      const linhasTabela = contas
        .map(
          (conta, index) => `
        <tr style="${index % 2 === 0 ? "background-color: #f9f9f9;" : ""}">
          <td style="padding: 8px; border: 1px solid #ddd;">${getTipoContaDesc(conta.id_tipo_conta)}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${conta.fornecedor || conta.cliente || "-"}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formatarValor(conta.valor)}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formatarData(conta.dt_vencimento)}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formatarData(conta.dt_pagamento)}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${getFormaPagamentoDesc(conta.id_forma_pagamento)}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${getStatusDesc(conta.id_status)}</td>
        </tr>
      `,
        )
        .join("");

      const conteudoPDF = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Relatório de Contas</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              margin: 0;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #00968F;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              color: #333;
            }
            .header p {
              margin: 5px 0;
              color: #666;
              font-size: 14px;
            }
            .filtros {
              background-color: #f5f5f5;
              padding: 15px;
              margin-bottom: 20px;
              border-left: 4px solid #00968F;
            }
            .filtros h3 {
              margin-top: 0;
              font-size: 16px;
              color: #333;
            }
            .filtros p {
              margin: 5px 0;
              font-size: 14px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th {
              background-color: #00968F;
              color: white;
              padding: 12px 8px;
              text-align: left;
              font-size: 14px;
              border: 1px solid #00968F;
            }
            td {
              font-size: 13px;
            }
            .total {
              background-color: #00968F;
              color: white;
              padding: 15px;
              text-align: right;
              font-size: 18px;
              font-weight: bold;
              margin-top: 20px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #999;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            .resumo {
              display: flex;
              justify-content: space-around;
              margin: 20px 0;
              padding: 15px;
              background-color: #f9f9f9;
              border: 1px solid #ddd;
            }
            .resumo-item {
              text-align: center;
            }
            .resumo-item h4 {
              margin: 0;
              color: #666;
              font-size: 14px;
            }
            .resumo-item p {
              margin: 5px 0 0 0;
              font-size: 20px;
              font-weight: bold;
              color: #00968F;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Relatório de Contas</h1>
            <p>Gerado em: ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}</p>
          </div>

          <div class="filtros">
            <h3>Filtros Aplicados</h3>
            ${tipoConta ? `<p><strong>Tipo de Conta:</strong> ${tipoConta === "1" ? "A Pagar" : tipoConta === "2" ? "A Receber" : "A Pagar e Receber"}</p>` : ""}
            ${statusConta ? `<p><strong>Status:</strong> ${getStatusDesc(statusConta)}</p>` : ""}
          </div>

          <div class="resumo">
            <div class="resumo-item">
              <h4>Total de Contas</h4>
              <p>${contas.length}</p>
            </div>
            <div class="resumo-item">
              <h4>Valor Total</h4>
              <p>${formatarValor(totalGeral)}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Fornecedor/Cliente</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Pagamento</th>
                <th>Forma Pgto</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${linhasTabela}
            </tbody>
          </table>

          <div class="total">
            TOTAL GERAL: ${formatarValor(totalGeral)}
          </div>

          <div class="footer">
            <p>Relatório gerado automaticamente pelo sistema</p>
            <p>Total de ${contas.length} conta(s) encontrada(s)</p>
          </div>
        </body>
        </html>
      `;

      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";

      document.body.appendChild(iframe);

      iframe.contentDocument.open();
      iframe.contentDocument.write(conteudoPDF);
      iframe.contentDocument.close();

      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      };
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao gerar relatório",
        text: "Não foi possível gerar o relatório. Tente novamente.",
        confirmButtonColor: "#00968F",
      });
    }
  }

  if (isOpenBaixarContas) {
    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <form>
            <h1>BAIXAR CONTAS</h1>
            <div className="baixar-conta">
              <div className="row">
                <div className="col-6-baixar-contas">
                  <label>Tipo de conta</label>
                  <select
                    name="tipo_conta"
                    id="tipo_conta"
                    value={tipoConta}
                    onChange={(e) => setTipoConta(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="1">A Pagar</option>
                    <option value="2">A Receber</option>
                    <option value="3">A Pagar e Receber</option>
                  </select>
                </div>
                <div className="col-6-baixar-contas">
                  <label>Status da conta</label>
                  <select
                    name="tipo_conta"
                    id="tipo_conta"
                    value={statusConta}
                    onChange={(e) => setStatusConta(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="4">Em aberto</option>
                    <option value="3">Pago</option>
                    <option value="5">Atrasado</option>
                    <option value="6">Cancelado</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="botao-form">
              <button type="button" className="botao" onClick={gerarPDF}>
                <p>Baixar</p>
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
