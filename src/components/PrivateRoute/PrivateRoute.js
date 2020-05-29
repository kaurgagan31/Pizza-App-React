import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const PrivateRoute = ({ component, ...rest }) => {
    const authContext = useContext(AuthContext);
    return (
      <Route
        {...rest}
        render={props =>
          authContext.isAuth ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/auth",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;