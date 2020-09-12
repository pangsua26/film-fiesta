
import React, { useState, useEffect } from 'react';
import Movies from "./pages/Movies";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Nav from "./components/Nav";
// import User from "./pages/User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "./context/UserContext";
import Axios from "axios";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./style.css";

// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  useEffect(() => {
    console.log("testing");
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("http://localhost:3001/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:3001/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data
        });
      }
     
    };
    checkLoggedIn();

  }, []);
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
    <div>
      <Nav />
      {/* <User/> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/movie" component={Movies} />
        <Route exact path="/movie/:id" component={Detail} />
        <Route exact path="/nomatch" component={NoMatch} />

        
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
    </UserContext.Provider>
  </Router>
  
  );
}

export default App;
