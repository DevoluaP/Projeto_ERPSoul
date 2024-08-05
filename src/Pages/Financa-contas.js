import React from 'react';
import { Link } from 'react-router-dom';

import Headers from '../Inc/Headers';
import Footers from '../Inc/Footers';
import carrinho from '../Assets/carrinho.png';
import ajuda from '../Assets/ajuda.png';

import '../Styles/style-financas-contas.css';

class FinancaContas extends React.Component {
    render() {
        return(
            <>
                <Headers />

                <main className="interna">
                    <div className="container">
                        <div className="carrinho">
                            <p className="para1"><b>Comece a vender mais.</b></p>
                            <img src={ carrinho } alt="Carrinho" />
                            <p className="para2">Plataforma que te impulsiona.</p>
                        </div>
                        <hr />
                        <div>
                            <h1>Contas a receber</h1>
                        </div>
                        <div className="formulario">
                            <form>
                                <div className="row">
                                    <div className="col-12">
                                        <input type="text" name="nome" placeholder="Fornecedor" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="text" name="nome" placeholder="Vencimento original" />
                                    </div>
                                    <div className="col-6">
                                        <input type="text" name="nome" placeholder="Vencimento" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="text" name="nome" placeholder="Valor" />
                                    </div>
                                    <div className="col-6">
                                        <input type="date" name="dt_emi" placeholder="Data de Emissão" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <input type="text" name="nome" placeholder="No do Documento" />
                                    </div>
                                    <div className="col-6">
                                        <input type="text" name="nome" placeholder="Competencia" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <textarea name="assunto" placeholder="Historico" style={{ marginTop: '1rem' }}></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label>Teste</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Selecione</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label>Teste</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Selecione</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label>Teste</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Selecione</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label>Teste</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Selecione</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="enviar">
                                    <input type="reset" value="Cancelar" class="reset" />
                                    <input type="submit" name="envio-form" value="salvar" class="submit" />
                                </div>
                            </form>
                        </div>
                        <hr />
                        <div className="ajuda">
                            <p className="para1">
                                Precisa de ajuda?
                                <br />
                                <b><Link to="#">Clique aqui.</Link></b>
                            </p>
                            <img src={ ajuda } alt="Ajuda" />
                            <p class="para2">A Soul está aqui <br />para te ajudar.</p>
                        </div>
                    </div>
                </main>

                <Footers />
            </>
        );
    }
}

export default FinancaContas;