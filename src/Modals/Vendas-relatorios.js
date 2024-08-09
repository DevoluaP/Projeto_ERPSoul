import React from 'react';
import { Link } from 'react-router-dom';

export default function VendasRelatorios({ isOpen }) {
    if (isOpen) {
        return (
            <>
                <div className="formulario">
                    <h1>Relatórios</h1>
                    <br />
                    <div className="rel-clientes">
                        <table id="table-rel-clientes">
                            <tr>
                                <th>Vendas</th>
                                <th>Produtos</th>
                                <th>Pedidos</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>

                            </tr>
                            <tr>
                                <td>3</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <div className="botao-form">
                        <Link to="/vendas">
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