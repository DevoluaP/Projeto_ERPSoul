import React from "react";
import { Link } from "react-router-dom";

export default function CadastrarCliente({ isOpenCadastrarCliente }) {
    if (isOpenCadastrarCliente) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Cadastrar Cliente</h1>
                    <form method="post" action="">
                        <div className="info">
                            <p>Informações pessoais</p>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="nome-cliente" name="nome-cliente" placeholder="Nome" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cpf-cnpj" name="cpf-cnpj" placeholder="CPF ou CNPJ" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="date" id="dt_nasc" name="dt_nasc" placeholder="Data de Nasc" required="required" />
                                </div>
                            </div>
                        </div>
                        <div className="info">
                            <p>Endereço</p>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="logradouro" name="logradouro" placeholder="Logradouro" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="number" id="num_log" name="num_log" placeholder="Número" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cep" name="cep" placeholder="CEP" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="bairro" name="bairro" placeholder="Bairro" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cidade" name="cidade" placeholder="Cidade" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="uf" name="uf" placeholder="UF" required="required" />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="tipo-cli">
                            <p>Tipo</p>
                            <div className="row">
                                <div className="col-12">
                                    <label for="parcelamento">Físico</label>
                                    <input className="radio" type="radio" id="tipo_cli" name="tipo_cli" value="1" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label for="parcelamento">Jurídico</label>
                                    <input className="radio" type="radio" id="tipo_cli" name="tipo_cli" value="2" />
                                </div>
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