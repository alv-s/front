import './App.css';

import { 
  Link, 
  Route, 
  Routes 
} from 'react-router-dom';

import Listagem from './Listagem';
import Cadastro from './Cadastro';
import Edicao from './Edicao';

function App() {

  return (
    <Routes>

      {/* Inicia a página na listagem */}
      <Route index element={<ListagemPessoa />} />
      
      {/* Path cadastro */}
      <Route path="cadastro" element={<Cadastro />} />
      
      {/* Path edição */}
      <Route path="edit/:id" element={<Edicao />} />
      
      {/* Path erro */}
      <Route path="*" element={<p>ERROR 404!</p>} />

  </Routes>

  );
}

// Listagem de pessoas
const ListagemPessoa = () => {
  return (
    <div className="menu">
      
      {/* Chama o componente Listagem */}
      <Listagem />

      {/* Botão cadastro */}
      <ul className="menu">
        <li> <Link to="/cadastro">Cadastrar Pessoa</Link> </li> 
      </ul>

    </div>
  );
};

export default App;
