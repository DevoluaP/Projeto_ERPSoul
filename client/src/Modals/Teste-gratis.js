import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mask from "../Inc/MaskCpfCnpj.js";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";

export default function TesteGratis({ isOpenTesteGratis }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpfOuCnpj: "",
    telefone: "",
    cargo: "",
    faturamento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpfOuCnpj") {
      const valorMascarado = mask(value);
      setFormData({
        ...formData,
        [name]: valorMascarado,
      });
    } else if (name === "faturamento") {
      const apenasNumeros = value.replace(/\D/g, "");
      const numero = parseFloat(apenasNumeros) / 100;
      const formatado = numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      
      setFormData({
        ...formData,
        [name]: formatado,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.telefone = formData.telefone.replace(/\D/g, "");
    formData.cpfOuCnpj = formData.cpfOuCnpj.replace(/\D/g, "");
    formData.faturamento = formData.faturamento.replace(/\D/g, "");

    const { nome, email, senha, cpfOuCnpj, telefone, cargo, faturamento } =
      formData;

    if (!nome || !email || !senha || !cpfOuCnpj || !telefone || !cargo) {
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
    } else if (nome.length > 50 || nome.length < 1) {
      const Toast = Swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: "Nome inválido!",
      });
    } else if (email.length > 250) {
      const Toast = Swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: "E-mail inválido!",
      });
    } else if (senha.length > 60) {
      const Toast = Swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: "Senha inválida!",
      });
    } else if (
      cpfOuCnpj.length < 11 ||
      cpfOuCnpj.length > 14 ||
      cpfOuCnpj.length === 12 ||
      cpfOuCnpj.length === 13
    ) {
      const Toast = Swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: "CPF ou CNPJ inválido!",
      });
    } else if (telefone.length > 14) {
      const Toast = Swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: "Telefone inválido!",
      });
    } else if (cargo.length > 50) {
      const Toast = Swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: "Cargo inválido!",
      });
    } else if (faturamento.length > 16) {
      const Toast = Swal.mixin({
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "error",
        title: "Faturamento inválido!",
      });
    } else {
      fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.mensagem === "Preencha todos os campos requeridos!") {
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
          } else if (data.mensagem === "Nome inválido!") {
            const Toast = Swal.mixin({
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "Nome inválido!",
            });
          } else if (data.mensagem === "E-mail inválido!") {
            const Toast = Swal.mixin({
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "E-mail inválido!",
            });
          } else if (data.mensagem === "Senha inválida!") {
            const Toast = Swal.mixin({
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "Senha inválida!",
            });
          } else if (data.mensagem === "CPF ou CNPJ inválido!") {
            const Toast = Swal.mixin({
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "CPF ou CNPJ inválido!",
            });
          } else if (data.mensagem === "Telefone inválido!") {
            const Toast = Swal.mixin({
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "Telefone inválido!",
            });
          } else if (data.mensagem === "Cargo inválido!") {
            const Toast = Swal.mixin({
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "Cargo inválido!",
            });
          } else if (data.mensagem === "Faturamento inválido!") {
            const Toast = Swal.mixin({
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "Faturamento inválido!",
            });
          } else if (data.token) {
            const Toast = Swal.mixin({
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "success",
              title: "Usuário cadastrado com sucesso!",
            });

            localStorage.setItem("token", data.token);
            navigate("/home");
          } else {
            const Toast = Swal.mixin({
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "Não foi possível cadastrar usuário!",
            });
          }
        })
        .catch((error) => {
          console.error("Erro ao cadastrar usuário:", error);
        });
    }
  };

  if (isOpenTesteGratis) {
    document.body.classList.add("modal-open");

    return (
      <>
        <h2>
          Teste por <span className="txt-destaque">30</span> dias grátis!
        </h2>
        <div className="box-teste">
          <div className="formulario">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Nome*"
                    maxLength={50}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail*"
                    maxLength={250}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="senha"
                    name="senha"
                    placeholder="Senha*"
                    maxLength={60}
                    onChange={handleChange}
                    required
                  />
                  {formData.senha && (
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="btn-mostrar-senha-login"
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    id="cpfOuCnpj"
                    name="cpfOuCnpj"
                    placeholder="CPF/CNPJ*"
                    minLength={14}
                    maxLength={18}
                    value={formData.cpfOuCnpj}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <InputMask
                    mask="(99) 99999-9999"
                    id="telefone"
                    name="telefone"
                    placeholder="Nº de Telefone*"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  >
                    {(inputProps) => <input {...inputProps} type="text" />}
                  </InputMask>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    id="cargo"
                    name="cargo"
                    placeholder="Cargo*"
                    maxLength={50}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    id="faturamento"
                    name="faturamento"
                    placeholder="Faturamento"
                    value={formData.faturamento}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row termos">
                <div className="col-12">
                  <input
                    className="check-box"
                    type="checkbox"
                    id="termos_priv"
                    name="termos_priv"
                    value="1"
                    required
                  />
                  <label htmlFor="termos_priv">Li e Aceito os Termos de Privacidade</label>
                </div>
              </div>
              <button type="submit" className="btn-login" id="loginBtn">
                CADASTRAR
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return null;
}
