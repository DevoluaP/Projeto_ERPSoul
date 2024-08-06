import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Index from '../Pages/Index';
import HomeGratuito from '../Pages/Home-gratuito';
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
            <Routes>
                <Route element={ <Index /> } path="/" exact />
                <Route element={ <HomeGratuito /> } path="/home-gratuito" />
                <Route element={ <HomeERP /> } path="/home-erp" />
                <Route element={ <Crm /> } path="/crm" />
                <Route element={ <Vendas /> } path="/vendas" />
                <Route element={ <Servicos /> } path="/servicos" />
                <Route element={ <FinancaContas /> } path="/financa-contas" />
                <Route element={ <Estoque /> } path="/estoque" />
                <Route element={ <Contabilidade /> } path="/contabilidade" />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;