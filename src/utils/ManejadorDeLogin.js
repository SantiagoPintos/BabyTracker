export const loginExitoso = (id, apiKey) => {
    if(id === undefined || apiKey === undefined) return;

    localStorage.setItem('token', apiKey);
    localStorage.setItem('id', id);
};

export const cerrarSesion = () => {
    localStorage.clear();
};

export const estaLogueado = () => {
    return localStorage.getItem('token') !== null;
};
