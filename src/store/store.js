import { configureStore } from '@reduxjs/toolkit';
import categoriasReducer from '../features/categoriasSlice';
import eventosReducer from '../features/eventosSlice';
import logueadoReducer from '../features/logueadoSlice';

export const store = configureStore({
    reducer : {
        categorias: categoriasReducer,
        eventos: eventosReducer,
        logueado: logueadoReducer,
    },
});
