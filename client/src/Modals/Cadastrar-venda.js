export default function CadastrarVenda({ isOpenCadastrarVenda, setCloseModal }) {
    if (isOpenCadastrarVenda) {
        document.body.classList.add("modal-open");

        return(
            <>
                <div className="formulario">
                    <h1>Cadastrar venda</h1>
                    <form method="post" action="">
                        <div className="info">
                            <p>Dados do cliente</p>
                            <div className="row">
                                <div className="col-6">
                                    <input
                                        type="text"
                                        id="cliente"
                                        name="cliente"
                                        placeholder="Nome do cliente"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input 
                                        type="text"
                                        id="documento"
                                        name="documento"
                                        placeholder="CPF/CNPJ"
                                    />
                                </div>
                            </div>
                            <button className="modal-btn">Buscar</button>
                        </div>
                        <div className="info">
                            <p>Vendedor</p>
                            <div className="row">
                                <div className="col-3">
                                    <select name="loja" id="loja" required>
                                        <option>Selecione a loja</option>
                                        <option value="1">Loja 1</option>
                                        <option value="2">Loja 2</option>
                                        <option value="3">Loja 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <select name="unidade" id="unidade" required>
                                        <option>Selecione a Unidade</option>
                                        <option value="1">Uni 1</option>
                                        <option value="2">Uni 2</option>
                                        <option value="3">Uni 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <select name="vendedor" id="vendedor" required>
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
                                    <input
                                        type="text"
                                        id="cod-produto"
                                        name="cod-produto"
                                        placeholder="Código do produto"
                                    />
                                </div>
                            </div>
                            <button className="modal-btn">Buscar</button>
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
                            <button type="submit" className="botao">
                                <p>Salvar</p>
                            </button>
                        </div>
                        <div className="botao-form">
                            <button type="button" className="botao" onClick={ setCloseModal }>
                                <p>Voltar</p>
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }

    return null;
}