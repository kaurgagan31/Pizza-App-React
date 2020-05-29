import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


var user = window.localStorage.getItem('currentUser');
export const AuthContext = React.createContext({
    isAuth: user ,
    isAdmin: 0,
    currentUser: {},
    isError: false,
    login: () => { },
    logout: () => { }
});

let isLogged = user !== '' && user !== null ? true : false;
let loggedInUser = user !== null ? JSON.parse(user) : null;
let adminUser = loggedInUser !== null ? loggedInUser.role_id: null;

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(isLogged);
    const [isAdminValue, setAdminValue] = useState(adminUser);
    const [currUser, setCurrentUser] = useState(loggedInUser);
    const [error, setError] = useState(false);
    const history = useHistory();

    const loginHandler = (data) => {
        console.log(data);
        fetch('http://localhost:8000/api/log_in', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.status === "100") {
                    console.log(responseData);
                    localStorage.setItem('currentUser', JSON.stringify(responseData.user));
                    setAdminValue(responseData.user.role_id);
                    setCurrentUser(responseData.user);
                    setIsAuthenticated(true);
                    history.push('/');
                } else if(responseData.status === "103") {
                    setError(true);
                }
            });
    };

    const logoutHandler = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        setAdminValue(null);
        setIsAuthenticated(false);
        history.push('/auth');
    };

    return (
        <AuthContext.Provider
            value={{ login: loginHandler, logout: logoutHandler, isAuth: isAuthenticated, isAdmin: isAdminValue, currentUser: currUser, isError: error }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;