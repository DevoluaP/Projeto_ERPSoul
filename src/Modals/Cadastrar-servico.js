import React from "react";
import { Link } from "react-router-dom";

export default function CadastrarServico({ isOpenCadastrarServico }) {
    if (isOpenCadastrarServico) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Cadastrar Serviço</h1>
                    <form method="post" action="">
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="servico" name="servico" placeholder="Serviço*" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="cod_servico" name="cod_servico" placeholder="Código Interno" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="cod_servico_municipal" name="cod_servico_municipal" placeholder="Código de Serviço Municipal*" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="cod_lc" name="cod_lc" placeholder="Código LC 116*" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="categoria" id="categoria">
                                    <option>Selecione categoria</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="val_servico" name="val_servico" placeholder="Valor do Serviço" required="required" />
                            </div>
                        </div>
                        <div className="row textarea">
                            <label for="descrição serviço">Descrição do serviço:</label>
                            <textarea id="desc_servico" name="desc_servico" rows="4" cols="50"></textarea>
                        </div>
                        <div className="botao-form">
                            <Link to="#">
                                <div className="botao">
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