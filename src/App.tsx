import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
import { useHistory, Switch, Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import UserList from "./pages/UserList/index";
import AddUser from './pages/AddUserForm/index';
import { getAllUsers } from './redux/actions';
import { useDispatch, useSelector, Provider } from "react-redux";
import Store from './redux/saga';
import AddUserForm from './pages/AddUserForm/index';

export interface UserDetails {
  id: number;
  name: string;
  phnumber: number;
  emailId: string;
}


function App() {
  const usersList = Store.getState().users;
  const usersLoadingCompleted = Store.getState().userLoadingCompleted;

  useEffect(() => {
    console.log(usersList);
  }, [usersList]);

  const DataLoader = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllUsers());
    }, []);
    return <Fragment></Fragment>;
  };

  return (
    <Provider store={Store}>
      <DataLoader />
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => usersList ? <UserList userListContent={usersList} /> : null} />
            <Route exact path="/addUser" component={AddUserForm} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
