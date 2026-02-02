import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../Assets/logo.png";
import Login from "../Modals/Login.js";
import TesteGratis from "../Modals/Teste-gratis.js";
import imgBox1 from "../Assets/img-box1.png";
import imgBox2 from "../Assets/img-box2.png";
import imgBox3 from "../Assets/img-box3.png";
import caixa1 from "../Assets/caixa1.png";
import caixa2 from "../Assets/caixa2.png";
import caixa3 from "../Assets/caixa3.png";
import caixa4 from "../Assets/caixa4.png";
import caixa5 from "../Assets/caixa5.png";
import caixa6 from "../Assets/caixa6.png";
import caixa7 from "../Assets/caixa7.png";
import caixa8 from "../Assets/caixa8.png";
import Footer from "../Inc/Footer.js";
import "../Styles/Index.css";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      openModal2: false,
      itsLoggedIn: false,
    };
  }

  setOpenModal = (isOpenLogin) => {
    this.setState({ openModal: isOpenLogin });
  };

  setOpenModal2 = (isOpenTesteGratis) => {
    this.setState({ openModal2: isOpenTesteGratis });
  };

  setCloseModal = () => {
    document
      .getElementsByClassName("modal-overlay-index")[0]
      .classList.add("zoom-out");

    setTimeout(() => {
      document.body.classList.remove("modal-open");
      this.setState({ openModal: false });
      this.setState({ openModal2: false });
      document
        .getElementsByClassName("modal-overlay-index")[0]
        .classList.remove("zoom-out");
    }, 300);
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }

    const { state } = this.props.location;
    if (state && state.showLoginModal) {
      this.setOpenModal(true);
      this.setState({ isLoggedIn: false });
    }
  }

  linkToHome = () => {
    const navigate = this.props.navigate;
    navigate("/home");
  };

  handleLogout = () => {
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
              this.setState({ isLoggedIn: false });
              this.setOpenModal(true);
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

  render() {
    AOS.init();

    return (
      <>
        <body className="body-index">
          <div className="page-index" id="page">
            <header className="header-index">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="logotipo" title="ERP Soul" />
                </Link>
              </div>
              <div className="nav-bar">
                <ul>
                  <a href="#funcionalidades">
                    <li>Funcionalidades</li>
                  </a>
                  <a href="#planosPrecos">
                    <li>Planos e Preços</li>
                  </a>
                  <a href="#faleConosco">
                    <li>Fale Conosco</li>
                  </a>
                </ul>
              </div>
              <div className="container-modal-index">
                {this.state.isLoggedIn ? (
                  <>
                    <ul className="navBarUl">
                      <li className="navBarUlLi" onClick={this.linkToHome}>
                        <i class="fa-regular fa-circle-user" title="Home" />
                      </li>
                      <li className="navBarUlLi" onClick={this.handleLogout}>
                        <i
                          className="fa-solid fa-right-from-bracket"
                          title="Desconectar"
                        />
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <button
                      className="modal-btn-index"
                      onClick={() => this.setOpenModal2(true)}
                    >
                      TESTE GRÁTIS
                    </button>
                    <button
                      className="modal-btn-index"
                      onClick={() => this.setOpenModal(true)}
                    >
                      <i className="fa-solid fa-user" /> ENTRAR
                    </button>
                  </>
                )}
              </div>
              {this.state.openModal && (
                <div className="modal-overlay-index">
                  <div className="modal-container-index">
                    <Login
                      isOpenLogin={this.state.openModal}
                      setCloseModal={this.setCloseModal}
                    />
                    <div className="botoes">
                      <button
                        className="close-btn-index"
                        onClick={this.setCloseModal}
                      >
                        <i className="fa-solid fa-xmark" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {this.state.openModal2 && (
                <div className="modal-overlay-index">
                  <div className="modal-container-index">
                    <TesteGratis
                      isOpenTesteGratis={this.state.openModal2}
                      setCloseModal={this.setCloseModal}
                    />
                    <div className="botoes">
                      <button
                        className="close-btn-index"
                        onClick={this.setCloseModal}
                      >
                        <i className="fa-solid fa-xmark" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </header>
            <main className="main-index">
              <div className="box1" data-aos="fade-left">
                <div className="text-box1">
                  <p>
                    A <span className="txt-destaque-index">Soul</span> é um sistema de gestão
                    <br />
                    100% <span className="txt-destaque-index">on-line</span>
                    <br />
                    que <span className="txt-destaque-index">descomplica</span> seu e-commerce.
                  </p>
                </div>
                <div className="img-box1">
                  <img src={imgBox1} alt="Imagem sobre sistema de gestão" />
                </div>
              </div>
              <div className="box2" data-aos="fade-right">
                <div className="img-box2">
                  <img
                    src={imgBox2}
                    alt="Imagem sobre plataforma de e-commerce"
                  />
                </div>
                <div className="text-box2">
                  <p>
                    <span className="txt-destaque-index">Integração</span> com plataformas de
                    <br />
                    e-commerce e marketplaces de forma
                    <br />
                    <span className="txt-destaque-index">fácil</span> e
                    <span className="txt-destaque-index"> rápida</span>.
                  </p>
                </div>
              </div>
              <div className="box3" data-aos="fade-left">
                <div className="text-box3">
                  <p>
                    Gestão de estoque como você nunca viu!
                    <br />
                    <span className="txt-destaque-index">Cadastro</span> de seus fornecedores,
                    <br />
                    emissão dos <span className="txt-destaque-index">relatórios</span> de estoque,
                    <br />
                    <span className="txt-destaque-index">controle</span> de suas compras e muito mais!
                  </p>
                </div>
                <div className="img-box3">
                  <img src={imgBox3} alt="Imagem sobre gestão de estoque" />
                </div>
              </div>
              <div className="box4" id="funcionalidades" data-aos="fade-up">
                <p>
                  Conheça tudo que a <span className="txt-destaque-index">Soul</span> faz por você
                </p>
                <div className="caixas">
                  <div className="caixa">
                    <img src={caixa5} alt="Imagem sobre tarefas concluídas" />
                    <p>100% online, segura e descomplicada.</p>
                  </div>
                  <div className="caixa">
                    <img src={caixa2} alt="Imagem sobre planejamentos" />
                    <p>
                      Planejamento de fundo de caixa e análises financeiras completas.
                    </p>
                  </div>
                  <div className="caixa">
                    <img
                      src={caixa3}
                      alt="Imagem sobre monitoramento de capital"
                    />
                    <p>Monitoramento de vendas e metas.</p>
                  </div>
                  <div className="caixa">
                    <img src={caixa4} alt="Imagem sobre histórico de vendas" />
                    <p>
                      Visualização do histórico de vendas, clientes e produtos.
                    </p>
                  </div>
                  <div className="caixa">
                    <img src={caixa1} alt="Imagem sobre gestão de negócios" />
                    <p>
                      Gestão de negócios centralizada para organização de processos operacionais.
                    </p>
                  </div>
                  <div className="caixa">
                    <img
                      src={caixa6}
                      alt="Imagem sobre automatização de compras e vendas"
                    />
                    <p>
                      Automatização de compras e vendas, mantendo o giro de estoque atualizado.
                    </p>
                  </div>
                  <div className="caixa">
                    <img
                      src={caixa7}
                      alt="Imagem sobre avaliação de relevância"
                    />
                    <p>
                      Avaliação de relevância de cada produto com relatórios
                      baseados em lucro/prejuízo, compras/vendas.
                    </p>
                  </div>
                  <div className="caixa">
                    <img
                      src={caixa8}
                      alt="Imagem sobre facilidade das negociações"
                    />
                    <p>Facilidade na visão das negociações.</p>
                  </div>
                </div>
              </div>
              <div className="box5" id="planosPrecos" data-aos="fade-up">
                <h2 class="box5-title">Planos e Preços</h2>
                <div class="planos-container">
                  <div class="plano">
                    <div class="plano-header">
                      <div class="plano-icon">
                        <i class="fa-regular fa-calendar"></i>
                      </div>
                      <h3 class="plano-nome">Plano Mensal</h3>
                    </div>
                    <div class="plano-preco">
                      <span class="preco-valor">R$ 5.000</span>
                      <p class="preco-periodo">/mês</p>
                    </div>
                    <ul class="plano-features">
                      <li><i class="fa-solid fa-check" />Gestão de Vendas</li>
                      <li><i class="fa-solid fa-check" />Controle de Estoque</li>
                      <li><i class="fa-solid fa-check" />Emissão de Nota Fiscal</li>
                      <li><i class="fa-solid fa-check" />Gestão de Serviços</li>
                      <li><i class="fa-solid fa-check" />Suporte Especializado</li>
                      <li><i class="fa-solid fa-check" />Sistema de Cobranças</li>
                      <li><i class="fa-solid fa-check" />Gestão de Fornecedores</li>
                    </ul>
                    <button class="plano-btn">CONTRATAR AGORA</button>
                  </div>
                  <div class="plano">
                    <div class="plano-header">
                      <div class="plano-icon">
                        <i class="fa-solid fa-gem" />
                      </div>
                      <h3 class="plano-nome">Plano Anual</h3>
                      <span class="plano-desconto">10% OFF</span>
                    </div>
                    <div class="plano-preco">
                      <span class="preco-valor">R$ 4.500</span>
                      <p class="preco-periodo">/mês</p>
                      <p class="preco-economia">Economize R$ 6.000 por ano!</p>
                    </div>
                    <ul class="plano-features">
                      <li><i class="fa-solid fa-check" />Gestão de Vendas</li>
                      <li><i class="fa-solid fa-check" />Controle de Estoque</li>
                      <li><i class="fa-solid fa-check" />Emissão de Nota Fiscal</li>
                      <li><i class="fa-solid fa-check" />Gestão de Serviços</li>
                      <li><i class="fa-solid fa-check" />Suporte Especializado</li>
                      <li><i class="fa-solid fa-check" />Sistema de Cobranças</li>
                      <li><i class="fa-solid fa-check" />Gestão de Fornecedores</li>
                    </ul>
                    <button class="plano-btn">CONTRATAR AGORA</button>
                  </div>
                </div>
              </div>
              <div className="box6" id="faleConosco" data-aos="fade-up">
                <p className="ctt">Entre em Contato</p>
                <div className="contato">
                  <div className="central-suporte">
                    <p className="titulo">
                      <b>É nosso cliente e está precisando de ajuda?</b>
                    </p>
                    <br />
                    <p>
                      <i className="fa-solid fa-book" /> <b>Central de ajuda</b>
                    </p>
                    <button className="btn-login" id="loginBtn">
                      CONSULTAR MANUAIS
                    </button>
                  </div>
                  <div className="central-suporte">
                    <p>
                      <i className="fa-solid fa-phone" /> <b>Suporte</b>
                    </p>
                    <p>+55 (11) 2591-2168</p>
                    <p className="subtitulo">Horário de atendimento: 8h às 20h</p>
                    <button className="btn-login" id="loginBtn">
                      CONSULTAR MANUAIS
                    </button>
                  </div>
                </div>
                <div className="contato">
                  <div className="central-suporte">
                    <p className="titulo">
                      <b>Ainda não é nosso cliente?</b>
                    </p>
                    <p className="subtitulo">Fale com nossa equipe comercial.</p>
                    <br />
                    <p className="email-central-suporte">
                      <i className="fa-solid fa-envelope-open-text" /> <b>E-mail</b>
                    </p>
                    <p>soul-erp@soul.com.br</p>
                  </div>
                  <div className="central-suporte">
                    <p className="tel-central-suporte">
                      <i className="fa-solid fa-phone" /> <b>Telefone</b>
                    </p>
                    <p>+55 (11) 3777-8902</p>
                    <p className="subtitulo" id="hora-central-suporte">
                      Horário de atendimento: 8h às 17h
                    </p>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </body>
      </>
    );
  }
}

export default function IndexWithLocation(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return <Index {...props} location={location} navigate={navigate} />;
}
