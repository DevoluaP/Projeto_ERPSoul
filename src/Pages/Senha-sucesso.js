import React from 'react';
import { Link } from 'react-router-dom';

import Headers from '../Inc/Headers.js';
import Footers from '../Inc/Footers.js';

import '../Styles/Geral.css';

class SenhaSucesso extends React.Component {
    render() {
        return(
            <>
                <body className="bodyGeral">
                    <div className="pageGeral" id="page">
                        <Headers />

                        <main className="interna">
                            <div className="central">
                                <div className="senha-sucesso">
                                    <i className="fa-regular fa-circle-check"></i>
                                    <div className="bloco-sucesso">
                                        <h1>Senha Alterada com Sucesso!</h1><br />
                                    </div>
                                    <div className="btn-sucesso">
                                        <Link to="/" className="inicio-btn">INÍCIO</Link>
                                    </div>
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

export default SenhaSucesso;