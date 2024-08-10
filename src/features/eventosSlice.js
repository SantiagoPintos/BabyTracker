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
        guardar: (state, action) => {
            state.eventos = action.payload;
        },
        eliminar: (state, action) => {
            state.eventos = state.eventos.filter(evento => evento.id !== action.payload);
        },
        limpiar: (state) => {
            state.eventos = [];
        }
    }
});

export  const { agregar, guardar, limpiar,eliminar } = eventosSlice.actions;
export default eventosSlice.reducer;
