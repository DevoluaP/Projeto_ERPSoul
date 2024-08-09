import React from 'react';

export default function TesteGratis({ isOpen }) {
    if (isOpen) {
        return(
            <>
                <h2>Teste por 30 dias grátis!</h2>
                <div className="box-teste">
                    <div className="formulario">
                        <form method="" action="">
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="nome" name="nome" placeholder="Nome*" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="email" id="email" name="email" placeholder="E-mail*" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="whatsapp" name="whatsapp" placeholder="Nº WhatsApp (com DDD)*" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="nome_empresa" name="nome_empresa" placeholder="Nome da Empresa*" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cpf_cnpj" name="cpf_cnpj" placeholder="CPF/CNPJ*" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="email_contador" name="email_contador" placeholder="E-mail Contador" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="cargo" name="cargo" placeholder="Cargo*" required="required" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input type="text" id="faturamento" name="faturamento" placeholder="Faturamento" required="required" />
                                </div>
                            </div>
                            <div className="row termos">
                                <div className="col-12">
                                    <input className="check-box" type="checkbox" id="termos_priv" name="termos_priv" value="1" />
                                    <label for="termos_priv"> Li e Aceitos os Termos de Privacidade</label>
                                </div>
                            </div>
                            <button className="btn-login" onclick="" id="loginBtn" data-url="" data-conteudo="Login">
                                ENTRAR
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    return null;
}