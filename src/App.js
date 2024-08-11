import './App.css';
import './bootstrap/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  return (  
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/registro' element={<Registro />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
