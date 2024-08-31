import React from "react";
import { Link } from "react-router-dom";

export default function PlanoContas({ isOpenPlanoContas }) {
    if (isOpenPlanoContas) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Plano de Contas</h1>
                    <form method="post" action="">
                        <h4>Preencha as informações obrigatórias para SCI</h4>
                                <select name="opcao-plano-contas" className="opcao-plano-contas">
                                    <option placeholder>Forma de geração da partidas contábeis</option>
                                    <option value="1">Categoria 1</option>
                                    <option value="2">Categoria 2</option>
                                    <option value="3">Categoria 3</option>
                                </select>
                        <div className="row">
                            <div className="box-plano-contas">
                                <input type="checkbox" name="favoritos-1" value="integrar" />
                                <label>Integrar também os rateios dos Lançamentos de Centros de Custos</label><br />
                                <input type="checkbox" name="favoritos-2" value="consolidar" />
                                <label>Consolidar o lançamento da conta corrente nas baixas de contas a pagar e receber</label><br />
                                <input type="checkbox" name="favoritos-3" value="enviar" />
                                <label>Enviar o CNPJ/CPF do Cliente ou Fornecedor no Lançamento Contábil</label><br />
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