import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

var user = localStorage.getItem('currentUser');
var token =  localStorage.getItem('token');
export const AuthContext = React.createContext({
    isAuth: user ,
    isAdmin: 0,
    currentUser: {},
    isError: false,
    userToken: '',
    updateUser: () => {},
    login: () => { },
    logout: () => { }
});

let isLogged = user !== '' && user !== null ? true : false;
let loggedInUser = user !== null ? JSON.parse(user) : null;
let usrToken = token !== null ? token: null;
let adminUser = loggedInUser !== null ? loggedInUser.role_id: null;

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(isLogged);
    const [isAdminValue, setAdminValue] = useState(adminUser);
    const [currUser, setCurrentUser] = useState(loggedInUser);
    const [token, setToken] = useState(usrToken);
    const [error, setError] = useState(false);
    const history = useHistory();

    const loginHandler = (data) => {
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
                    localStorage.setItem('currentUser', JSON.stringify(responseData.user));
                    localStorage.setItem('token', responseData.token);
                    setAdminValue(responseData.user.role_id);
                    setToken(responseData.token);
                    setCurrentUser(responseData.user);
                    setIsAuthenticated(true);
                    setError(false);
                    history.push('/');
                } else if(responseData.status === "103") {
                    setError(true);
                }
            });
    };

    const userHandler = (data) => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        setCurrentUser(data);
    }

    const logoutHandler = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
        setAdminValue(null);
        setIsAuthenticated(false);
        setError(false);
        history.push('/auth');
    };

    return (
        <AuthContext.Provider
            value={{ login: loginHandler, logout: logoutHandler, updateUser: userHandler, isAuth: isAuthenticated, isAdmin: isAdminValue, currentUser: currUser, userToken: token, isError: error }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;