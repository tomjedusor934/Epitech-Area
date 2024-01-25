import './mesApi.css'

import React, { useState, useEffect } from 'react';

import minding from '../../media/minding.jpg';
import faq from '../../media/faq.jpg';

import { BsDiscord } from 'react-icons/bs';
import { RiTwitterXFill } from 'react-icons/ri';
import { AiOutlineGoogle } from 'react-icons/ai';
import { FaSpotify } from 'react-icons/fa';

export default function MesApi(props) {

    const [getInfoLogin, setInfoLogin] = useState([]);

    function connectTo(services) {
        fetch('https://api.area.tal-web.com/oauth/login/' + services, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.redirect_uri) {
                window.location.href = data.redirect_uri; // Redirige le navigateur vers l'URL de redirection
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const getConnectedOrNot = (name) => {
        let date = new Date();
        let dateNow = date.getTime();

        for (let i = 0; i < getInfoLogin.length; i++) {
            if (getInfoLogin[i].infos_for === name) {
                if (getInfoLogin[i].expires_in === null) {
                    return false;
                } else if (getInfoLogin[i].expires_in < dateNow) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    useEffect(() => {
        fetch(`https://api.area.tal-web.com/user/token_infos/${localStorage.getItem('id')}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setInfoLogin(data);
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);
    
    return (
        <div className='accueil_content'>
            <div className='accueil_content_head'>
                <h1>Mes Api</h1>
            </div>

            <div className='support_banner'>
                <div className='support_banner_left'>
                    <h1>
                        Voici la page de connexion à vos comptes
                    </h1>

                    <p
                        style={{
                            color: 'white',
                        }}
                    >
                        Vous pouvez vous connecter à vos comptes tel que Spotify, Deezer, Twitter, etc. Afin
                        de beneficier de A/rea plus personnalisé. Repondre automatiquement à des tweets, à
                        des messages discord ou encore ajouter un créneau dans votre agenda lorsque vous
                        ajoutez une musique à votre playlist et bien plus encore !
                    </p>
                </div>
            </div>

            <div className='api_container'>
                <h1>
                    Connexion:
                </h1>

                <div className='api_container_flex'>

                    <div className='api_container_list'>
                        <button onClick={() => connectTo('spotify')}>
                            <span className='spotify'>
                                <FaSpotify />
                            </span>
                            <h2>Spotify</h2>
                        </button>

                        <button onClick={() => connectTo('twitter')}>
                            <span className='X'>
                                <RiTwitterXFill />
                            </span>
                            <h2>Twitter</h2>
                        </button>

                        <button onClick={() => connectTo('discord')}>
                            <span className='discord'>
                                <BsDiscord />
                            </span>
                            <h2>Discord</h2>
                        </button>

                        <button onClick={() => connectTo('google')}>
                            <span className='gmail'>
                                <AiOutlineGoogle />
                            </span>
                            <h2>Google</h2>
                        </button>
                    </div>

                    <div className='api_container_list_right'>
                        <h1>
                            Etat de vos connexions:
                        </h1>

                        <div className='api_container_list_right_info'>
                            <div>
                                <span className='spotify'>
                                    <FaSpotify />
                                </span>

                                {getConnectedOrNot('spotify') ? (
                                    <h2>Connecté</h2>
                                ) : (
                                    <h2>Non connecté</h2>
                                )}
                            </div>

                            <div>
                                <span className='X'>
                                    <RiTwitterXFill />
                                </span>

                                {getConnectedOrNot('twitter') ? (
                                    <h2>Connecté</h2>
                                ) : (
                                    <h2>Non connecté</h2>
                                )}
                            </div>

                            <div>
                                <span className='discord'>
                                    <BsDiscord />
                                </span>
                                
                                {getConnectedOrNot('discord') ? (
                                    <h2>Connecté</h2>
                                ) : (
                                    <h2>Non connecté</h2>
                                )}
                            </div>

                            <div>
                                <span className='gmail'>
                                    <AiOutlineGoogle />
                                </span>
                                
                                {getConnectedOrNot('google') ? (
                                    <h2>Connecté</h2>
                                ) : (
                                    <h2>Non connecté</h2>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}