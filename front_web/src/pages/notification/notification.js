import './notification.css';

import React, { useState, useEffect } from 'react';

import { BsTrash3 } from "react-icons/bs";
import { BsDiscord } from 'react-icons/bs';
import { BiLogoGmail } from 'react-icons/bi';
import { BsTwitter } from 'react-icons/bs';
import { BiSolidCustomize } from 'react-icons/bi';
import { GiDeathStar } from 'react-icons/gi';

import gmail from '../../media/gmail.png';

export default function Notification(props) {

    const [allNotif, setAllNotif] = useState([]);
    const [myId, setMyId] = useState(localStorage.getItem('id'));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
    }

    const deleteNotif = (id) => {
        fetch(`https://api.area.tal-web.com/deleteNotificationById`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({ id })
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setAllNotif(allNotif.filter(notif => notif.id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         window.location.href = '/login';
    //     }

    //     if (myId !== '') {
    //         const intervalId = setInterval(() => {
    //             fetch(`https://api.area.tal-web.com/notifications/${myId}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': localStorage.getItem('token'),
    //                 }
    //             })
    //                 .then((response) => response.json())
    //                 .then((response) => {
    //                     setAllNotif(response);
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                 });
    //         }, 1000);

    //         return () => {
    //             clearInterval(intervalId);
    //         };
    //     }
    // }, []);

    const sortNotif = (tab) => {
        if (tab.length <= 1) {
            return tab;
        }
    
        const pivot = tab[0].created_at;
        const less = [];
        const equal = [];
        const greater = [];
    
        for (const element of tab) {
            if (element.created_at < pivot) {
                less.push(element);
            } else if (element.created_at === pivot) {
                equal.push(element);
            } else {
                greater.push(element);
            }
        }
    
        return [...sortNotif(greater), ...equal, ...sortNotif(less)];
    };

    return (
        <div className='accueil_content'>
            <div className='accueil_content_head'>
                <h1>Notification</h1>
            </div>

            <div className='notification_banner'>
                <div className='notification_banner_left'>
                    <h1>
                        Retrouvez ici vos notifications !
                    </h1>
                </div>
            </div>

            <div className='content_notif'>
                {allNotif.length === 0 ? (
                    <div className='chargement'>
                        <h1>Chargement...</h1>
                    </div>
                ) : (
                    sortNotif(allNotif).map((notif, index) => {
                        return (
                            <div className='notif' key={index}>
                                {
                                    notif.title === 'Discord' ? (
                                        <span className='icon_info_notif n_discord'>
                                            <BsDiscord
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    position: 'relative',
                                                    top: 10,
                                                    left: 10,
                                                }}
                                            />
                                        </span>

                                    ) : notif.title === 'Gmail' ? (

                                        <span className='icon_info_notif n_gmail'>
                                            <img src={gmail}
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    position: 'relative',
                                                    top: 10,
                                                    left: 10,
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </span>

                                    ) : notif.title === 'Twitter' ? (

                                        <span className='icon_info_notif n_twitter'>
                                            <BsTwitter
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    position: 'relative',
                                                    top: 10,
                                                    left: 10,
                                                }}
                                            />
                                        </span>

                                    ) : notif.title === 'Warning' ? (

                                        <span className='icon_info_notif n_danger'>
                                            <GiDeathStar
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    position: 'relative',
                                                    top: 10,
                                                    left: 10,
                                                }}
                                            />
                                        </span>

                                    ) : (
                                        <span className='icon_info_notif n_custom'>
                                            <BiSolidCustomize
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    position: 'relative',
                                                    top: 10,
                                                    left: 10,
                                                }}
                                            />
                                        </span>
                                    )
                                }
                                <div className='notif_left'>
                                    <div className='notif_left_text'>
                                        <h1>{notif.title}</h1>
                                        <p>{notif.message}</p>
                                    </div>
                                </div>
                                <div className='notif_right'>
                                    <h1>{formatDate(notif.created_at)}</h1>
                                    <button
                                        className='btn_delete'
                                        onClick={() => deleteNotif(notif.id)}
                                    >
                                        <BsTrash3
                                            style={{
                                                position: 'relative',
                                                top: 3,
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}