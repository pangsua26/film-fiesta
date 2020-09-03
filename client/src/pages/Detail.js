import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Detail(props) {
  const [movie, setMovie] = useState({})
  
  let {id} = useParams();
  // Add code to get the movie with an _id equal to the id in the route param
  // e.g. http://localhost:3000/movies/:id
  // The movie id for this route can be accessed using the useParams hook
  // from react-router-dom.
  
  useEffect(() => {
    console.log(id)
    API.getMovie(props.match.params.id)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
      <Container fluid>
        <Row>
          <Col size="md-18">
            <Jumbotron>
              <h1>
                {movie.title} by {movie.director}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>
                {movie.synopsis}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Home</Link>
          </Col>
        </Row>
      </Container>
    );
  }


export default Detail;
