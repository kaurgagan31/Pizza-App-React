import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Listing from '../../containers/Listing/Listing';
import Users from '../../containers/Users/Users';
import Formik from '../../containers/formik/formik';
import Profile from '../../components/Profile/ViewProfile/ViewProfile';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar />
                <Switch>
                    <Route path="/app/users" component={Users} />
                    <Route path="/app/home" exact component={Listing} />
                    <Route path="/app/add-user" component={Formik} />
                    <Route path="/app/view-user" component={Profile} />
                </Switch>
            </Aux>
        );
    }
}   
           
export default Layout;