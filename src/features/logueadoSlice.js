import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logueado: false,
};

export const logueadoSlice = createSlice({
    name: 'logueado',
    initialState,
    reducers: {
        loguear: state => {
            state.logueado = true;
        },
        desloguear: state => {
            state.logueado = false;
        }
    }
});

export  const { loguear, desloguear } = logueadoSlice.actions;
export default logueadoSlice.reducer;
