import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    eventos: [],
};

export const eventosSlice = createSlice({
    name: 'eventos',
    initialState,
    reducers: {
        agregar: (state, action) => {
            state.eventos.push(action.payload);
        },
        cargar: (state, action) => {
            state.eventos = action.payload;
        },
        limpiar: (state) => {
            state.eventos = [];
        }
    }
});

export  const { agregar, cargar, limpiar } = eventosSlice.actions;
export default eventosSlice.reducer;
