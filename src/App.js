import React from 'react';
import Router from './Routers/Router';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Index from './Pages/Index';
// import HomeERP from './Pages/Home-erp';
// import Crm from './Pages/Crm';
// import Vendas from './Pages/Vendas';
// import Servicos from './Pages/Servicos';
// import FinancaContas from './Pages/Financa-contas';
// import Estoque from './Pages/Estoque';
// import Contabilidade from './Pages/Contabilidade';
// import Login from './Modals/Login';
// import TesteGratis from './Modals/Teste-gratis';

// class App extends React.Component {
//   render() {
//     return(
//       <Router>

//         <Routes>
//           <Route path="/index" element={ <Index /> } />
//           <Route path="/home-erp" element={ <HomeERP /> } />
//           <Route path="/crm" element={ <Crm /> } />
//           <Route path="/vendas" element={ <Vendas /> } />
//           <Route path="/servicos" element={ <Servicos /> } />
//           <Route path="/financa-contas" element={ <FinancaContas /> } />
//           <Route path="/estoque" element={ <Estoque /> } />
//           <Route path="/contabilidade" element={ <Contabilidade /> } />
//           <Route path="/login" element= { <Login /> } />
//           <Route path="/teste-gratis" element= { <TesteGratis /> } />
//         </Routes>

//       </Router>
//     );
//   }
// }

// export default App;

export default function App() {
  return(
    <Router />
  );
}