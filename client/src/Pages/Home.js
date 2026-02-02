import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import EditarPerfil from "../Modals/Editar-perfil.js";
import Header from "../Inc/Header.js";
import carrinho from "../Assets/carrinho.png";
import rodape from "../Assets/rodape.png";
import Footer from "../Inc/Footer.js";
import "../Styles/Home.css";

export default function Home() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState({ nome: "", email: "", foto: "" });
  const [crm, setCrm] = useState([]);
  const [services, setServices] = useState([]);
  const [stock, setStock] = useState([]);
  const [accounting, setAccounting] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.remove("modal-open");

    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const userResponse = await fetch("http://localhost:5000/api/home", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (userResponse.status === 401) {
          Swal.fire({
            title: "Sessão expirou!",
            text: "Faça o login novamente.",
            color: "#050538",
            confirmButtonColor: "#00968F",
          });

          navigate("/", { state: { showLoginModal: true } });
          return;
        }

        if (userResponse.mensagem === "Usuário não encontrado!") {
          return setUser("Usuário não encontrado!");
        }

        const userData = await userResponse.json();
        setUser(userData);

        const [
          crmResponse,
          servicesResponse,
          stockResponse,
          accountingResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/api/crm/clientsRegistered", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/services/servicesRegistered", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/stock/productsRegistered", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/accounting/accountsRegistered", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const crmData = await crmResponse.json();
        const servicesData = await servicesResponse.json();
        const stockData = await stockResponse.json();
        const accountingData = await accountingResponse.json();

        setCrm(crmData.length === 0 ? [] : crmData);
        setServices(servicesData.length === 0 ? [] : servicesData);
        setStock(stockData.length === 0 ? [] : stockData);
        setAccounting(accountingData.length === 0 ? [] : accountingData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
    AOS.init();
  }, [navigate]);

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  return (
    <>
      {isEditModalOpen && (
        <EditarPerfil
          user={user}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={(updatedUser) => {
            setUser(updatedUser);
            setIsEditModalOpen(false);
          }}
        />
      )}
      <body className="body-home">
        <Header />
        <main className="main-home">
          <div className="carrinho">
            <p className="txt-carrinho" data-aos="fade-right">
              <b>Comece a vender mais.</b>
            </p>
            <img src={carrinho} alt="Carrinho" />
            <p className="txt-carrinho" data-aos="fade-left">
              Plataforma que te impulsiona.
            </p>
          </div>
          <hr />
          <div id="alterar-usuario" data-aos="fade-right">
            <div>
              {user.foto ? (
                <img
                  src={user.foto}
                  alt="Foto de perfil"
                  className="icon"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Link className="icon" to="#">
                  <i className="fa-regular fa-circle-user" />
                </Link>
              )}
              <p>
                <b>{user.nome}</b>
              </p>
              <p className="email-usuario">{user.email}</p>
              <button
                className="alterar-dados"
                onClick={() => setIsEditModalOpen(true)}
              >
                Alterar
              </button>
            </div>
          </div>
          <div id="resumo-rapido" data-aos="fade-left">
            <p>
              <b>Resumo Rápido</b>
            </p>
            <div id="resumo">
              <p>Clientes</p>
              <div className="dados-resumo">
                {crm.length === 0 ? (
                  <tr>Não há clientes cadastrados.</tr>
                ) : (
                  crm.map((cliente, index) => (
                    <tr key={index}>{cliente.nome}</tr>
                  ))
                )}
              </div>
            </div>
            <div id="resumo">
              <p>Serviços</p>
              <div className="dados-resumo">
                {services.length === 0 ? (
                  <tr>Não há serviços cadastrados.</tr>
                ) : (
                  services.map((service, index) => (
                    <tr key={index}>{service.servico}</tr>
                  ))
                )}
              </div>
            </div>
            <div id="resumo">
              <p>Estoque</p>
              <div className="dados-resumo">
                {stock.length === 0 ? (
                  <tr>Não há itens cadastrados.</tr>
                ) : (
                  stock.map((produto, index) => (
                    <tr key={index}>{produto.nome}</tr>
                  ))
                )}
              </div>
            </div>
          </div>
          <div id="busca-rapida" data-aos="fade-right">
            <p>
              <b>Menu</b>
            </p>
            <ul className="lista-menu-rapido">
              <li className="menu-rapido">
                <Link to="/crm">CRM</Link>
              </li>
              <li className="menu-rapido">
                <Link to="/vendas">VENDAS</Link>
              </li>
              <li className="menu-rapido">
                <Link to="/servicos">SERVIÇOS</Link>
              </li>
              <li className="menu-rapido">
                <Link to="/estoque">ESTOQUE</Link>
              </li>
              <li className="menu-rapido">
                <Link to="/contabilidade">CONTABILIDADE</Link>
              </li>
            </ul>
          </div>
          <div id="resumo-contas" data-aos="fade-left">
            <p>
              <b>Resumo de contas</b>
            </p>
            <div className="dados-resumo-contas">
              <table>
                <tr>
                  <th>Tipo</th>
                  <th>Fornecedor/Cliente</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                </tr>
                {accounting.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Não há contas cadastradas.
                    </td>
                  </tr>
                ) : (
                  accounting.map((conta) => (
                    <tr key={conta.id_conta}>
                      <td>
                        {conta.id_tipo_conta === 1 ? "A Pagar" : "A Receber"}
                      </td>
                      <td>{conta.fornecedor || conta.cliente}</td>
                      <td>{formatarMoeda(conta.valor)}</td>
                      <td>{formatarData(conta.dt_vencimento)}</td>
                      <td>
                        {conta.id_status === 4 && "Em aberto"}
                        {conta.id_status === 3 && "Pago"}
                        {conta.id_status === 5 && "Atrasado"}
                        {conta.id_status === 6 && "Cancelado"}
                      </td>
                    </tr>
                  ))
                )}
              </table>
            </div>
          </div>
          <hr />
          <div className="ajuda">
            <p className="txt-ajuda" data-aos="fade-right">
              Precisa de ajuda?{" "}
              <b>
                <Link to="#">Clique aqui.</Link>
              </b>
            </p>
            <img src={rodape} alt="Imagem de ajuda" />
            <p className="txt-ajuda" data-aos="fade-left">
              A Soul está aqui para te ajudar.
            </p>
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
}
