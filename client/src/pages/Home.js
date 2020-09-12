import React, { useEffect, useContext } from 'react';
import {useHistory, Link} from "react-router-dom";
import UserContext from "../context/UserContext";
import AuthOptions from "../components/auth/AuthOptions";

function Home () {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) history.push("/login")
    
    })

    return <div className="page">
        <header id="header">
            <Link  to="/">
                <h1 className="title">MERN auth </h1>
            </Link>
            <AuthOptions />

        </header>
    </div>
}

export default Home
