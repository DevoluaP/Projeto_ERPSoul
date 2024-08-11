import React from 'react';
import { Link } from 'react-router-dom';

export default function RelatoriosEstoque({ isOpenRelatoriosEstoque }) {
    if (isOpenRelatoriosEstoque) {
        return(
            <>
                <h1>Relatórios</h1>
                <div className="formulario">
                    <form action="" method="POST">
                        <div className="row">
                            <div className="col-6">
                                <select name="periodo-estoque" id="periodo-estoque">
                                    <option>Período</option>
                                    <option value="1">Mensal</option>
                                    <option value="2">Semestral</option>
                                    <option value="3">Anual</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="mes-estoque" id="mes-estoque">
                                    <option>Mês</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="fil-cliente" name="fil-cliente"placeholder="Filtrar por cliente" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="fil-produto" name="fil-produto" placeholder="Filtrar por produto" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text" id="fil-cpf-cnpj" name="fil-cpf-cnpj" placeholder="Filtrar por CPF ou CNPJ" required="required" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <select name="agrupar-estoque" id="agrupar-estoque">
                                    <option>Agrupar por</option>
                                    <option value="1">Mais recentes</option>
                                    <option value="2">Menos recentes</option>
                                </select>
                            </div>
                        </div>
                        <div className="botao-form">
                            <Link to="#">
                                <div className="botao">
                                    <p>Visualizar</p>
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