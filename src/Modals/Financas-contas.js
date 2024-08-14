import React from 'react';
import { Link } from 'react-router-dom';

export default function FinancasContas({ isOpenFinancasContas }) {
    if (isOpenFinancasContas) {
        return(
            <>
                <h1>Contas</h1>
                <div className="formulario">
                    <form action="" method="POST">
                            <p className="titulo-financas">Selecionar tipo de conta</p>
                            <div className="row">
                                <div className="col-6-financas" id="tipo-conta-financas">
                                    <label className="label-financas">A pagar</label>
                                    <input className="radio-financas" type="radio" id="tipo-contas-pagar" name="tipo-contas" value="1" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6-financas">
                                    <label className="label-financas">A receber</label>
                                    <input className="radio-financas" type="radio" id="tipo-contas-receber" name="tipo-contas" value="2" />
                                </div>
                            </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input type="text" id="fornecedor" name="fornecedor" placeholder="Fornecedor" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input type="text" id="venci-original" name="venci-original" placeholder="Vencimento original" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input type="text" id="venci" name="venci" placeholder="Vencimento" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input type="text" id="valor" name="valor" placeholder="Valor" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input type="text" id="n-docu" name="n-docu" placeholder="Nº documento" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <input type="text" id="compe" name="compe" placeholder="Competência" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <select name="form-pagamento" id="form-pagamento" required="required">
                                    <option>Selecione forma de pagamento</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <select name="portador" id="portador">
                                    <option>Selecione portador</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <select name="categoria" id="categoria">
                                    <option>Selecione categoria</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6-financas">
                                <select name="ocorrencia" id="ocorrencia">
                                    <option>Selecione ocorrência</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row-textarea">
                            <label for="historico">Histórico:</label>
                            <textarea id="historico" name="historico" rows="4" cols="50"></textarea>
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