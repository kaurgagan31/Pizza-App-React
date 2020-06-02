import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import classesInternal from './Toolbar.module.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useStyles from "../../../styles";

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const logOut = () => {
    authContext.logout();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewProfile = () => {
    history.push('/app/view-user');
    handleClose();
  }

  return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Domino's Pizza
          </Typography>
          {auth && (
            <div>
              {authContext.isAdmin === 1 ? <Typography variant="h6">Welcome Admin </Typography> : <Typography variant="h6">Welcome User</Typography>}
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                {authContext.isAdmin === 1 &&
                  <NavLink activeClassName={classesInternal.active} className={classesInternal.NavigationItem} to="/app/users">Users</NavLink>}
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <NavLink exact activeClassName={classesInternal.active} className={classesInternal.NavigationItem} to="/app/survey">Survey</NavLink>
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <NavLink exact activeClassName={classesInternal.active} className={classesInternal.NavigationItem} to="/app/home">Home</NavLink>
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <div>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                classes={{ paper: classes.profileMenu }}
              >
                <MenuItem onClick={viewProfile}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
  
  );
}
