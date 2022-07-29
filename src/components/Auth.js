import { set } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from "../firebase";
import React from 'react'
import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
const Auth = () => {


    //-----------Initialise variables
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [newUser, setNewUser] = useState(true);
    //-----------Initialse variables



    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/MainPage");
            }
            else {
                navigate("/chatApp");
            }
        });
    }, []);

    //---------Update state variables ------
    const HandleChangeUsername = (e) => {
        setFormData((prev) => ({
            ...prev,
            username: e.target.value
        }))
    }
    const HandleChangePassword = (e) => {
        setFormData((prev) => ({
            ...prev,
            password: e.target.value
        }))
    }

    //get the data and create a user
    const HandleClick = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, formData.username, formData.password)
            .then(() => {
                setFormData(() => ({ username: "", password: "" }))
                alert("User Created!");
                navigate("/MainPage");
            })
            .catch((err) => {
                alert(err.message);
            })
    }


    const UserRegistration = () => {
        setNewUser((state) => state = !state)
    }
    const HandleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, formData.username, formData.password)
            .then(() => {
                setFormData(() => ({ username: "", password: "" }))
                alert("User verified!");
                navigate("/MainPage");
            }).catch((err) => {
                alert(err.message);
            })
    }
    return (
        <div className="container">
            {
                (newUser) ? (
                    <div className='Credentials'>
                        <h1>Sign Up To Chat!</h1>
                        <form>
                            <input type="text" placeholder="Username" onChange={(e) => { HandleChangeUsername(e) }} value={formData.username} />
                            <input type="text" placeholder="password" onChange={(e) => { HandleChangePassword(e) }} value={formData.password} />
                            <input type="submit" value="Sign Up!" onClick={(e) => { HandleClick(e) }} />
                        </form>

                    </div>
                ) : (
                    <div className='Credentials'>
                        <h1>Sign In To Chat!</h1>
                        <form>
                            <input type="text" placeholder="Username" onChange={(e) => { HandleChangeUsername(e) }} value={formData.username} />
                            <input type="text" placeholder="password" onChange={(e) => { HandleChangePassword(e) }} value={formData.password} />
                            <input type="submit" value="Sign In!" onClick={(e) => { HandleSignIn(e) }} />
                        </form>
                    </div>
                )}
            {(newUser) ?
                (
                    <div className="user">
                        <h4><span>Already a User?</span>{" "}<button onClick={UserRegistration}>Sign In!</button></h4>
                    </div>

                ) : (
                    <div className="user">
                        <h4><span>New Around here?</span>{" "}<button onClick={UserRegistration}>Lets Set You up!</button></h4>
                    </div>
                )
            }

        </div>
    )
}

export default Auth