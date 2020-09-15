import axios from "axios";

export default {
  // Gets all movies
  getMovies: function() {
    return axios.get("http://localhost:3001/api/movies");
  },
  // Gets the movie with the given id
  getMovie: function(id) {
    return axios.get("http://localhost:3001/api/movies/" + id);
  },
  // Deletes the movie with the given id
  deleteMovie: function(id) {
    return axios.delete("http://localhost:3001/api/movies/" + id);
  },
  // Saves a movie to the database
  saveMovie: function(movieData) {
    
    return axios.post("http://localhost:3001/api/movies", movieData);
  }
};
