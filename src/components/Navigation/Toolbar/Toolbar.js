import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button
  } from "@material-ui/core";
import { AuthContext } from '../../../context/auth-context';
import classesInternal from './Toolbar.module.css';

// styles
import useStyles from "../../../styles";

const ToolbarMenu = (props) => {

    const authContext = useContext(AuthContext);
    var classes = useStyles();
    const logOut = () => {
        authContext.logout();
    };
    return (
        <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Domino's Pizza
          </Typography>
                 <NavLink exact activeClassName={classesInternal.active} className={classesInternal.NavigationItem} to="/app/home">Home</NavLink>
             {authContext.isAdmin === 1 && 
               <NavLink  activeClassName={classesInternal.active} className={classesInternal.NavigationItem} to="/app/users">Users</NavLink> }
          <Button color="inherit" onClick={logOut} >Logout</Button>
        </Toolbar>
      </AppBar>
    );
}
                         
export default ToolbarMenu;  