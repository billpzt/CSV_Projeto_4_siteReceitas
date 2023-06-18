import React from 'react'
import { useParams } from 'react-router-dom';

function Recipe() {
    let { id } = useParams();

  return (
    <div>
        <h1>RECIPE PAGE</h1>
        <p>ID: {id}</p>
    </div>
  )
}

export default Recipe