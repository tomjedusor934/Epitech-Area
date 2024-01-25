import './notifs.css';

import React, { useState, useEffect, useRef } from 'react';

import { FiTrash } from 'react-icons/fi';
import { BsDiscord } from 'react-icons/bs';
import { IoMdNotifications } from 'react-icons/io';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

export default function Notifs() {
    return (
        <div className="content_item">
            <div className='item_temp_meteo'>
                <span className='icon_temp notifs'>
                    <IoMdNotifications
                        style={{
                            height: 30,
                            width: 30,
                        }}
                    />
                </span>

                
                <div className='top_right_item'>
                    <h2>
                        Réaction
                    </h2>

                </div>

                <h1>
                    Notification
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
                    Recevoir une notification sur votre compte Reactify
                </p>
            </div>
        </div>
    );
}