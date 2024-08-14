import React from 'react';
import { Link } from 'react-router-dom';

export default function BaixarContas({ isOpenBaixarContas }) {
    if (isOpenBaixarContas) {
        return(
            <>
                <div className="formulario">
                    <form>
                        <h1>Baixar contas</h1>
                        <div className="baixar-conta">
                            <div className="row">
                                <div className="col-6-baixar-contas">
                                    <label>Tipo de conta</label>
                                    <select name="tipo_conta" id="tipo_conta">
                                        <option>Selecione</option>
                                        <option value="1">Pagar</option>
                                        <option value="2">Receber</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="botao-form">
                            <Link to="#">
                                <div className="botao">
                                    <p>Baixar</p>
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