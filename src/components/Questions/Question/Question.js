import React, { useState } from 'react';


const Question = (props) => {
    console.log(props);
  
    return (
        <>
         <label>{props.question.title}</label>
        </>
    )
}

export default Question;