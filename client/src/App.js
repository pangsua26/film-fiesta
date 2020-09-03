import React from "react";
import Movies from "./pages/Movies";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
// import User from "./pages/User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() {
  return (
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
  );
}

export default App;
