import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Headers from '../Inc/Headers';
import Footers from '../Inc/Footers';
import carrinho from '../Assets/carrinho.png';
import ajuda from '../Assets/ajuda.png';

import '../Styles/style-geral.css';

class Estoque extends React.Component {
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
                        <div class="central">
                            <h1>ESTOQUE</h1>
                            <div className="container-modal">
                                <button className="modal-btn" onclick="abreModal(this)" id="btn-cadastrar-fornecedores" data-url="html-modal/cadastrar-contador.html" data-conteudo="cadastrar-fornecedores">CADASTRAR FORNECEDORES</button><br />
                                <button className="modal-btn" onclick="abreModal(this)" id="btn-cadastrar-reabastecimento" data-url="html-modal/plano-contas.html" data-conteudo="cadastrar-reabastecimento">CADASTRAR REABASTECIMENTO</button><br />
                                <button className="modal-btn" onclick="abreModal(this)" id="btn-importar-nfs" data-url="html-modal/integracoes.html" data-conteudo="importar-nfs">IMPORTAR NFS</button><br />
                                <button className="modal-btn" onclick="abreModal(this)" id="btn-relatorios-estoque" data-url="html-modal/relatorios-estoque.html" data-conteudo="relatorios-estoque">RELATÓRIOS</button><br />
                            </div>
                            <div className="modal-overlay">
                                <div className="modal-container">
                                    <div className="x">
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

export default Estoque;