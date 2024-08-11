import React from 'react';
import { Link } from 'react-router-dom';

import Headers from '../Inc/Headers.js';
import Footers from '../Inc/Footers.js';
import BaixarContas from '../Modals/Baixar-contas.js';
import FinancasContasAReceber from '../Modals/Financas-contas-a-receber.js';
import FinancasContas from '../Modals/Financas-contas.js';
import carrinho from '../Assets/carrinho.png';
import ajuda from '../Assets/ajuda.png';

import '../Styles/Financas.css';

class Financas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false };
        this.state = { openModal2: false };
        this.state = { openModal3: false };
    }
    
    setOpenModal = (isOpenBaixarContas) => {
        this.setState({ openModal: isOpenBaixarContas });
    }

    setOpenModal2 = (isOpenFinancasContasAReceber) => {
        this.setState({ openModal2: isOpenFinancasContasAReceber });
    }

    setOpenModal3 = (isOpenFinancasContas) => {
        this.setState({ openModal3: isOpenFinancasContas });
    }

    setCloseModal = () => {
        this.setState({ openModal: false });
        this.setState({ openModal2: false });
        this.setState({ openModal3: false });
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
                                <h1>FINANÇAS</h1>
                                <div className="container-modal">
                                    <button className="modal-btn" onClick={ () => this.setOpenModal(true) } id="btnModal">BAIXAR CONTAS</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal2(true) } id="btnModal">CONTAS A RECEBER</button><br />
                                    <button className="modal-btn" onClick={ () => this.setOpenModal3(true) } id="btnModal">CONTAS A PAGAR</button><br />
                                </div>

                                {this.state.openModal && (
                                    <div className="modal-overlay">
                                        <div className="modal-container">
                                            <BaixarContas isOpenBaixarContas={ this.state.openModal } />
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
                                            <FinancasContasAReceber isOpenFinancasContasAReceber={ this.state.openModal2 } />
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
                                            <FinancasContas isOpenFinancasContas={ this.state.openModal3 } />
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

export default Financas;