import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

import Headers from '../Inc/Headers';
import Footers from '../Inc/Footers';
import carrinho from '../Assets/carrinho.png';
import logoPequeno from '../Assets/logo-pequeno.png';
import rodape from '../Assets/rodape.png';

import '../Styles/style-home-gratuito.css';

class HomeGratuito extends React.Component {
    render() {
        return(
            <>
                <div className="pageGratuito" id="page">
                    <Headers />

                    <main className="mainGratuito">
                        <div className="container">
                                <div className="carrinho">
                                    <p className="para1"><b>Comece a vender mais.</b></p>
                                    <img src={ carrinho } alt="Carrinho" />
                                    <p className="para2">Plataforma que te impulsiona.</p>
                                </div> 
                            <hr />
                            <div id="alterar-usuario">
                                <div>
                                    <Link className="icon" to="#" ><FontAwesomeIcon icon={ faCircleUser } /></Link>
                                    <p className="email-usuario"><b>Fulano@gmail.com</b></p>
                                    <p className="plano-usuario">Plano Gratuito</p>
                                    <button className="alterar-dados" href="#">Alterar</button>
                                </div>
                            </div>
                            <div id="resumo-rapido">
                            <p><b>Resumo Rápido</b></p>
                                <div id="resumo">
                                <p>Vendas Resumo</p>
                                    <div className="dados-vendas"></div>
                                </div>
                                <div id="resumo">
                                    <p>Estoque</p>
                                    <div className="dados-estoque"></div>
                                </div>
                                <div id="resumo">
                                    <p>Vencimento</p>
                                    <div className="dados-vencimento"></div>
                                </div>
                            </div>
                            <div id ="busca-rapida">
                                <p><b>Busca Rápida</b></p>
                                <ul className="lista-menu-rapido">
                                    <li className="menu-rapido"><Link to="#">NOTA FISCAL</Link></li>
                                    <li className="menu-rapido"><Link to="#">LUCROS E AFINS</Link></li>
                                    <li className="menu-rapido"><Link to="#">PEDIDOS E VENDAS</Link></li>
                                    <li className="menu-rapido"><Link to="#">COBRANÇAS DE FORNECEMENTOS</Link></li>
                                    <li className="menu-rapido"><Link to="#">PRODUTOS</Link></li>
                                    <li className="menu-rapido"><Link to="#">CONFERENCIA DE ESTOQUE</Link></li>
                                    <li className="menu-rapido"><Link to="#">FORNECEDORES</Link></li>
                                    <li className="menu-rapido"><Link to="#">ORDEM DE SERVIÇOS DE FORNECEDORES</Link></li>
                                </ul>
                            </div>
                            <div id="acessar-erp">
                                <div id="acesso-gratuito">
                                    <p className="demonstracao"><b>Demonstração</b></p>
                                    <p className="restante-gratuito">x dias restante <br />Soul</p>
                                </div>
                                <div id="acesso-gratuito-cor">    
                                    <div  id="logo-acesso"><img src={ logoPequeno } title="ERP - SOUL" alt="Logotipo" /></div>
                                    <p><b>Fulano de tal</b></p>
                                    <button className="assinar-erp" href="#">Assinar</button>
                                    <button className="acessar-erp" href="#">Acessar</button>
                                </div>
                            </div>
                            <div id="resumo-vendas">
                                <p><b>Resumo de vendas</b></p>
                                <div className="resumo-cor">
                                    <p className="mes-anterior">Mês anterior</p>
                                    <p className="valor-anterior">R$ xxxx,xx</p>
                                    <p className="porcentual-anterior">X%<FontAwesomeIcon icon={ faArrowUp } /></p>
                                    <div className="linha-horizontal"></div>
                                    <p className="mes-atual">Mês atual</p>
                                    <p className="valor-atual">R$ xxxx,xx</p>
                                    <p className="porcentual-atual">X%<FontAwesomeIcon icon={ faArrowUp } /></p>
                                </div>
                            </div>
                            <hr />
                            <div className="ajuda">
                                <p className="para1">
                                    Precisa de ajuda?
                                    <b><Link to="#">Clique aqui.</Link></b>
                                </p>
                                <img src={ rodape } alt="Rodapé" />
                                <p className="para2">A Soul está aqui para te ajudar.</p>
                            </div>
                        </div>
                    </main>

                    <Footers />
                </div>
            </>
        );
    }
}

export default HomeGratuito;