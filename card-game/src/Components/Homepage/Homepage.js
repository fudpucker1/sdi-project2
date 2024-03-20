import React, { useState, useEffect } from 'react';

const Homepage = () => {

    const handleClick = (e) => {
        console.log('hello,ninjas', e);
    }

    const handleClickAgain = (name) => {
        console.log('hello' + name);
    }

    return (
        <div className="home">
            <h2> Homepage</h2>
            <button onClick={handleClick}>Click me</button>
            <button onClick={(e) => handleClickAgain('mario', e)}>click me again</button>
        </div>
    );
}

export default Homepage;
