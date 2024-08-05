import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Index from '../Pages/Index';
import HomeERP from '../Pages/Home-erp';
import Crm from '../Pages/Crm';
import Vendas from '../Pages/Vendas';
import Servicos from '../Pages/Servicos';
import FinancaContas from '../Pages/Financa-contas';
import Estoque from '../Pages/Estoque';
import Contabilidade from '../Pages/Contabilidade';
import Login from '../Modals/Login';
import TesteGratis from '../Modals/Teste-gratis';

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Index /> } path="/index" />
                <Route element={ <HomeERP /> } path="/home-erp" />
                <Route element={ <Crm /> } path="/crm" />
                <Route element={ <Vendas /> } path="/vendas" />
                <Route element={ <Servicos /> } path="/servicos" />
                <Route element={ <FinancaContas /> } path="/financa-contas" />
                <Route element={ <Estoque /> } path="/estoque" />
                <Route element={ <Contabilidade /> } path="/contabilidade" />
                <Route element={ <Login /> } path="/login" />
                <Route element={ <TesteGratis /> } path="/teste-gratis" />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;