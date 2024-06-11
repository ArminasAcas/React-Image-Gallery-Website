export const tokenUtils = {
    getToken: () => {
        return localStorage.getItem("userToken");
    },

    removeToken: () => {
        localStorage.removeItem("userToken");
    },
    
    setToken: (token:any) => {
        localStorage.setItem("userToken", token);
    }
}

