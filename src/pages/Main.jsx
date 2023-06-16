import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

export default function Main() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

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
    setButtonClicked(true);
  };

  useEffect(() => {
    if (buttonClicked) {
      getData();
    }
  }, [buttonClicked]);

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
      {buttonClicked && (
        <ListGroup defaultActiveKey="#link1">
          {data.map((recipe, index) => (
            <ListGroup.Item
              action
              href={`#link${index + 1}`}
              key={index}
            >
              {recipe.recipe.label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
