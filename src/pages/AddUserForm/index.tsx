import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { AddUser, getAllUsers } from "../../redux/actions"
import "./styles.css";

interface UserForm {
    userId: string;
    userName: string;
    mobileNumber: string;
    emailAddress: string;
}

const AddUserForm = () => {
    const history = useHistory();
    const location: any = useLocation();
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        errors,
        setValue,
        getValues,
        control,
        formState,
        watch,
        reset,
    } = useForm<UserForm>({
        defaultValues: {
            userId: "",
            userName: "",
            mobileNumber: "",
            emailAddress: ""
        }
    });

    useEffect(() => {
        if (location.state.type === "edit") {
            console.log(location.state);
            setValue("userName", location.state.userName);
            setValue("mobileNumber", location.state.mobileNumber);
            setValue("emailAddress", location.state.emailAddress);
        }
    }, []);

    const watchUserId = watch("userId");
    const watchName = watch("userName");

    useEffect(() => {
        let name = getValues("userName").replace(/[^A-Za-z ]/g, "");
        console.log(name);
        var splitted = name.split(" ");

        if (
            splitted.every((name: string) => {
                return name == "";
            })
        ) {
            setValue("name", "");
        } else {
            if (splitted.length > 0) {
                for (var i = 0; i < splitted.length; i++) {
                    if (splitted[i].length === 1) {
                        splitted[i] = splitted[i].charAt(0).toUpperCase();
                    } else {
                        splitted[i] =
                            splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
                    }
                }
                name = splitted.join(" ");
                setValue("userName", name);
            }
        }
    }, [watchName]);

    const onSubmit = (formValues: any) => {
        console.log(formValues);
        if(location.state.type === "edit") formValues["userId"] = location.state.userId;
        dispatch(AddUser(formValues));
        reset(); 
        if (location.state.type === "edit") {
            history.goBack();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                <div className="user-details-form">
                    {errors.userId?.type === "required" &&
                        <p className="error-msg">User Id Required</p>
                    }
                    {location.state.type === "new" ?
                        <div>
                            <input
                                type="number"
                                placeholder="User Id"
                                maxLength={15}
                                name="userId"
                                required={true}
                                className={"add-user-text-input"}
                                ref={register}
                            />
                        </div> : null}
                    {errors.userName?.type === "required" &&
                        <p className="error-msg">Name Required</p>
                    }
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            maxLength={15}
                            name="userName"
                            required={true}
                            className={"add-user-text-input"}
                            ref={register}
                        />
                    </div>
                    {errors.mobileNumber?.type === "required" &&
                        <p className="error-msg">Phone Required</p>
                    }
                    <div>
                        <input
                            type="number"
                            placeholder="Phone"
                            name="mobileNumber"
                            required={true}
                            className={"add-user-text-input"}
                            ref={register}
                            min={0}
                        />
                    </div>
                    {errors.emailAddress?.type === "required" &&
                        <p className="error-msg">Email Required</p>
                    }
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            name="emailAddress"
                            required={true}
                            className={"add-user-text-input"}
                            ref={register}
                            min={0}
                        />
                    </div>
                </div>
                <div className="button-row">
                    <button
                        type="submit">
                        Submit
                        </button>
                    {location.state.type === "new" &&
                        <button
                            onClick={() => {history.goBack();}}
                            style={{ backgroundColor: 'white', border: '1px solid gray', color: 'black' }}>
                            Go Back
                        </button>}
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;
