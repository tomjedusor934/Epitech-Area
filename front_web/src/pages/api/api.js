import './api.css'

import React, { useState, useEffect } from 'react';



export default function My_Api(props) {

    //create trigger for button

    // useEffect(() => {
    //     localStorage.setItem('token', '007cd524e7890d380a87ca77d13c8c6cb128e55c244ffd3582803a241973ea72f0a540ef82f1883001b5c2d0eac6d2447cf722633ba9ae2091e07130a82f2a1fcc604a806d6f6956f25dc1');
    // }, []);

    // const connect = () => {
    //     //create function to connect with google
    //     // window.location.href = 'http://127.0.0.1:8081/login/auth/google';
    //     fetch('http://127.0.0.1:8081/oauth/login/discord', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': localStorage.getItem('token'),
    //         },
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         if (data.redirect_uri) {
    //             window.location.href = data.redirect_uri; // Redirige le navigateur vers l'URL de redirection
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }

    return (
        <div className='accueil_content'>
            {/* create button to connect with google */}
            {/* <button onClick={() => connect()}>Connect with google</button> */}
        </div>
    )
}