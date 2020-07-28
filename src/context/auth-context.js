import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';
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

// login user mutation
const LOGIN_USER_MUTATION = gql`
mutation LOGIN_USER_MUTATION(
    $email: String!
    ) {
        loginUser(
            email: $email
            ){
             token
             user {
                  id
                  first_name
                  last_name
                  email
                  gender
                  jobType
                  role
                 }
            }
}
`

let isLogged = user !== '' && user !== undefined ? true : false;
let loggedInUser = user !== undefined ? JSON.parse(user) : null;
let usrToken = token !== undefined ? token: null;
let adminUser = loggedInUser !== undefined ? loggedInUser.role: null;

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(isLogged);
    const [isAdminValue, setAdminValue] = useState(adminUser);
    const [currUser, setCurrentUser] = useState(loggedInUser);
    const [token, setToken] = useState(usrToken);
    const [error, setError] = useState(false);
    const history = useHistory();
    const client = useApolloClient();

    const loginHandler = async (reqData) => {


        const { data, error, loading } = await client.mutate({
            variables: { ...reqData },
            mutation: LOGIN_USER_MUTATION,
        });
        if(data) {
            localStorage.setItem('currentUser', JSON.stringify(data.loginUser.user));
                    localStorage.setItem('token', data.loginUser.token);
                    setAdminValue(data.loginUser.user.role);
                    setToken(data.loginUser.token);
                    setCurrentUser(data.loginUser.user);
                    setIsAuthenticated(true);
                    setError(false);
                    history.push('/');
        }

        if(error) {
            setError(true);
        }
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