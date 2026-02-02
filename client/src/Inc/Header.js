import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../Assets/logo.png";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const handleLogout = () => {
    Swal.fire({
      title: "Deseja sair?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00968F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/api/user/logout", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.mensagem === "Usuário desconectado com sucesso!") {
              localStorage.removeItem("token");
              navigate("/", { state: { showLoginModal: true } });
            } else {
              Swal.fire({
                title: "Erro!",
                text: "Não foi possível desconectar.",
                icon: "error",
                confirmButtonColor: "#00968F",
              });
            }
          })
          .catch((error) =>
            console.error("Erro ao desconectar cliente:", error),
          );
      }
    });
  };

  return (
    <>
      <header>
        {!isHomePage && (
          <div className="btn-voltar-home">
            <Link to="/home">
              <i className="fa-solid fa-arrow-left-long" />
            </Link>
          </div>
        )}
        <div className="logo-container">
          <Link to="/home">
            <img src={logo} alt="logotipo" title="ERP Soul" />
          </Link>
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
                data-tooltip="Desconectar"
                aria-label="Desconectar"
                title="Desconectar"
              >
                <i className="fa-solid fa-right-from-bracket" />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
