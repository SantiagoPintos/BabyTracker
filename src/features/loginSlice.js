import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    token: null,
    estaLogueado: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        exitoso: (state, action) => {
            //'payload' se usa por convencion
            state.userId = action.payload.id;
            state.token = action.payload.token;
            state.estaLogueado = true;
        },
        logout: state => {
            state.userId = null;
            state.token = null;
            state.estaLogueado = false;
        }
    }
});

export  const { exitoso, logout } = loginSlice.actions;
export default loginSlice.reducer;
