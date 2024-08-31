import React from "react";
import { Link } from "react-router-dom";

import logo from "../Assets/logo.png";
import TesteGratis from "../Modals/Teste-gratis.js";
import Login from "../Modals/Login.js";
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

import "../Styles/Index.css";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false };
        this.state = { openModal2: false };
    }
    
    setOpenModal = (isOpenLogin) => {
        this.setState({ openModal: isOpenLogin });
    }

    setOpenModal2 = (isOpenTesteGratis) => {
        this.setState({ openModal2: isOpenTesteGratis });
    }

    setCloseModal = () => {
        this.setState({ openModal: false });
        this.setState({ openModal2: false });
        document.body.classList.remove("modal-open");
    }

    render() {
        return(
                <>
                    <body className="bodyIndex">
                        <div className="pageIndex" id="page">
                            <header className="headerIndex">
                                <div className="logo">
                                  <Link to="/home-erp">
                                      <img src={ logo } alt="logotipo" title="ERP - SOUL" />
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
                                  <button className="modal-btn-index" onClick={ () => this.setOpenModal2(true) }>TESTE GRÁTIS</button>
                                  <button className="modal-btn-index" onClick={ () => this.setOpenModal(true) }>
                                      <i className="fa-solid fa-user"></i> ENTRAR
                                  </button>
                                </div>
                                
                                {this.state.openModal && (
                                    <div className="modal-overlay-index">
                                        <div className="modal-container-index">
                                            <Login isOpenLogin={ this.state.openModal } />
                                            <div className="botoes">
                                                <button className="close-btn-index" onClick={ () => this.setCloseModal() }>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.openModal2 && (
                                    <div className="modal-overlay-index">
                                        <div className="modal-container-index">
                                            <TesteGratis isOpenTesteGratis={ this.state.openModal2 } />
                                            <div className="botoes">
                                                <button className="close-btn-index" onClick={ () => this.setCloseModal() }>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </header>

                            <main className="mainIndex">
                                <div className="box1">
                                    <div className="text-box1">
                                        <p>A <b style={{ color: '#00968F' }}>Soul</b> é um sistema de gestão <br />
                                            100% <b style={{ color: '#00968F' }}>on-line</b><br />
                                            que <b style={{ color: '#00968F' }}>descomplica</b> seu e-commerce.
                                        </p>
                                    </div>
                                    <div className="img-box1">
                                        <img src={ imgBox1 } alt="Imagem sobre sistema de gestão" />
                                    </div>
                                </div>
                                <div className="box2">
                                    <div className="img-box2">
                                        <img src={ imgBox2 } alt="Imagem sobre plataforma de e-commerce" />
                                    </div>
                                    <div className="text-box2">
                                        <p><b style={{ color: '#00FFF4' }}>Integração</b> com plataformas de <br />e-commerce e marketplaces de forma <br /><b style={{ color: '#00FFF4' }}>fácil</b> e <b style={{ color: '#00FFF4' }}>rápida</b>
                                        </p>
                                    </div>
                                </div>
                                <div className="box3">
                                    <div className="text-box3">
                                        <p>Gestão de Estoque como você nunca viu!<br />
                                            <b style={{ color: '#050538' }}>Cadastro</b> de seus fornecedores, <br />emissão dos <b style={{ color: '#050538' }}>relatórios</b> de estoque, <br /> <b style={{ color: '#050538' }}>controle</b> de suas compras e muito mais!
                                        </p>
                                    </div>
                                    <div className="img-box3">
                                        <img src={ imgBox3 } alt="Imagem sobre gestão de estoque" />
                                    </div>
                                </div>
                                <div className="box4" id="funcionalidades">
                                    <p>Conheça tudo que a <b style={{ color: '#00968F' }}>Soul</b> faz por você</p>
                                    <div className="caixas">
                                        <div className="caixa">
                                            <img src={ caixa5 } alt="Imagem sobre tarefas concluídas" />
                                            <p>100% online, segura e descomplica</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa2 } alt="Imagem sobre planejamentos" />
                                            <p>Planejamento de fundo de caixa e análises financeiras completas</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa3 } alt="Imagem sobre monitoramento de capital" />
                                            <p>Monitoramento de vendas e metas</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa4 } alt="Imagem sobre histórico de vendas" />
                                            <p>Visualização do histórico de vendas, clientes e produtos</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa1 } alt="Imagem sobre gestão de negócios" />
                                            <p>Gestão de Negócios centralizada para organização de processos operacionais.</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa6 } alt="Imagem sobre automatização de compras e vendas" />
                                            <p>Automatização de compras e vendas, mantendo o giro de estoque atualizado</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa7 } alt="Imagem sobre avaliação de relevância" />
                                            <p>Avaliação de relevância de cada produto com relatórios baseados em lucro/prejuízo, compras/vendas.</p>
                                        </div>
                                        <div className="caixa">
                                            <img src={ caixa8 } alt="Imagem sobre facilidade das negociações" />
                                            <p>Facilidade na visão das negociações</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="box5" id="planosPrecos">
                                    <p>Planos e Preços</p>
                                    <div className="plano">
                                        <h2><i className="fa-regular fa-gem"></i> Plano Diamante - Anual</h2>
                                        <p>10% OFF</p>
                                        <br />
                                        <div className="lista">
                                            <ul>
                                                <li><i className="fa-solid fa-check"></i> R$ xxx,xxx</li>
                                                <li><i className="fa-solid fa-check"></i> VENDAS</li>
                                                <li><i className="fa-solid fa-check"></i> ESTOQUE</li>
                                                <li><i className="fa-solid fa-check"></i> NOTA FISCAL</li>
                                                <li><i className="fa-solid fa-check"></i> SERVIÇOS</li>
                                                <li><i className="fa-solid fa-check"></i> SUPORTE</li>
                                                <li><i className="fa-solid fa-check"></i> COBRANÇAS</li>
                                                <li><i className="fa-solid fa-check"></i> FORNECEDORES</li>
                                            </ul>
                                            <button className="btn-login" onClick={ () => this.setOpenModal2(true) } id="loginBtn">
                                                TESTE GRÁTIS
                                            </button>
                                        </div>
                                    </div>
                                    <div className="plano">
                                        <h2><i className="fa-regular fa-gem"></i> Plano Diamante - Mensal</h2>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <div className="lista">
                                            <ul>
                                                <li className="lista-valor"><i className="fa-solid fa-check"></i> R$ xxx,xxx</li>
                                                <li><i className="fa-solid fa-check"></i> VENDAS</li>
                                                <li><i className="fa-solid fa-check"></i> ESTOQUE</li>
                                                <li><i className="fa-solid fa-check"></i> NOTA FISCAL</li>
                                                <li><i className="fa-solid fa-check"></i> SERVIÇOS</li>
                                                <li><i className="fa-solid fa-check"></i> SUPORTE</li>
                                                <li><i className="fa-solid fa-check"></i> COBRANÇAS</li>
                                                <li><i className="fa-solid fa-check"></i> FORNECEDORES</li>
                                            </ul>
                                            <button className="btn-login" onClick={ () => this.setOpenModal2(true) } id="loginBtn">
                                                TESTE GRÁTIS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="box6" id="faleConosco">
                                    <p className="ctt">Entre em Contato</p>
                                    <div className="contato">
                                        <div className="central-suporte">
                                            <p className="titulo"><b>É nosso cliente e está precisando de ajuda?</b></p>
                                            <br />
                                            <p><i className="fa-solid fa-book"></i> <b>Central de ajuda</b></p>
                                            <button className="btn-login" onClick="" id="loginBtn">
                                                CONSULTAR MANUAIS
                                            </button>
                                        </div>
                                        <div className="central-suporte">
                                            <p><i className="fa-solid fa-phone"></i> <b>Suporte</b></p>
                                            <p>+55 11 99999-9999</p>
                                            <p className="subtitulo">Horário de atendimento: das 8h às 20h</p>
                                            <button className="btn-login" onClick="" id="loginBtn">
                                                CONSULTAR MANUAIS
                                            </button>
                                        </div>
                                    </div>
                                    <div className="contato">
                                        <div className="central-suporte">
                                            <p className="titulo"><b>Ainda não é nosso cliente?</b></p>
                                            <p className="subtitulo">Fale com nossa equipe comercial.</p>
                                            <br />
                                            <p className="email-central-suporte"><i className="fa-solid fa-envelope-open-text"></i> <b>E-mail</b></p>
                                            <p>soul-erp@soul.com.br</p>
                                        </div>
                                        <div className="central-suporte">
                                            <p className="tel-central-suporte"><i className="fa-solid fa-phone"></i> <b>Telefone</b></p>
                                            <p>+55 11 88888-8888</p>
                                            <p className="subtitulo" id="hora-central-suporte">Horário de atendimento: das 8h às 17h</p>
                                        </div>
                                    </div>
                                </div>
                            </main>
                            
                            <footer className="footerIndex">
                                <div className="rodape">
                                    <div className="sociais">
                                        <div className="social">
                                            <a href="www.facebook.com" target="_blank">
                                                <p><i className="fa-brands fa-facebook"></i></p>
                                            </a>
                                        </div>
                                        <div className="social">
                                            <a href="www.instagram.com" target="_blank">
                                                <p><i className="fa-brands fa-instagram"></i></p>
                                            </a>
                                        </div>
                                        <div className="social">
                                            <a href="www.linkedin.com" target="_blank">
                                                <p><i className="fa-brands fa-linkedin"></i></p>
                                            </a>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="texto-rodape">
                                        <Link to="#"><p>Termos de uso</p></Link>
                                        <Link to="#"><p>Política de privacidade</p></Link>
                                        <br />
                                        <p>© 2024, Right Solution, All Rights Reserved</p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </body>
                </>
        );
    }
}

export default Index;