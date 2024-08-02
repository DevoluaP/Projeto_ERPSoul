import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Headers from './Inc/Headers';
import Footers from './Inc/Footers';
import HomeERP from './Pages/Home-erp';
import Crm from './Pages/Crm';
import Vendas from './Pages/Vendas';
import Servicos from './Pages/Servicos';
import FinancaContas from './Pages/Financa-contas';
import Estoque from './Pages/Estoque';
import Contabilidade from './Pages/Contabilidade';

class App extends React.Component {
  render() {
    return(
      <Router>
        <Headers />

        <Routes>
          <Route path="/home-erp" element={ <HomeERP /> } />
          <Route path="/crm" element={ <Crm /> } />
          <Route path="/vendas" element={ <Vendas /> } />
          <Route path="/servicos" element={ <Servicos /> } />
          <Route path="/financa-contas" element={ <FinancaContas /> } />
          <Route path="/estoque" element={ <Estoque /> } />
          <Route path="/contabilidade" element={ <Contabilidade /> } />
        </Routes>

        <Footers />
      </Router>
    );
  }
}

export default App;