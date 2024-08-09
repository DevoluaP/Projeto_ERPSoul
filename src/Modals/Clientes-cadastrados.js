import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientesCadastrados({ isOpen }) {
    if (isOpen) {
        return(
            <>
                <div className="formulario">
                    <h1>CLIENTES CADASTRADOS</h1>
                    <br />
                    <div className="rel-clientes">
                        <table id="table-rel-clientes">
                            <tr>
                                <th>No Cliente</th>
                                <th>Nome</th>
                                <th>CPF/CNPJ</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Alfreds Futterkiste</td>
                                <td>123456789-11</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Maria Anders</td>
                                <td>321456987-22</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Germany</td>
                                <td>222123645/0001-30</td>
                            </tr>
                        </table>
                    </div>
                    <div className="botao-form">
                        <Link to="/crm">
                            <div className="botao">
                                <p>Voltar</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return null;
}