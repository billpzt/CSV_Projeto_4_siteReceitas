import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { Routes, Route, Link } from "react-router-dom";
import RecipePage from "./pages/RecipePage.jsx";

function App() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
    setSelectedRecipe(null);
    getData();
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  useEffect(() => {
    // Add any desired side effect logic here
  }, [data]);

  return (
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
      {!selectedRecipe && (
        <ListGroup defaultActiveKey="#link1">
          {data.map((recipe, index) => (
            <ListGroup.Item
              as={Link}
              to={`/recipePage/${recipe.recipe.label}`}
              key={index}
              onClick={() => handleRecipeClick(recipe)}
            >
              {recipe.recipe.label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {selectedRecipe && (
        <Routes>
          <Route
            path={`/recipePage/${selectedRecipe.recipe.label}`}
            element={<RecipePage data={selectedRecipe} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
