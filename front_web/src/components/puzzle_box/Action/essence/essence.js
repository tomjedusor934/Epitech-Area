import './essence.css';

import React, { useState, useEffect, useRef } from 'react';

import { FiTrash } from 'react-icons/fi';
import { BsDiscord } from 'react-icons/bs';
import { AiFillCar } from 'react-icons/ai';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

export default function Essence() {
    return (
        <div className="content_item">
            <div className='item_temp_meteo'>
                <span className='icon_temp essence'>
                    <AiFillCar
                        style={{
                            height: 30,
                            width: 30,
                        }}
                    />
                </span>

                
                <div className='top_right_item'>
                    <h2>
                        Action
                    </h2>

                </div>

                <h1>
                    Essence
                </h1>
                <p>
                    <span className='icon_info'>
                        <AiOutlineInfoCircle
                            style={{
                                height: 20,
                                width: 20,
                                position: 'relative',
                                top: 3,
                            }}
                        />
                    </span>
                    Envoie les stations essence dans les 10km avec les meilleurs prix
                </p>
            </div>
        </div>
    );
}