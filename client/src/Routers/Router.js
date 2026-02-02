import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../Pages/Index.js";
import Home from "../Pages/Home.js";
import Crm from "../Pages/Crm.js";
import Vendas from "../Pages/Vendas.js";
import Servicos from "../Pages/Servicos.js";
import Estoque from "../Pages/Estoque.js";
import Contabilidade from "../Pages/Contabilidade.js";
import EsqueciSenha from "../Pages/Esqueci-senha.js";
import NovaSenha from "../Pages/Nova-senha.js";
import PrivateRoute from "./PrivateRoute.js";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Index />} path="/" exact />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/crm"
          element={
            <PrivateRoute>
              <Crm />
            </PrivateRoute>
          }
        />
        <Route
          path="/vendas"
          element={
            <PrivateRoute>
              <Vendas />
            </PrivateRoute>
          }
        />
        <Route
          path="/servicos"
          element={
            <PrivateRoute>
              <Servicos />
            </PrivateRoute>
          }
        />
        <Route
          path="/estoque"
          element={
            <PrivateRoute>
              <Estoque />
            </PrivateRoute>
          }
        />
        <Route
          path="/contabilidade"
          element={
            <PrivateRoute>
              <Contabilidade />
            </PrivateRoute>
          }
        />
        <Route element={<EsqueciSenha />} path="/esqueci-senha" />
        <Route element={<NovaSenha />} path="/nova-senha" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
