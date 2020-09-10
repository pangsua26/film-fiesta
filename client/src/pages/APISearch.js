import React, { useReducer, useEffect } from "react";
import Movies from "./pages/Movies";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
// import User from "./pages/User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=0562f14bedmshc9dfe180b634C2ep1e3e26jsndc541bcbe2ba";


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});
	
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=0562f14bedmshc9dfe180b634C2ep1e3e26jsndc541bcbe2ba`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };

    const { movies, errorMessage, loading } = state;


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
}
export default App;
