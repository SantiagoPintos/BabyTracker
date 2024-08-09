import { configureStore } from '@reduxjs/toolkit';
import categoriasReducer from '../features/categoriasSlice';
import eventosReducer from '../features/eventosSlice';

export const store = configureStore({
    reducer : {
        categorias: categoriasReducer,
        eventos: eventosReducer
    },
});
