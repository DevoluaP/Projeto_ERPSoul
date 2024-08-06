import React from 'react';
import { Link } from 'react-router-dom';

export default function Login({ isOpen }) {
    if (isOpen) {
        return(
            <>
                <h2>Entrar</h2>
                <p>Bem vindo de volta<br /> É um prazer tê-lo aqui.</p>
                <div className="box-login">
                    <div className="formulario">
                        <form action="" method="">
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
                            <button className="btn-login" onclick="" id="loginBtn" data-url="" data-conteudo="Login">
                                ENTRAR
                            </button>
                        </form>
                        <p>Esqueceu sua senha?   <Link to="#"><b>Clique aqui</b></Link></p>
                    </div>
                </div>
            </>
        );
    }

    return null;
}