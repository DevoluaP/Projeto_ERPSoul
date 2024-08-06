import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

import logo from '../Assets/logo.png';
import TesteGratis from '../Modals/Teste-gratis.js';
import Login from '../Modals/Login.js';

class HeadersIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false };
    }
    
    setOpenModal = (isOpen) => {
        this.setState({ openModal: isOpen });
    }

    render() {
        return (
            <>
                <header className="headerIndex">
                  <div className="logo">
                    <Link to="/home-erp">
                        <img src={ logo } alt="logotipo" />
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
                  <div className="container-modal">
                    <button className="modal-btn" onClick={ () => this.setOpenModal(true) }>
                        <TesteGratis isOpen={ this.state.openModal } /> TESTE GRÁTIS
                    </button>
                    <button className="modal-btn" onClick={ () => this.setOpenModal(true) }>
                        <Login isOpen={ this.state.openModal } />
                        <FontAwesomeIcon icon={ faUser } /> ENTRE
                    </button>
                  </div>
                </header> 

                {this.state.openModal && (
                <div className="modal-overlay">
                  <div className="modal-container">
                      <div className="botoes">
                          <button className="close-btn" onClick={ () => this.setOpenModal(false) }>
                              <FontAwesomeIcon icon={ faXmark } />
                          </button>
                      </div>
                      <div id="modal-container"></div>
                  </div>
                </div>
                )}
            </>
        );
    }
}

export default HeadersIndex;