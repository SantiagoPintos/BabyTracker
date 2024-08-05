import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './components/Login';
import Registro from './components/Registro';

function App() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

export default App;
