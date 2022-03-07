export const createTokenProvider = () => {


    let _token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || 'null');

    let observers = [];

    const notify = () => {
        const isLogged = isLoggedIn();
        observers.forEach(observer => observer(isLogged));
    };

    const getToken = () => {
        if (!_token) {
            return null;
        }

        return _token && _token.accessToken;
    };

    const setToken = (token) => {
        if (token) {
            localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
        } else {
            localStorage.removeItem('REACT_TOKEN_AUTH');
        }
        _token = token;
        notify();
    };

    const isLoggedIn = () => {
        return !!_token;
    };

    const subscribe = (observer) => {
        observers.push(observer);
    };

    const unsubscribe = (observer) => {
        observers = observers.filter(_observer => _observer !== observer);
    };


    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe,
    };
};


