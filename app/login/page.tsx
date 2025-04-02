'use client';

import React from 'react';
import { GoogleLogin } from '../service/google.auth';

const MyComponent = () => {
    const handleClick = () => {
        GoogleLogin();
    };

    return (
        <>
        <button onClick={handleClick}>
            Click Me
        </button>
        </>
    );
};

export default MyComponent;
