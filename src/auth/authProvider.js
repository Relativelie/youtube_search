import { useEffect, useState } from "react";
import { createTokenProvider } from "./tokenProvider";

export const createAuthProvider = () => {

    const tokenProvider = createTokenProvider();

    const assertCredentials = async (login, password) => {

        let credentials = await fetch('./storage.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then(data => data.json())
            .then(json => { return json })

        for (let i = 0; i < credentials.length; i++) {
            if (credentials[i].login === login && credentials[i].password === password) {
                return true;
            }
        }
        return false;
    };

    const logIn = async (login, password) => {

        let assertResult = await assertCredentials(login, password);
        if (assertResult) {
            let newToken = "vy8ugvyv8tvyubbuh9b99b";
            tokenProvider.setToken(newToken);
        }
    };
    
    const logOut = () => {
        tokenProvider.setToken(null);
    };

    const authFetch = async (input, init) => {
        const token = await tokenProvider.getToken();
    
        init = init || {};
    
        init.headers = {
            ...init.headers,
            Authorization: `Bearer ${token}`,
        };
    
        return fetch(input, init);
    };
    
    const useAuth = () => {
        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());
    
        useEffect(() => {
            const listener = (newIsLogged) => {
                setIsLogged(newIsLogged);
            };
    
            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, []);
    
        return isLogged;
    };

    return {
        useAuth,
        authFetch,
        logIn,
        logOut
    }
};