import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

function Nav() {
const {userData, setUserData} = useContext(UserContext); // get user data and set user data for me in separate variables

    const history = useHistory();
    //register and history are working like a Link works. it changes the current url
    const register = () => history.push("/register")
    const login = () => history.push("/login")
    const logout = () => {
        setUserData ({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };
    console.log(userData);
   


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
     {userData.user ? (
                <button onClick={logout}>Log Out</button>
            ) : (
                <>
                <button className="mr-2" onClick= {register}>Register</button>
                <button onClick={login}>Log in</button>
                </>
        )}
    </nav>
  );
}

export default Nav;
