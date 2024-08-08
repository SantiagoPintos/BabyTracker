import './App.css';
import './bootstrap/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Registro from './components/Registro';
import Header from './components/Header';
import Cuerpo from './components/Cuerpo';

function App() {
  return (  
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/registro' element={<Registro />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Cuerpo />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
