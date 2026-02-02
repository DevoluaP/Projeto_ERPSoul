import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../Assets/logo.png";
import Footer from "../Inc/Footer.js";
import "../Styles/Geral.css";

const NovaSenha = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [idRec, setIdRec] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      Swal.fire({
        title: "Link inválido!",
        color: "#050538",
        confirmButtonColor: "#00968F",
      }).then(() => {
        navigate("/home");
      });
    }

    const params = new URLSearchParams(window.location.search);
    const idRecFromUrl = params.get("idRec");

    if (idRecFromUrl) {
      setIdRec(idRecFromUrl);
    } else {
      Swal.fire({
        title: "Link inválido!",
        color: "#050538",
        confirmButtonColor: "#00968F",
      }).then(() => {
        navigate("/");
      });
    }
  }, [navigate]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
  };

  const handleChangeConfSenha = (e) => {
    setConfSenha(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!idRec) {
      Swal.fire({
        title: "Não é possível alterar a senha!",
        color: "#050538",
        confirmButtonColor: "#00968F",
      });
    } else if (!email || !senha || !confSenha) {
      Swal.fire({
        title: "Preencha todos os campos!",
        color: "#050538",
        confirmButtonColor: "#00968F",
      });
    } else if (senha !== confSenha) {
      Swal.fire({
        title: "As senhas são diferentes!",
        color: "#050538",
        confirmButtonColor: "#00968F",
      });
    } else if (
      email.length > 250 ||
      senha.length > 60 ||
      confSenha.length > 60
    ) {
      Swal.fire({
        title: "Credenciais inválidas!",
        color: "#050538",
        confirmButtonColor: "#00968F",
      });
    } else {
      fetch("http://localhost:5000/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha, confSenha, idRec }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.mensagem === "Preencha todos os campos!") {
            Swal.fire({
              title: "Preencha todos os campos!",
              color: "#050538",
              confirmButtonColor: "#00968F",
            });
          } else if (data.mensagem === "As senhas são diferentes!") {
            Swal.fire({
              title: "As senhas são diferentes!",
              color: "#050538",
              confirmButtonColor: "#00968F",
            });
          } else if (data.mensagem === "Credenciais inválidas!") {
            Swal.fire({
              title: "Credenciais inválidas!",
              color: "#050538",
              confirmButtonColor: "#00968F",
            });
          } else if (data.mensagem === "Usuário inválido!") {
            Swal.fire({
              title: "Usuário inválido!",
              color: "#050538",
              confirmButtonColor: "#00968F",
            });
          } else if (data.mensagem === "Senha alterada com sucesso!") {
            Swal.fire({
              title: "Senha alterada com sucesso!",
              text: "Estamos redirecionando você para a página de login.",
              icon: "success",
              color: "#050538",
              confirmButtonColor: "#00968F",
              timer: 5000,
              showConfirmButton: false,
              timerProgressBar: true,
              willClose: () => {
                navigate("/", { state: { showLoginModal: true } });
              },
            });
          } else {
            Swal.fire({
              title: "ERRO - não foi possível alterar a senha!",
              color: "#050538",
              confirmButtonColor: "#00968F",
            });
          }
        })
        .catch((error) => {
          console.error("Erro ao enviar nova senha:", error);
          Swal.fire({
            title: "Erro ao enviar nova senha!",
            color: "#050538",
            confirmButtonColor: "#00968F",
          });
        });
    }
  };

  return (
    <>
      <body className="body-geral">
        <div className="page-geral" id="page">
          <header className="header-geral">
            <div className="btn-voltar-geral">
              <Link to="/esqueci-senha">
                <i className="fa-solid fa-arrow-left-long" />
              </Link>
            </div>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logotipo" title="ERP Soul" />
              </Link>
            </div>
          </header>
          <main className="interna-senha">
            <div className="central-senha">
              <h1 className="titulo-senha">Nova Senha</h1>
              <p className="paragrafo-centro">
                Digite o E-mail cadastrado e sua nova senha.
              </p>
              <div className="box-senha">
                <div className="formulario-senha">
                  <form onSubmit={handleSubmit}>
                    <div className="row-senha">
                      <div className="col-senha">
                        <label className="label-senha">E-mail:</label>
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
                    </div>
                    <div className="row-senha">
                      <div className="col-senha">
                        <label className="label-senha">
                          Digite sua nova senha:
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="senha"
                          name="senha"
                          placeholder="Nova Senha*"
                          maxLength={60}
                          onChange={handleChangeSenha}
                          value={senha}
                          required
                        />
                        {senha && (
                          <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="btn-mostrar-senha"
                          >
                            {showPassword ? "Ocultar" : "Mostrar"}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="row-senha">
                      <div className="col-senha">
                        <input
                          type={showConfPassword ? "text" : "password"}
                          id="conf-senha"
                          name="conf-senha"
                          placeholder="Repita Nova Senha*"
                          maxLength={60}
                          onChange={handleChangeConfSenha}
                          value={confSenha}
                          required
                        />
                        {confSenha && (
                          <button
                            type="button"
                            onClick={handleToggleConfPassword}
                            className="btn-mostrar-senha"
                          >
                            {showConfPassword ? "Ocultar" : "Mostrar"}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="btn-senha">
                      <button
                        className="btn-rec-senha"
                        type="submit"
                        id="btn-rec-senha"
                      >
                        Concluir
                      </button>
                    </div>
                  </form>
                </div>
                <br />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </>
  );
};

export default NovaSenha;
