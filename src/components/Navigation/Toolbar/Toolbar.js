import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import classesInternal from './Toolbar.module.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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

  const logOut = () => {
    authContext.logout();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>

      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Domino's Pizza
          </Typography>
          {auth && (

            <div>
              {authContext.isAdmin === 1 ? <Typography variant="h6">Welcome Admin </Typography> : <Typography variant="h6">Welcome User</Typography>}
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <NavLink exact activeClassName={classesInternal.active} className={classesInternal.NavigationItem} to="/app/home">Home</NavLink>
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                {authContext.isAdmin === 1 &&
                  <NavLink activeClassName={classesInternal.active} className={classesInternal.NavigationItem} to="/app/users">Users</NavLink>}
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
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                classes={{ paper: classes.profileMenu }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Sign OUt</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}





















// import React, { useContext, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button
// } from "@material-ui/core";
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import {
//   Menu as MenuIcon,
//   Person as AccountIcon,
// } from "@material-ui/icons";
// import { AuthContext } from '../../../context/auth-context';
// import classesInternal from './Toolbar.module.css';
// import classNames from "classnames";
// // styles
// import useStyles from "../../../styles";

// const ToolbarMenu = (props) => {

//   const authContext = useContext(AuthContext);
//   var [profileMenu, setProfileMenu] = useState(null);
//   var classes = useStyles();


//   const logOut = () => {
//     authContext.logout();
//   };
//   return (
//     <AppBar position="fixed">
//       <Toolbar>
//         <Typography variant="h6" className={classes.title}>
//           Domino's Pizza
//           </Typography>
//         {/* <NavLink exact activeClassName={classesInternal.active} className={classesInternal.NavigationItem} to="/app/home">Home</NavLink>
//         {authContext.isAdmin === 1 &&
//           <NavLink activeClassName={classesInternal.active} className={classesInternal.NavigationItem} to="/app/users">Users</NavLink>} */}
//         {/* <Button color="inherit" onClick={logOut} >Logout</Button> */}
//         <Menu
//           id="profile-menu"
//           open={Boolean(profileMenu)}
//           anchorEl={profileMenu}
//           onClose={() => setProfileMenu(null)}
//           className={classes.headerMenu}
//           classes={{ paper: classes.profileMenu }}
//           disableAutoFocusItem
//         >
//           <MenuItem
//             className={classNames(
//               classes.profileMenuItem,
//               classes.headerMenuItem,
//             )}
//           >
//             <AccountIcon className={classes.profileMenuIcon} /> Profile
//           </MenuItem>
//           <div className={classes.profileMenuUser}>
//             <Typography
//               className={classes.profileMenuLink}
//               color="primary"
//               onClick={logOut}
//             >
//               Sign Out
//             </Typography>
//           </div>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default ToolbarMenu;  