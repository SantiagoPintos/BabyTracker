import { configureStore } from '@reduxjs/toolkit';
import categoriasReducer from '../features/categoriasSlice';


export const store = configureStore({
    reducer : {
        categorias: categoriasReducer,
    },
});
