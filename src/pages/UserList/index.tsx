import React, { useState, useEffect, Fragment } from "react";
import "./styles.css"
import { UserDetails } from "../../App";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Trash } from "../../assets/svg/trash.svg";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import { ReactComponent as Search } from "../../assets/svg/search.svg";
import { DeleteUser, getUserByName } from "../../redux/actions";

const UserList = (props: { userListContent: UserDetails[] }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const userList = useSelector(
        (state: any) => state.users
    );

    const userLoadingCompleted = useSelector(
        (state: any) => state.userLoadingCompleted
    );

    const isSearched = useSelector(
        (state: any) => state.isSearched
    );

    return (
        <>
            <div className="user-list-page">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90vw', marginLeft: '5%', marginRight: '5%', boxSizing: 'border-box' }}>
                    <button
                        onClick={() => history.push("/adduser", { type: "new" })}
                        type={"button"}
                        className="add-button"
                        style={{
                            marginTop: 0, marginLeft: 0, width: '12%',
                            height: '6vh'
                        }}
                    >
                        Add User
                        </button>
                    <div className="user-list-header">
                        <h2>USERS MOCK DATA</h2>
                    </div>
                    <input type="search" className="search-user" placeholder="Search User By Name" onChange={(e) => { dispatch(getUserByName(e.target.value)) }} />
                    <Search style={{ position: 'absolute', right: 120 }} />
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
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <div style={{ height: 0.2, backgroundColor: 'gray', marginTop: 5, width: '89.7%', position: 'absolute' }}></div>
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
                    </div> : userLoadingCompleted && userList.length === 0 ?
                        <div>
                            <h3 style={{ display: 'flex', marginTop: '5%', width: '100vw', fontSize: '22px', justifyContent: 'space-evenly' }}>{isSearched ? "No such User Found" : "No Users Found, Please Do Add One"}</h3>
                        </div>
                        : <div>
                            <h4 style={{ marginLeft: '35%', marginTop: '20%', fontSize: '30px', color: 'red' }}>Error Loading Data, Please Do Try Again.</h4>
                        </div>}
            </div>
        </>
    );
};

const UserRow = ({ id, name, phnumber, emailId }: UserDetails) => {
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{phnumber}</td>
            <td> {emailId}</td>
            <td style={{ position: 'relative', paddingLeft: 15 }} onClick={() => history.push("/adduser", { type: "edit", userId: id, userName: name, mobileNumber: phnumber, emailAddress: emailId })}><Edit style={{ marginRight: 15 }} /></td>
            <td onClick={() => dispatch(DeleteUser(id))}><Trash /></td>
        </tr>
    );
};

export default UserList;
