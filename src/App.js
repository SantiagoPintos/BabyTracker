import './App.css';
import './bootstrap/bootstrap.css';
import './bootstrap/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './components/Login';
import Registro from './components/Registro';
import Header from './components/Header';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Login />
    </Provider>
  );
}

export default App;
