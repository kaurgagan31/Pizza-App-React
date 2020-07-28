import React, { useState, useEffect, useContext } from 'react';
import {  useHistory } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Typography, Button } from '@material-ui/core';
import UserListing from '../../components/UserListing/UserListing';
import { AuthContext } from '../../context/auth-context';
import Loader from '../../components/Loader/Loader';
import classes from './Users.module.css';

// listing users mutation
const LIST_USERS_QUERY = gql`
  query {
    getUsers {
      id
      first_name
      last_name
      email
      gender
      jobType
      hobbies
    }
  }
`

// delete user mutation
const DELETE_USER_MUTATION = gql`
mutation DELETE_USER_MUTATION(
    $id: ID!
    ) {
        deleteUser(id: $id)
}
`

const Users = React.memo(() => {
    const client = useApolloClient();
    const history = useHistory();
    const [userList, setUser] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        getUserListing();
    }, []);

    const getUserListing = async() => {
        setLoading(true);
        const { data, loading, error } = await client.query({
            query: LIST_USERS_QUERY,
            variables: {  },
            fetchPolicy: "no-cache"
          });
        if (loading) {
            setLoading(false);
          }
        if (error) return 'Something Bad Happened';
        if(data) {
            setUser(data.getUsers);  
        }
    }

    const deleteUserHandler = async(userId) => {
        const {data, error, loading} = await client.mutate({
            variables: { id: userId },
            mutation: DELETE_USER_MUTATION,
          });
          if(data) {
            getUserListing();
          }
    }

    const updateUserHandler = async(user) => {
        history.push({
            pathname: '/app/add-user',
            state: { user: user }
          })
    }

    let users  = <Loader />;
    let loading1 = null;
    if(userList !== []) {
       users = <div className={classes.Content}>
        <Button variant="text" size="small" color="secondary" href="add-user">
            + Add User
    </Button>
        <hr />
        <UserListing
         users={userList} 
         updateUser = {updateUserHandler}
         deleteUser = {deleteUserHandler}/>
    </div>
    } else {
        users = <Loader />
    }
    return (
        <>
            <Typography variant="h4" color="secondary" align="center" display="block">Users Manager</Typography>
            {users}
        </>
    )
});

export default Users;