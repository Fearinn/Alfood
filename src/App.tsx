import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/Admin/PaginaBase';
import AdminPratos from './paginas/Admin/Pratos/AdminPratos';
import AdminRestaurantes from './paginas/Admin/Restaurantes/AdminRestaurante';
import FormularioRestaurante from './paginas/Admin/Restaurantes/FormularioRestaurante';
import FormularioPrato from './paginas/Admin/Pratos/FormularioPrato';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />}>

        <Route path="restaurantes">
          <Route path="" element={<AdminRestaurantes />} />
          <Route path="novo" element={<FormularioRestaurante />} />
          <Route path=":id" element={<FormularioRestaurante />} />
        </Route>

        <Route path="pratos">
          <Route path="" element={<AdminPratos />} />
          <Route path="novo" element={<FormularioPrato />} />
          <Route path=":id" element={<FormularioPrato />} />
        </Route>
      </Route>



    </Routes >
  );
}

export default App;
