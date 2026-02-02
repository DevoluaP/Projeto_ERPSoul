import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mask from "../Inc/MaskCpfCnpj.js";
import Swal from "sweetalert2";
import Footer from "../Inc/Footer.js";
import logo from "../Assets/logo.png";
import "../Styles/Geral.css";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeCpfCnpj = (e) => {
    const valorMascarado = mask(e.target.value);
    setCpfCnpj(valorMascarado);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedCpfCnpj = cpfCnpj.replace(/\D/g, "");

    if (!email || !cleanedCpfCnpj) {
      Swal.fire({
        title: "Preencha todos os campos!",
        color: "#050538",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    if (email.length > 250) {
      Swal.fire({
        title: "E-mail inválido!",
        color: "#050538",
        confirmButtonColor: "#00968F",
      });
      return;
    }

    fetch("http://localhost:5000/api/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, cpfCnpj: cleanedCpfCnpj }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensagem === "Preencha todos os campos!") {
          Swal.fire({
            title: "Preencha todos os campos!",
            color: "#050538",
            confirmButtonColor: "#00968F",
          });
        } else if (data.mensagem === "E-mail inválido!") {
          Swal.fire({
            title: "E-mail inválido!",
            color: "#050538",
            confirmButtonColor: "#00968F",
          });
        } else if (data.mensagem === "CPF/CNPJ inválido!") {
          Swal.fire({
            title: "CPF/CNPJ inválido!",
            color: "#050538",
            confirmButtonColor: "#00968F",
          });
        } else if (data.mensagem === "Credenciais inválidas!") {
          Swal.fire({
            title: "Credenciais inválidas!",
            text: "E-mail ou CPF/CNPJ não correspondem a um usuário cadastrado.",
            color: "#050538",
            confirmButtonColor: "#00968F",
          });
        } else if (data.mensagem === "Credenciais válidas!" && data.idRec) {
          navigate(`/nova-senha?idRec=${data.idRec}`);
        } else {
          Swal.fire({
            title: "ERRO - não foi possível verificar as credenciais!",
            color: "#050538",
            confirmButtonColor: "#00968F",
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao verificar credenciais:", error);
        Swal.fire({
          title: "ERRO - não foi possível verificar as credenciais!",
          color: "#050538",
          confirmButtonColor: "#00968F",
        });
      });
  };

  document.body.classList.remove("modal-open");

  return (
    <body className="body-geral">
      <div className="page-geral" id="page">
        <header className="header-geral">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logotipo" title="ERP Soul" />
            </Link>
          </div>
        </header>
        <main className="interna-senha">
          <div className="central-senha">
            <h1 className="titulo-senha">Precisa recuperar sua senha?</h1>
            <p className="paragrafo-centro">
              Utilize o E-mail e CPF/CNPJ cadastrado para validarmos o seu
              registro.
            </p>
            <div className="box-senha">
              <div className="formulario-senha">
                <form onSubmit={handleSubmit}>
                  <div className="row-senha">
                    <div className="col-senha">
                      <label className="label-senha">Digite o E-mail cadastrado:</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="E-mail*"
                        maxLength={250}
                        onChange={handleChangeEmail}
                        value={email}
                        required
                      />
                    </div>
                    <div className="col-senha">
                      <label className="label-senha">Digite o CPF/CNPJ cadastrado:</label>
                      <input
                        type="text"
                        name="documento"
                        id="documento"
                        placeholder="CPF/CNPJ*"
                        minLength={14}
                        maxLength={18}
                        onChange={handleChangeCpfCnpj}
                        value={cpfCnpj}
                        required
                      />
                    </div>
                  </div>
                  <div className="btn-senha">
                    <button
                      className="btn-rec-senha"
                      type="submit"
                      id="btn-rec-senha"
                    >
                      Verificar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </body>
  );
};

export default EsqueciSenha;
