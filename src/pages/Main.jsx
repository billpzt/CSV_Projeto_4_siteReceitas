import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

export default function Main() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({});

  const url =
    `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${searchText}`;

    // query=italian%20wedding%20soup
  
    const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a777e9f51bmshbe718764991ce9cp1688bajsn080688213b13",
      "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
    },
  };

  const getData = () => {
    fetch(url, options)
      .then((response) => response.text())
      .then((result) => {
        setData(result);
    })
      .catch((error) => {
        console.error(error);
    });
  }
  

  // const alertClicked = () => {
  //   alert("You clicked the third ListGroupItem");
  // };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  }

  // const handleSearchButtonClick = () => {
  //   return console.log(searchText);
  // }

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
          variant="outline-secondary" id="button-addon2"
          onClick={() => getData()}
          >
          Buscar Receita
        </Button>
      </InputGroup>
      <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item action href="#link1">
          Link 1
        </ListGroup.Item>
        <ListGroup.Item action href="#link2" disabled>
          Link 2
        </ListGroup.Item>
        <ListGroup.Item action href="#link2">
          This one is a button
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
