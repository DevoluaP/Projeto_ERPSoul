import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBook, faPhone, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faGem } from '@fortawesome/free-regular-svg-icons';

import HeadersIndex from '../Inc/Headers-index';
import FootersIndex from '../Inc/Footers-index';
import imgBox1 from '../Assets/img-box1.png';
import imgBox2 from '../Assets/img-box2.png';
import imgBox3 from '../Assets/img-box3.png';
import caixa1 from '../Assets/caixa1.png';
import caixa2 from '../Assets/caixa2.png';
import caixa3 from '../Assets/caixa3.png';
import caixa4 from '../Assets/caixa4.png';
import caixa5 from '../Assets/caixa5.png';
import caixa6 from '../Assets/caixa6.png';
import caixa7 from '../Assets/caixa7.png';
import caixa8 from '../Assets/caixa8.png';

import '../Styles/style-index.css';

class Index extends React.Component {
    render() {
        return(
                <>
                    <div id="page">
                        <HeadersIndex />

                        <main>
                            <div className="box1">
                                <div className="text-box1">
                                    <p>A <b style={{ color: '#00968F', fontSize: '35px' }}>Soul</b> é um sistema de gestão <br />
                                        100% <b style={{ color: '#00968F', fontSize: '35px' }}>on-line</b><br />
                                        que <b style={{ color: '#00968F', fontSize: '35px' }}>descomplica</b> seu e-commerce.
                                    </p>

                                </div>
                                <div className="img-box1">
                                    <img src={ imgBox1 } alt="" />
                                </div>

                            </div>
                            <div className="box2">
                                <div className="img-box2">
                                    <img src={ imgBox2 } alt="" />
                                </div>
                                <div className="text-box2">
                                    <p><b style={{ color: '#00FFF4', fontSize: '35px' }}>Integração</b> com plataformas de <br />e-commerce e marketplaces de forma <br /><b style={{ color: '#00FFF4', fontSize: '35px' }}>fácil</b> e <b style={{ color: '#00FFF4', fontSize: '35px' }}>rápida</b>
                                    </p>
                                </div>
                            </div>
            
                            <div className="box3">
                                <div className="text-box3">
                                    <p>Gestão de Estoque como você nunca viu!<br />
                                        <b style={{ color: '#050538', fontSize: '35px' }}>Cadastro</b> de seus fornecedores, <br />emissão dos <b style={{ color: '#050538', fontSize: '35px' }}>relatórios</b> de estoque, <br /> <b style={{ color: '#050538', fontSize: '35px' }}>controle</b> de suas compras e muito, muito mais!
                                    </p>
                                </div>
                                <div className="img-box3">
                                    <img src={ imgBox3 } alt="" />
                                </div>
                            </div>

                            <div className="box4" id="funcionalidades">
                                <p>Conheça tudo que a <b style={{ color: '#00968F', fontSize: '35px' }}>Soul</b> faz por você</p>
                                <div className="caixas">
                                    <div className="caixa">
                                        <img src={ caixa1 } alt="" />
                                        <p>Gestão de Negócios centralizada para organização de processos operacionais.</p>
                                    </div>

                                    <div className="caixa">
                                        <img src={ caixa2 } alt="" />
                                        <p>Planejamento de fundo de caixa e análises financeiras completas</p>
                                    </div>
                                    <div className="caixa">
                                        <img src={ caixa3 } alt="" />
                                        <p>Monitoramento de vendas e metas</p>
                                    </div>
                                    <div className="caixa">
                                        <img src={ caixa4 } alt="" />
                                        <p>Visualização do histórico de vendas, clientes e produtos</p>
                                    </div>
                                    <div className="caixa">
                                        <img src={ caixa5 } alt="" />
                                        <p>100% online, segura e descomplica</p>
                                    </div>
                                    <div className="caixa">
                                        <img src={ caixa6 } alt="" />
                                        <p>Automatização de compras e vendas, mantendo o giro de estoque atualizado</p>
                                    </div>
                                    <div className="caixa">
                                        <img src={ caixa7 } alt="" />
                                        <p>Avaliação de relevância de cada produto com relatórios baseados em lucro/prejuízo, compras/vendas.</p>
                                    </div>
                                    <div className="caixa">
                                        <img src={ caixa8 } alt="" />
                                        <p>Facilidade na visão das negociações</p>
                                    </div>
                                </div>
                            </div>
                            <div className="box5" id="planosPrecos">
                                <p>Planos e Preços</p>
                                <div className="plano">
                                    <h2><FontAwesomeIcon icon={ faGem } /> Plano Diamante - Anual</h2>
                                    <p>10% OFF</p>
                                    <br />
                                    <div className="lista">
                                        <ul>
                                            <li><FontAwesomeIcon icon={ faCheck } /> R$ xxx,xxx</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> VENDAS</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> ESTOQUE</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> NOTA FISCAL</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> SERVIÇOS</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> SUPORTE</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> COBRANÇAS</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> FORNEDORES</li>
                                        </ul>

                                        <button className="btn-login" onclick="" id="loginBtn" data-url="" data-conteudo="login">
                                            TESTE GRÁTIS
                                        </button>
                                    </div>

                                </div>
                                <div className="plano">
                                    <h2><FontAwesomeIcon icon={ faGem } /> Plano Diamante - Mensal</h2>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <div className="lista">
                                        <ul>
                                            <li><FontAwesomeIcon icon={ faCheck } /> R$ xxx,xxx</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> VENDAS</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> ESTOQUE</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> NOTA FISCAL</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> SERVIÇOS</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> SUPORTE</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> COBRANÇAS</li>
                                            <li><FontAwesomeIcon icon={ faCheck } /> FORNEDORES</li>
                                        </ul>

                                        <button className="btn-login" onclick="" id="loginBtn" data-url="" data-conteudo="login">
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
                                        <p><FontAwesomeIcon icon={ faBook } /> <b>Central de ajuda</b></p>
                                        <button className="btn-login" onclick="" id="loginBtn" data-url="" data-conteudo="login">
                                            CONSULTAR MANUAIS
                                        </button>
                                    </div>
                                    <div className="central-suporte">
                                        <img src="" alt="" />
                                        <p><FontAwesomeIcon icon={ faPhone } /> <b>Suporte</b></p>
                                        <p>+55 11 99999-9999</p>
                                        <p style={{fontSize: '12px' }}>Horário de atendimento: das 8h às 20h</p>
                                        <button className="btn-login" onclick="" id="loginBtn" data-url="" data-conteudo="login">
                                            CONSULTAR MANUAIS
                                        </button>
                                    </div>
                                </div>
                                <div className="contato">

                                    <div className="central-suporte">
                                        <p className="titulo"><b>Ainda não é nosso cliente?</b></p>
                                        <p style={{fontSize: '12px' }}>Fale com nossa equipe comercial.</p>
                                        <br />
                                        <br />
                                        <p><FontAwesomeIcon icon={ faEnvelopeOpenText } /> <b>E-mail</b></p>
                                        <p>soul-erp@soul.com.br</p>
                                    </div>
                                    <div class="central-suporte">
                                        <img src="" alt="" />
                                        <p><FontAwesomeIcon icon={ faPhone } /> <b>Telefone</b></p><br />
                                        <p>+55 11 88888-8888</p>
                                        <p style={{fontSize: '12px' }}>Horário de atendimento: das 8h às 17h</p>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <FootersIndex />
                    </div>
                </>
        );
    }
}

export default Index;