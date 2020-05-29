import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const PublicRoute = ({ component, ...rest }) => {
    const authContext = useContext(AuthContext);
    return (
        <Route
          {...rest}
          render={props =>
            authContext.isAuth ? (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            ) : (
              React.createElement(component, props)
            )
          }
        />
      );
  }

  export default PublicRoute;