import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomeERP from '../Pages/Home-erp';
import Crm from '../Pages/Crm';
import Vendas from '../Pages/Vendas';
import Servicos from '../Pages/Servicos';
import FinancaContas from '../Pages/Financa-contas';
import Estoque from '../Pages/Estoque';
import Contabilidade from '../Pages/Contabilidade';

const Router = () => {
    return(
        <BrowserRouter>

            <Route component={ HomeERP } path="/home-erp" />
            <Route component={ Crm } path="/crm" />
            <Route component={ Vendas } path="/vendas" />
            <Route component={ Servicos } path="/servicos" />
            <Route component={ FinancaContas } path="/financa-contas" />
            <Route component={ Estoque } path="/estoque" />
            <Route component={ Contabilidade } path="/contabilidade" />

        </BrowserRouter>
    );
}

export default Router;