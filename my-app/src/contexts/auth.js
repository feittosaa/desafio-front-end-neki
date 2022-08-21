import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_bd");

        if (userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.usuario === JSON.parse(userToken).usuario
            );

            if (hasUser) setUser(hasUser[0]);
        }
    }, []);

    const signin = (usuario, senha) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

        const hasUser = usersStorage?.filter((user) => user.usuario === usuario);

        if (hasUser?.length) {
            if (hasUser[0].usuario === usuario && hasUser[0].senha === senha) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({ usuario, token }));
                setUser({ usuario, senha });
                return;
            } else {
                return "Usuário ou senha incorretos";
            }
        } else {
            return "Usuário não cadastrado";
        }
    };

    const signup = (usuario, senha) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

        const hasUser = usersStorage?.filter((user) => user.usuario === usuario);

        if (hasUser?.length) {
            return "Usuário já cadastrado";
        }

        let newUser;

        if (usersStorage) {
            newUser = [...usersStorage, { usuario, senha }];
        } else {
            newUser = [{ usuario, senha }];
        }

        localStorage.setItem("users_bd", JSON.stringify(newUser));

        return;
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signup, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
};