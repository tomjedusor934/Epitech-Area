import './loading_container.css';

import React from "react";
import { useEffect, useRef, useState } from 'react';

// pas d'import d'images ou de composants externes

export default function Load() {
    //initialisation de la variable d'état
    const [contentLoaded, setContentLoaded] = useState('Loading');

    //utilisation de useEffect 
    useEffect(() => {
        const interval = setInterval(() => {
            if (contentLoaded === 'Loading...') {
                setContentLoaded('Loading');
            } else {
                setContentLoaded(contentLoaded + '.');
            }
        }, 400);

        return () => {
            clearInterval(interval);
        };
    }, [contentLoaded]);

    // retour du composant
    return (
        <div className="container_loading">
            <div className="load_info">
                <div className="text">
                    <h1>Reactify</h1>
                    <h3>
                        {contentLoaded}
                    </h3>
                </div>

                <div className="oval_container">
                    <div className="all_rond">
                        <div className="firstRond"></div>
                        <div className="secondRond"></div>
                        <div className="thirdRond"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}