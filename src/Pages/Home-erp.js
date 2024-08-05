import React from 'react';
import { Link } from 'react-router-dom';

import Headers from '../Inc/Headers';
import Footers from '../Inc/Footers';
import crm from '../Assets/crm.png';
import vendas from '../Assets/vendas.png';
import servicos from '../Assets/servicos.png';
import financas from '../Assets/financas.png';
import estoque from '../Assets/estoque.png';
import contab from '../Assets/contab.png';
import ajuda from '../Assets/ajuda.png';

import '../Styles/style-erp.css';

class HomeERP extends React.Component {
    render() {
        return(
            <>
                <div id="page">
                    <Headers />

                    <main>
                        <div className="pai">
                            <div className="boxes">
                                <div className="box">
                                    <Link to="/crm">
                                        <img src={ crm } alt="CRM" />
                                        <p>CRM</p>
                                    </Link>
                                </div>
                                <div className="box">
                                    <Link to="/vendas">
                                        <img src={ vendas } alt="VENDAS E NF's" />
                                        <p>VENDAS E NF's</p>
                                    </Link>
                                </div>
                                <div className="box">
                                    <Link to="/servicos">
                                        <img src={ servicos } alt="SERVIÇOS" />
                                        <p>SERVIÇOS</p>
                                    </Link>
                                </div>
                                <div className="box">
                                    <Link to="/financa-contas">
                                        <img src={ financas } alt="FINANÇAS" />
                                        <p>FINANÇAS</p>
                                    </Link>
                                </div>
                                <div className="box">
                                    <Link to="/estoque">
                                        <img src={ estoque } alt="ESTOQUE" />
                                        <p>ESTOQUE</p>
                                    </Link>
                                </div>
                                <div className="box">
                                    <Link to="/contabilidade">
                                        <img src={ contab } alt="CONTABILIDADE" />
                                        <p>CONTABILIDADE</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <hr />
                        <div className="ajuda">
                            <p className="para1">
                                Precisa de ajuda?<br />
                                <b><Link to="#">Clique aqui.</Link></b>
                            </p>
                            <img src={ ajuda } alt="Ajuda" />
                            <p className="para2">A Soul está aqui <br />para te ajudar.</p>
                        </div>
                    </main>
                    
                    <Footers />
                </div>
            </>
        );
    }
}

export default HomeERP;