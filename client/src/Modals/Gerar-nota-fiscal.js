import { useState } from "react";
import Swal from "sweetalert2";

export default function GerarNF({ isOpenGerarNF, setCloseModal }) {
  const [numero, setNumero] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [item, setItem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [nomeRazao, setNomeRazao] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [cep, setCep] = useState("");

  if (isOpenGerarNF) {
    function formatarMoeda(valor) {
      let numero = valor.replace(/\D/g, "");
      numero = (Number(numero) / 100).toFixed(2);
      numero = numero.replace(".", ",");
      numero = numero.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      return numero ? `R$ ${numero}` : "";
    }

    function formatarCEP(valor) {
      let cepNumeros = valor.replace(/\D/g, "");
      cepNumeros = cepNumeros.substring(0, 8);

      if (cepNumeros.length > 5) {
        return `${cepNumeros.substring(0, 5)}-${cepNumeros.substring(5)}`;
      }

      return cepNumeros;
    }

    function formatarCpfCnpj(valor, tipo) {
      let numeros = valor.replace(/\D/g, "");

      if (tipo === "Física") {
        numeros = numeros.substring(0, 11);

        if (numeros.length <= 3) return numeros;
        if (numeros.length <= 6)
          return `${numeros.substring(0, 3)}.${numeros.substring(3)}`;
        if (numeros.length <= 9)
          return `${numeros.substring(0, 3)}.${numeros.substring(3, 6)}.${numeros.substring(6)}`;
        return `${numeros.substring(0, 3)}.${numeros.substring(3, 6)}.${numeros.substring(6, 9)}-${numeros.substring(9)}`;
      } else if (tipo === "Jurídica") {
        numeros = numeros.substring(0, 14);

        if (numeros.length <= 2) return numeros;
        if (numeros.length <= 5)
          return `${numeros.substring(0, 2)}.${numeros.substring(2)}`;
        if (numeros.length <= 8)
          return `${numeros.substring(0, 2)}.${numeros.substring(2, 5)}.${numeros.substring(5)}`;
        if (numeros.length <= 12)
          return `${numeros.substring(0, 2)}.${numeros.substring(2, 5)}.${numeros.substring(5, 8)}/${numeros.substring(8)}`;
        return `${numeros.substring(0, 2)}.${numeros.substring(2, 5)}.${numeros.substring(5, 8)}/${numeros.substring(8, 12)}-${numeros.substring(12)}`;
      }

      return numeros;
    }

    function handleValorUnitarioChange(e) {
      const valorFormatado = formatarMoeda(e.target.value);
      setValorUnitario(valorFormatado);
    }

    function handleValorTotalChange(e) {
      const valorFormatado = formatarMoeda(e.target.value);
      setValorTotal(valorFormatado);
    }

    function handleCepChange(e) {
      const cepFormatado = formatarCEP(e.target.value);
      setCep(cepFormatado);
    }

    function handleCpfCnpjChange(e) {
      const valorFormatado = formatarCpfCnpj(e.target.value, tipoPessoa);
      setCpfCnpj(valorFormatado);
    }

    function handleTipoPessoaChange(e) {
      const novoTipo = e.target.value;
      setTipoPessoa(novoTipo);
      setCpfCnpj("");
    }

    function gerarPDF(e) {
      e.preventDefault();

      if (
        !numero ||
        !finalidade ||
        !dataEmissao ||
        !item ||
        !quantidade ||
        !valorTotal ||
        !nomeRazao ||
        !tipoPessoa ||
        !cpfCnpj ||
        !cep
      ) {
        const Toast = Swal.mixin({
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "error",
          title: "Preencha todos os campos requeridos!",
        });
        return;
      } else {
        const conteudoNF = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <title>Nota Fiscal Nº ${numero}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
              }
              .header {
                text-align: center;
                border-bottom: 3px solid #000;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .header p {
                margin: 5px 0;
                color: #666;
              }
              .secao {
                margin-bottom: 25px;
                border: 1px solid #ddd;
                padding: 15px;
                background-color: #f9f9f9;
              }
              .secao h2 {
                margin-top: 0;
                font-size: 16px;
                color: #333;
                border-bottom: 2px solid #333;
                padding-bottom: 5px;
              }
              .linha {
                display: flex;
                margin-bottom: 10px;
              }
              .campo {
                flex: 1;
                margin-right: 15px;
              }
              .campo:last-child {
                margin-right: 0;
              }
              .campo label {
                font-weight: bold;
                font-size: 12px;
                color: #555;
                display: block;
                margin-bottom: 3px;
              }
              .campo span {
                font-size: 14px;
                display: block;
              }
              .total {
                background-color: #4CAF50;
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
            </style>
          </head>
          <body>
            <div class="header">
              <h1>NOTA FISCAL</h1>
              <p>Nº ${numero}</p>
              <p>Data de Emissão: ${dataEmissao}</p>
            </div>
            <div class="secao">
              <h2>Informações da Nota</h2>
              <div class="linha">
                <div class="campo">
                  <label>Número:</label>
                  <span>${numero}</span>
                </div>
                <div class="campo">
                  <label>Finalidade:</label>
                  <span>${finalidade}</span>
                </div>
                <div class="campo">
                  <label>Data de Emissão:</label>
                  <span>${dataEmissao}</span>
                </div>
              </div>
            </div>
            <div class="secao">
              <h2>Produto/Serviço</h2>
              <div class="linha">
                <div class="campo">
                  <label>Descrição:</label>
                  <span>${item}</span>
                </div>
              </div>
              <div class="linha">
                <div class="campo">
                  <label>Quantidade:</label>
                  <span>${quantidade}</span>
                </div>
                <div class="campo">
                  <label>Valor Unitário:</label>
                  <span>${valorUnitario || "Não informado"}</span>
                </div>
                <div class="campo">
                  <label>Valor Total:</label>
                  <span>${valorTotal}</span>
                </div>
              </div>
            </div>
            <div class="secao">
              <h2>Destinatário</h2>
              <div class="linha">
                <div class="campo">
                  <label>Nome/Razão Social:</label>
                  <span>${nomeRazao}</span>
                </div>
              </div>
              <div class="linha">
                <div class="campo">
                  <label>Tipo de Pessoa:</label>
                  <span>${tipoPessoa}</span>
                </div>
                <div class="campo">
                  <label>CPF/CNPJ:</label>
                  <span>${cpfCnpj}</span>
                </div>
              </div>
              <div class="linha">
                <div class="campo">
                  <label>CEP:</label>
                  <span>${cep}</span>
                </div>
              </div>
            </div>
            <div class="total">
              VALOR TOTAL: ${valorTotal}
            </div>
            <div class="footer">
              <p>Nota Fiscal gerada em ${new Date().toLocaleDateString("pt-BR")}</p>
              <p>Este documento é apenas uma simulação</p>
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
        iframe.contentDocument.write(conteudoNF);
        iframe.contentDocument.close();

        iframe.onload = () => {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();

          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        };
      }
    }

    document.body.classList.add("modal-open");

    return (
      <>
        <div className="formulario">
          <form method="post">
            <h1>Gerar nota fiscal</h1>
            <div className="info">
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    placeholder="Número*"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <select
                    name="finalidade"
                    id="finalidade"
                    value={finalidade}
                    onChange={(e) => setFinalidade(e.target.value)}
                    required
                  >
                    <option>Finalidade*</option>
                    <option value="Normal">Normal</option>
                    <option value="Ajuste">Ajuste</option>
                    <option value="Devolução">Devolução</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Data de emissão*</label>
                  <input
                    type="date"
                    id="dt-emissao"
                    name="dt-emissao"
                    value={dataEmissao}
                    onChange={(e) => setDataEmissao(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    id="item"
                    name="item"
                    placeholder="Produto/Serviço*"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Quantidade*</label>
                  <input
                    type="number"
                    id="quantidade"
                    name="quantidade"
                    placeholder="0"
                    min={0}
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Valor unitário</label>
                  <input
                    type="text"
                    id="vlr_unitario"
                    name="vlr_unitario"
                    placeholder="R$ 0,00"
                    value={valorUnitario}
                    onChange={handleValorUnitarioChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Valor total*</label>
                  <input
                    type="text"
                    id="vlr_total"
                    name="vlr_total"
                    placeholder="R$ 0,00"
                    value={valorTotal}
                    onChange={handleValorTotalChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="info">
              <div className="row">
                <div className="col-6">
                  <label>Destinatário</label>
                  <input
                    type="text"
                    id="nome_razao"
                    name="nome_razao"
                    placeholder={
                      tipoPessoa === "Física"
                        ? "Nome*"
                        : tipoPessoa === "Jurídica"
                          ? "Razão social*"
                          : "Nome/Razão social*"
                    }
                    value={nomeRazao}
                    onChange={(e) => setNomeRazao(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <select
                    name="tipo-pessoa"
                    id="tipo-pessoa"
                    value={tipoPessoa}
                    onChange={handleTipoPessoaChange}
                    required
                  >
                    <option>Tipo de pessoa*</option>
                    <option value="Física">Física</option>
                    <option value="Jurídica">Jurídica</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    id="cpf_cnpj"
                    name="cpf_cnpj"
                    placeholder={
                      tipoPessoa === "Física"
                        ? "CPF*"
                        : tipoPessoa === "Jurídica"
                          ? "CNPJ*"
                          : "CPF/CNPJ*"
                    }
                    minLength={14}
                    maxLength={18}
                    value={cpfCnpj}
                    onChange={handleCpfCnpjChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    placeholder="CEP*"
                    maxLength={9}
                    value={cep}
                    onChange={handleCepChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="botao-form">
              <button type="submit" className="botao" onClick={gerarPDF}>
                <p>Gerar</p>
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
