import React, { useEffect, useContext } from 'react';
import {useHistory, Link} from "react-router-dom";
import UserContext from "../context/UserContext";
import AuthOptions from "../components/auth/AuthOptions";
import Movies from "../pages/Movies";
import Detail from "../pages/Detail";
import NoMatch from "../pages/NoMatch";
import Nav from "../components/Nav";
// import User from "./pages/User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function Home () {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) history.push("/login")
    
    })

    return <div className="page">
        <header id="header">
                <Router>
      
    <div>
      <Nav />
      {/* <User/> */}
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route exact path="/movie" component={Movies} />
        <Route exact path="/movie/:id" component={Detail} />
        <Route exact path="/nomatch" component={NoMatch} />

        
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
   
  </Router>
          
            <AuthOptions />

        </header>
    </div>
}

export default Home
