import React from 'react';
import { Link } from 'react-router-dom';

import Headers from '../Inc/Headers.js';
import Footers from '../Inc/Footers.js';
import carrinho from '../Assets/carrinho.png';
import ajuda from '../Assets/ajuda.png';

import '../Styles/Geral.css';

class Servicos extends React.Component {
    render() {
        return(
            <>
                <body className="bodyGeral">
                    <div className="pageGeral" id="page">
                        <Headers />
            
                        <main className="interna">
                            <div className="carrinho">
                                <p className="para1"><b>Comece a vender mais.</b></p>
                                <img src={ carrinho } alt="Carrinho" />
                                <p className="para2">Plataforma que te impulsiona.</p>
                            </div>
                            <br />
                            <br />
                            <hr />
                            <div className="central">
                                <h1>SERVIÇOS</h1>
                                <div className="container-modal">
                                    <button className="modal-btn" onclick="abreModal(this)" id="btnModal" data-url="html-modal/cadastrar-servico.html" data-conteudo="cadastrar-servico">CADASTRAR SERVIÇO</button><br />
                                    <button className="modal-btn" onclick="abreModal(this)" id="btnModal" data-url="html-modal/cadastrar-faturamento-servicos.html" data-conteudo="cadastrar-faturamento">CADASTRAR FATURAMENTO</button><br />
                                    <button className="modal-btn" onclick="abreModal(this)" id="btnModal" data-url="html-modal/gerar-relatorios-servicos.html" data-conteudo="gerar-rel-servicos">GERAR RELATÓRIOS</button>
                                </div>
                                <div className="modal-overlay">
                                    <div className="modal-container">
                                        <div className="botoes">
                                            <button className="close-btn" onclick="fecharModal()">
                                                <i class="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                        <div id="modal-container"></div>
                                    </div>
                                </div>
                                <hr />
                                <div className="ajuda">
                                    <p className="para1">
                                        Precisa de ajuda?<br />
                                        <b><Link to="#">Clique aqui.</Link></b>
                                    </p>
                                    <img src={ ajuda } alt="Ajuda" />
                                    <p className="para2">A Soul está aqui <br />para te ajudar.</p>
                                </div>
                            </div>
                        </main>
            
                        <Footers />
                    </div>
                </body>
            </>
        );
    }
}

export default Servicos;