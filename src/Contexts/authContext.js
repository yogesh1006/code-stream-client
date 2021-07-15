import { createContext, useContext, useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) { 

    const history = useHistory();
    const { isUserLoggedIn, token: savedToken } = JSON.parse(localStorage.getItem("jwt")) || { isUserLoggedIn: false, token: null };

    const [authState, authDispatch] = useReducer(authReducer, { isUserLoggedIn, token: savedToken });

    const logout = async () => {
        try {
            localStorage?.removeItem("jwt");
            authDispatch({ type:"LOGOUT" });
            history.push("/");
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const { isUserLoggedIn, token } = JSON.parse(localStorage?.getItem("jwt")) || {};
        isUserLoggedIn && authDispatch({ type:"LOGIN", payload: token });
    }, [])

    return (
        <AuthContext.Provider value={{ authState, authDispatch, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function authReducer(state, action){
    switch (action.type) {
        case "LOGIN":
            return { ...state, isUserLoggedIn: true, token: action.payload }
        case "LOGOUT":
            return { ...state, isUserLoggedIn: false, token: null }
        default:
            return state
    }
}