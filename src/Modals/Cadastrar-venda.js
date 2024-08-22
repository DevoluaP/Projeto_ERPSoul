import React from 'react';
import { Link } from 'react-router-dom';

export default function CadastrarVenda({ isOpenCadastrarVenda }) {
    if (isOpenCadastrarVenda) {
        return (
            <>
                <h1>Cadastrar venda</h1>
                <div className="formulario">
                    <form action="" method="POST">
                        <div className="info">
                            <p>Dados do cliente</p>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cliente" name="cliente" placeholder="Nome do cliente" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="documento" name="documento" placeholder="CPF/CNPJ" />
                                </div>
                            </div>
                            <button className="modal-btn">Buscar</button>
                            <div className="lista">
                                <ul>
                                    <Link to="#" style={{ color: 'black' }}>
                                        <li>Alexandra Andrade</li>
                                    </Link>
                                    <Link to="#" style={{ color: 'black' }}>
                                        <li>Karen Rodrigues</li>
                                    </Link>
                                    <Link to="#" style={{ color: 'black' }}>
                                        <li>Gabriel Andrade</li>
                                    </Link>
                                    <Link to="#" style={{ color: 'black' }}>
                                        <li>Levi Coelho</li>
                                    </Link>
                                    <Link to="#" style={{ color: 'black' }}>
                                        <li>Diego Rodrigues</li>
                                    </Link>
                                </ul>
                            </div>

                        </div>
                        <div className="info">
                            <p>Vendedor</p>
                            <div className="row">
                                <div className="col-3">
                                    <select name="loja" id="loja" required="required">
                                        <option>Selecione a loja</option>
                                        <option value="1">Loja 1</option>
                                        <option value="2">Loja 2</option>
                                        <option value="3">Loja 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <select name="unidade" id="unidade" required="required">
                                        <option>Selecione a Unidade</option>
                                        <option value="1">Uni 1</option>
                                        <option value="2">Uni 2</option>
                                        <option value="3">Uni 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <select name="vendedor" id="vendedor" required="required">
                                        <option>Selecione o Vendedor</option>
                                        <option value="1">Uni 1</option>
                                        <option value="2">Uni 2</option>
                                        <option value="3">Uni 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="info">
                            <p>Venda</p>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cod-produto" name="cod-produto" placeholder="Código do produto" />
                                </div>
                            </div>
                            <button className="modal-btn">Buscar</button>
                            <br />
                            <div className="lista2">
                                <ul>
                                    <Link to="#" style={{ color: 'black' }}>
                                        <li>TESTE 1</li>
                                    </Link>
                                    <Link to="#" style={{ color: 'black' }}>
                                        <li>TESTE 2</li>
                                    </Link>
                                </ul>
                            </div>
                            <br />
                            <button className="modal-btn" id="btn-cadastrar-vendas">Adicionar</button>
                        </div>
                        <div className="info">
                            <div className="row">
                                <div className="col-6">
                                    <label>Total da venda</label>
                                    <input type="text" id="total-venda" name="total-venda" placeholder="R$" />
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