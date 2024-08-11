import React from 'react';

import Headers from '../Inc/Headers.js';
import Footers from '../Inc/Footers.js';
import SenhaSucesso from '../Pages/Senha-sucesso.js';

import '../Styles/Geral.css';

class NovaSenha extends React.Component {
    render() {
        return(
            <>
                <body className="bodyGeral">
                    <div className="pageGeral" id="page">
                        <Headers />

                        <main className="interna">
                            <div className="central">
                                <h1>Esqueceu sua senha?</h1>
                                <p className="paragrafoCentro">Não tem problema. <br />Basta inserir uma nova :)</p>
                                <div className="box-senha">
                                    <div className="formulario">
                                        <form action={ SenhaSucesso } method="POST">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className="labelSenha">Digite sua nova senha:</label>
                                                    <input type="password" name="password" id="password" placeholder="Nova Senha" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <input type="password" name="password" id="password" placeholder="Repita Nova Senha" />
                                                </div>
                                            </div>
                                            <div className="btn">
                                                <button className="btn-login" type="submit" id="loginBtn" data-url="" data-conteudo="login">
                                                    ENVIAR
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <br />
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

export default NovaSenha;