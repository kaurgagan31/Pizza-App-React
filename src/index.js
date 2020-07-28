import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context';
import * as serviceWorker from './serviceWorker';

//Importing the required dependencies from the installed packages
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//Here you create the httpLink that will connect your ApolloClient instance with the GraphQL API, 
//your GraphQL server will be running on 
const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql'
});

//Instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(

    <BrowserRouter>
        <ApolloProvider client={client}>
          <ApolloProviderHooks client={client}>
          <AuthContextProvider>
            <ThemeProvider theme={Themes.default}>
              <CssBaseline />
              <App />
            </ThemeProvider>
            </AuthContextProvider>
          </ApolloProviderHooks>
        </ApolloProvider>
    </BrowserRouter>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
