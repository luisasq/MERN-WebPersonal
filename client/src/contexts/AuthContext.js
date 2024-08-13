import {useState, useEffect, createContext} from "react";

export const AuthContext = createContext();

export function AuthProvider(props){
    const {children} = props;
    const [user, setUser] = useState(null)

    useEffect(() => {
        // comprobar si el usuario esta logeado
    }, [])
    
}