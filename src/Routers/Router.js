import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Index from '../Pages/Index';
import HomeGratuito from '../Pages/Home-gratuito';
import HomeERP from '../Pages/Home-erp';
import Crm from '../Pages/Crm';
import Vendas from '../Pages/Vendas';
import Servicos from '../Pages/Servicos';
import Financas from '../Pages/Financas';
import Estoque from '../Pages/Estoque';
import Contabilidade from '../Pages/Contabilidade';
import Pagamento from '../Pages/Pagamento';
import EsqueciSenha from '../Pages/Esqueci-senha';
import NovaSenha from '../Pages/Nova-senha';
import SenhaSucesso from '../Pages/Senha-sucesso';

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
                <Route element={ <Financas /> } path="/financas" />
                <Route element={ <Estoque /> } path="/estoque" />
                <Route element={ <Contabilidade /> } path="/contabilidade" />
                <Route element={ <Pagamento /> } path="/pagamento" />
                <Route element={ <EsqueciSenha /> } path="/esqueci-senha" />
                <Route element={ <NovaSenha /> } path="/nova-senha" />
                <Route element={ <SenhaSucesso /> } path="/senha-sucesso" />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;