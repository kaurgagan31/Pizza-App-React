import React, { useState, useEffect, useContext } from 'react';
import { Typography, Button } from '@material-ui/core';
import UserListing from '../../components/UserListing/UserListing';
import {AuthContext} from '../../context/auth-context';
import Loader from '../../components/Loader/Loader';
import Search from '../../components/Search/Search';
import classes from './Users.module.css';

const Users = () => {

    const [userList, setUser] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    useEffect(() => {
        console.log('inside useEffects');
        setLoading(true);
        fetch('http://localhost:8000/api/getUsers', {
            headers: {
                'x-access-token': authContext.currentUser.token
            }
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.status === 200) {
                    setLoading(false);
                    setUser(responseData.users);
                }
            });
    }, []);

    const searchHandler = (values) => {
        console.log(values);
        fetch('http://localhost:8000/api/searchUsers', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'x-access-token': authContext.currentUser.token,
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.status === 200) {
                    setLoading(false);
                    setUser(responseData.users);
                }
            });
    }
                                                                                            
    let users = null;
    let loading = null;
    loading = isLoading ? <Loader /> : <UserListing
    users={userList} />;
    users = userList !== undefined ?
        <div className={classes.Content}>
            <Button variant="text" size="small" color="secondary" href="add-user">
                + Add User
        </Button>
            <Search searchData={searchHandler} />
            <hr />
            {loading}
        </div> :
        <div>Loading....</div>
    return (
        <>
            <Typography variant="h4" color="secondary" align="center" display="block">Users Manager</Typography>
            {users}

        </>
    )
}

export default Users;