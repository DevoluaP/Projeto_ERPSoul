import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Headers from '../Inc/Headers';
import Footers from '../Inc/Footers';
import carrinho from '../Assets/carrinho.png';
import ajuda from '../Assets/ajuda.png';

import '../Styles/style-geral.css';

class Crm extends React.Component {
    render() {
        return(
            <>
                <div id="page">
                    <Headers />

                    <main>
                        <div className="carrinho">
                            <p className="para1"><b>Comece a vender mais.</b></p>
                            <img src={ carrinho } alt="Carrinho" />
                            <p className="para2">Plataforma que te impulsiona.</p>
                        </div>
                        <br />
                        <br />
                        <hr />
                        <div className="central">
                            <h1>CRM</h1>
                            <div className="container-modal">
                                <button className="modal-btn" onclick="abreModal(this)" id="btnModal" data-url="html-modal/cadastrar-cliente.html" data-conteudo="cadastrar-cliente">CADASTRAR CLIENTE</button><br />
                                <button className="modal-btn" onclick="abreModal(this)" id="btnModal" data-url="html-modal/relatorio-clientes-cadastrados.html" data-conteudo="relatorio-clientes">CLIENTES CADASTRADOS</button><br />
                                <button className="modal-btn" onclick="abreModal(this)" id="btnModal" data-url="html-modal/gerar-relatorios-clientes.html" data-conteudo="gerar-relatorios-clientes">GERAR RELATÓRIO</button><br />
                            </div>
                            <div className="modal-overlay">
                                <div className="modal-container">
                                    <div className="botoes">
                                        <button className="close-btn" onclick="fecharModal()">
                                            <FontAwesomeIcon icon={ faXmark } />
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
            </>
        );
    }
}

export default Crm;