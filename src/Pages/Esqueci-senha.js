import React from 'react';

import Headers from '../Inc/Headers';
import Footers from '../Inc/Footers.js';

import '../Styles/Geral.css';

class EsqueciSenha extends React.Component {
    render() {
        return(
            <>
                <body className="bodyGeral">
                    <div className="pageGeral" id="page">
                        <Headers />

                        <main className="interna">
                            <div className="central">
                                <h1>Precisa recuperar sua senha?</h1>
                                <p className="paragrafoCentro">Primeiro, utilize o e-mail cadastrado para validarmos o seu registro.</p>
                                <div className="box-senha">
                                    <div className="formulario">
                                        <form method="" action="">{/* onsubmit="javascript: return recSenha()" */}
                                            <div className="row">
                                                <div className="col-12">
                                                    <input type="email" name="email" id="email" placeholder="E-mail" />
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
                                    <p className="paragrafoCentro">Você receberá um link para recuperar a senha. <br /> <b>Fique atento!</b></p>
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

export default EsqueciSenha;