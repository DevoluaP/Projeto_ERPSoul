import React from 'react';
import { Link } from 'react-router-dom';

export default function CadastrarContador({ isOpenCadastrarContador }) {
    if (isOpenCadastrarContador) {
        return(
            <>
                <h1>Cadastrar contador</h1>
                <div className="formulario">
                    <form action="" method="POST">
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="cnpj-contabilidade" name="cnpj-contabilidade" placeholder="CNPJ empresa contábil*" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="nm-contabilidade" name="nm-contabilidade" placeholder="Nome ou URL de empresa contábil*" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="tel-contabilidade" name="tel-contabilidade" placeholder="Telefone*" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="email-contabilidade" name="email-contabilidade" placeholder="E-mail*" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="nm-resposavel-contabilidade" name="nm-responsavel-contabilidade" placeholder="Nome do responsável da empresa" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="email-outros-contabilidade" name="email-outros-contabilidade" placeholder="Outros e-mails" required="required" />
                            </div>
                        </div>
                        <div className="botao-form">
                            <Link to="#">
                                <div class="botao">
                                    <p>Salvar</p>
                                </div>
                            </Link>
                        </div>
                        <div className="botao-form">
                            <Link to="#" onClick={ () => this.setCloseModal() }>
                                <div className="botao">
                                    <p>Voltar</p>
                                </div>
                            </Link>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    return null;
}