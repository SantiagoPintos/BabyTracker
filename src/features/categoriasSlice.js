import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categorias: [],
};

export const categoriasSlice = createSlice({
    name: 'categorias',
    initialState,
    reducers: {
        cargar: (state,action) => {
            state.categorias = action.payload;
        },
        limpiar: state => {
            state.categorias = [];
        }
    }
});

export  const { cargar, limpiar } = categoriasSlice.actions;
export default categoriasSlice.reducer;
