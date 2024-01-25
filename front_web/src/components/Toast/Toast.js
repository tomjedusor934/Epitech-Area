import './Toast.css'

import React, { useState, useEffect } from 'react';

const MyToast = ({ message, type }) => {
    
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    }, []);

    return (
        <div className={`my_toast ${show ? 'show' : ''} ${type}`}>
            {message}
        </div>
    );
}

export default MyToast;