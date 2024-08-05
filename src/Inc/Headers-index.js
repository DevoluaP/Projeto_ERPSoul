import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

import logo from '../Assets/logo.png';

class HeadersIndex extends React.Component {
    render() {
        return (
            <>
                <header>
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
                    <button className="modal-btn" onClick="" data-url="" data-conteudo="Teste-gratis">
                      TESTE GRÁTIS
                    </button>
                    <button className="modal-btn" onClick="" data-url="" data-conteudo="Login">
                        <FontAwesomeIcon icon={ faUser } /> ENTRE
                    </button>
                  </div>
                  <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="botoes">
                            <button className="close-btn" onClick="">
                                <FontAwesomeIcon icon={ faXmark } />
                            </button>
                        </div>
                        <div id="modal-container"></div>
                    </div>
                  </div>
                </header> 
            </>
        );
    }
}

export default HeadersIndex;