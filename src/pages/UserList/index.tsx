import React, { useState, useEffect, Fragment } from "react";
import "./styles.css"
import { UserDetails } from "../../App";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";


const UserList = (props: { userListContent: UserDetails[] }) => {

    const history = useHistory();

    const userList = useSelector(
        (state: any) => state.users
    );

    const userLoadingCompleted = useSelector(
        (state: any) => state.userLoadingCompleted
    );

    return (
        <>
            <div className="user-list-page">
                <div className="user-list-header">
                    <h2>USERS MOCK DATA</h2>
                </div>
                {userList.length !== 0 && userLoadingCompleted ?
                    <div className="user-list" style={{
                        paddingBottom: '3%'
                    }}>
                        <table width="90%">
                            <thead className="table-header">
                                <tr>
                                    <th>User Id</th>
                                    <th>Name</th>
                                    <th>Phone Number </th>
                                    <th>Email ID</th>
                                </tr>
                            </thead>
                            <div style={{height: 0.2, backgroundColor: 'gray', marginTop: 5, width: '89.7%', position: 'absolute'}}></div>
                            <tbody>
                                {userList.map((row: UserDetails, index: number) => {
                                    return (
                                        <UserRow
                                            key={row.id}
                                            id={row.id}
                                            name={row.name}
                                            phnumber={row.phnumber}
                                            emailId={row.emailId}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                        <button
                            onClick={() => history.push("/adduser")}
                            type={"button"}
                            className="add-button"
                        >
                            Add User
                        </button>
                    </div> : userLoadingCompleted && userList.length === 0 ?
                        <div>
                            <h3 style={{marginTop: '5%', marginLeft: '41%', fontSize: '22px'}}>No Users Found, Please Do Add One</h3>
                            <button
                                onClick={() => history.push("/adduser")}
                                className="add-button"
                            >
                               Add User 
                            </button>
                        </div>
                        : <div>
                            <h4 style={{marginLeft: '35%', marginTop: '20%', fontSize: '30px', color: 'red'}}>Error Loading Data, Please Do Try Again.</h4>
                        </div>}
            </div>
        </>
    );
};

const UserRow = ({ id, name, phnumber, emailId }: UserDetails) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{phnumber}</td>
            <td> {emailId}</td>
        </tr>
    );
};

export default UserList;
