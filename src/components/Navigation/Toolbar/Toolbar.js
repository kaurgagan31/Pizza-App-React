import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import classes from './Toolbar.module.css';

const Toolbar = (props) => {

    const authContext = useContext(AuthContext);
    console.log(authContext);

    const logOut = () => {
        authContext.logout();
    };

    return (
        <header className={classes.Toolbar}>
            Domino's Pizza

            <div className={classes.Navigation}>
                <Link className={classes.NavigationItem} to="/app/home">Home</Link>
                {authContext.isAdmin === 1 && 
                <Link className={classes.NavigationItem} to="/app/users">Users</Link> }
                <button onClick={logOut}>Log Out</button>
            </div>
        </header>
    );
}
                         
export default Toolbar;  