import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Index from '../Pages/Index.js';
import HomeGratuito from '../Pages/Home-gratuito.js';
import HomeERP from '../Pages/Home-erp.js';
import Crm from '../Pages/Crm.js';
import Vendas from '../Pages/Vendas.js';
import Servicos from '../Pages/Servicos.js';
import Financas from '../Pages/Financas.js';
import Estoque from '../Pages/Estoque.js';
import Contabilidade from '../Pages/Contabilidade.js';
import Pagamento from '../Pages/Pagamento.js';
import EsqueciSenha from '../Pages/Esqueci-senha.js';
import NovaSenha from '../Pages/Nova-senha.js';
import SenhaSucesso from '../Pages/Senha-sucesso.js';

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