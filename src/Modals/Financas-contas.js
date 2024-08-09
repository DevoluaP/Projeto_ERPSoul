import React from 'react';
import { Link } from 'react-router-dom';

export default function FinancasContas({ isOpen }) {
    if (isOpen) {
        return(
            <>
                <h1>Contas a receber</h1>
                <div className="formulario">
                    <form method="" action="">
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="fornecedor" name="fornecedor" placeholder="Fornecedor" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="venci-original" name="venci-original" placeholder="Vencimento original" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="venci" name="venci" placeholder="Vencimento" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="valor" name="valor" placeholder="Valor" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="n-docu" name="n-docu" placeholder="N documento" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="compe" name="compe" placeholder="Competência" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="form-pagamento" id="form-pagamento" required="required">
                                    <option>Selecione forma de pagamento</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="portador" id="portador">
                                    <option>Selecione portador</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
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
                                <select name="ocorrencia" id="ocorrencia">
                                    <option>Selecione ocorrência</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row textarea">
                            <label for="historico">Historico:</label>
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
                            <Link to="/financas">
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