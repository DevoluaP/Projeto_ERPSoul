import React from 'react';
import { Link } from 'react-router-dom';

import Headers from '../Inc/Headers.js';
import Footers from '../Inc/Footers.js';
import VendasGerarNotas from '../Modals/Vendas-gerar-notas.js';
import VendasRelatorios from '../Modals/Vendas-relatorios.js';
import VendasCadastrarProduto from '../Modals/Vendas-cadastrar-produto.js';
import VendasCadastrarVendas from '../Modals/Vendas-cadastrar-vendas.js';
import carrinho from '../Assets/carrinho.png';
import ajuda from '../Assets/ajuda.png';

import '../Styles/Geral.css';

class Vendas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false };
        this.state = { openModal2: false };
        this.state = { openModal3: false };
        this.state = { openModal4: false };
    }
    
    setOpenModal = (isOpenVendasGerarNotas) => {
        this.setState({ openModal: isOpenVendasGerarNotas });
    }

    setOpenModal2 = (isOpenVendasRelatorios) => {
        this.setState({ openModal2: isOpenVendasRelatorios });
    }

    setOpenModal3 = (isOpenVendasCadastrarProduto) => {
        this.setState({ openModal3: isOpenVendasCadastrarProduto });
    }

    setOpenModal4 = (isOpenVendasCadastrarVendas) => {
        this.setState({ openModal4: isOpenVendasCadastrarVendas });
    }
    
    setCloseModal = () => {
        this.setState({ openModal: false });
        this.setState({ openModal2: false });
        this.setState({ openModal3: false });
        this.setState({ openModal4: false });
    }

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
                                <h1>VENDAS</h1>
                                <div className="container-modal">
                                    <button className="modal-btn" onClick={ () => this.setOpenModal(true) } id="btnModal">GERAR NF</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal2(true) } id="btnModal">RELATÓRIOS</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal3(true) } id="btnModal">CADASTRAR PRODUTOS</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal4(true) } id="btnModal">CADASTRAR PEDIDO</button>
                                </div>

                                {this.state.openModal && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <VendasGerarNotas isOpenVendasGerarNotas={ this.state.openModal } />
                                            <div className="botoes">
                                                <button className="close-btn" onClick={ () => this.setCloseModal() }>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.openModal2 && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <VendasRelatorios isOpenVendasRelatorios={ this.state.openModal2 } />
                                            <div className="botoes">
                                                <button className="close-btn" onClick={ () => this.setCloseModal() }>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.openModal3 && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <VendasCadastrarProduto isOpenVendasCadastrarProduto={ this.state.openModal3 } />
                                            <div className="botoes">
                                                <button className="close-btn" onClick={ () => this.setCloseModal() }>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.openModal4 && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <VendasCadastrarVendas isOpenVendasCadastrarVendas={ this.state.openModal4 } />
                                            <div className="botoes">
                                                <button className="close-btn" onClick={ () => this.setCloseModal() }>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <hr />
                                <div className="ajuda">
                                    <p className="para1">
                                        Precisa de ajuda?
                                        <b><Link to="#">Clique aqui.</Link></b>
                                    </p>
                                    <img src={ ajuda } alt="Ajuda" />
                                    <p className="para2">A Soul está aqui para te ajudar.</p>
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

export default Vendas;