import React from 'react';
import { Link } from 'react-router-dom';

export default function CadastrarFaturamento({ isOpenCadastrarFaturamento }) {
    if (isOpenCadastrarFaturamento) {
        return(
            <>
                <h1>Cadastrar Faturamento</h1>
                <div className="formulario">
                    <form action="" method="POST">
                        <div className="cliente">
                            <div className="row">
                                <div className="col-12">
                                    <input className="input-cliente" type="text" id="cliente" name="cliente" placeholder="Cliente*" required="required" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="servico" name="servico" placeholder="Serviço*" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="val_servico" name="val_servico" placeholder="Valor do Serviço*" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="number" min="1" max="10" id="qnt_parcelas" name="qnt_parcelas" placeholder="Nº de Parcelas*" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="forma_pgto" id="forma_pgto">
                                    <option>Selecione Forma</option>
                                    <option value="1">Forma 1</option>
                                    <option value="2">Forma 2</option>
                                    <option value="3">Forma 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="parcelamento">
                            <div className="row">
                                <label>Parcelado?</label>
                                <div className="col-12">
                                    <input className="radio" type="radio" id="parcelamento" name="parcelamento" value="1" />
                                    <label for="parcelamento">Sim</label>
                                </div>
                                <div className="col-12">
                                    <input className="radio" type="radio" id="parcelamento" name="parcelamento" value="2" />
                                    <label for="parcelamento">Não</label>
                                </div>
                            </div>
                            <div className="row">
                                <label>Data do Faturamento</label>
                                <div className="col-6">
                                    <input type="date" id="dt_faturamento" name="dt_faturamento" placeholder="Data Faturamento*" required="required" />
                                </div>
                            </div>
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