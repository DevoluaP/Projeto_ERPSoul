import React from 'react';
import { Link } from 'react-router-dom';

import HomeGratuito from '../Pages/Home-gratuito.js';

export default function Login({ isOpenLogin }) {
    if (isOpenLogin) {
        return(
            <>
                <h2>Entrar</h2>
                <p>Bem vindo de volta<br /> É um prazer tê-lo aqui.</p>
                <div className="box-login">
                    <div className="formulario">
                        <form action={ HomeGratuito } method="POST">
                            <div className="row">
                                <div className="col-12">
                                    <input type="text" id="email" name="email" placeholder="E-mail" />
                                </div>
                                <div className="col-12">
                                    <input type="password" id="senha" name="senha" placeholder="Senha" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input className="check-box" type="checkbox" id="conectado" name="conectado" value="1" />
                                    <label for="conectado"> Mantenha-me conectado</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input className="check-box" type="checkbox" id="conectado" name="conectado" value="1" />
                                    <label for="conectado"> Lembre-se de mim</label>
                                </div>
                            </div>
                            <button className="btn-login" id="loginBtn">
                                ENTRAR
                            </button>
                        </form>
                        <p>
                            Esqueceu sua senha?
                            <Link to="/esqueci-senha"><b>Clique aqui</b></Link>
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return null;
}