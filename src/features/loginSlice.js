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
            state.userId = localStorage.setItem('userId', action.payload.id);
            state.token = localStorage.setItem('token', action.payload.token);
            state.estaLogueado = true;
        },
        logout: state => {
            localStorage.clear();
            state.estaLogueado = false;
        }
    }
});

export  const { exitoso, logout } = loginSlice.actions;
export default loginSlice.reducer;
