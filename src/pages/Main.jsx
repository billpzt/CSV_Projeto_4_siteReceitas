import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Recipe from './Recipe.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function Main() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const url = `https://edamam-recipe-search.p.rapidapi.com/search?q=${searchText}&r=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a777e9f51bmshbe718764991ce9cp1688bajsn080688213b13",
      "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
    },
  };

  const getData = () => {
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        setData(result.hits);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleButtonClick = () => {
    getData();
  };

  useEffect(() => {
  }, [data]);

  return (
    <Router>
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder=""
          aria-label=""
          aria-describedby="basic-addon2"
          onChange={handleInputChange}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={handleButtonClick}
        >
          Buscar Receita
        </Button>
      </InputGroup>
      {data && (
        <ListGroup defaultActiveKey="#link1">
          {data.map((recipe, index) => (
            <ListGroup.Item
              action
              href={`to={/${index + 1}}`}
              // href={<Recipe />}
              key={index}
            >
              {recipe.recipe.label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <Routes>
        <Route 
          path="/:id"
          element={<Recipe />} /> 
      </Routes>
    </>
    </Router>
  );
}
