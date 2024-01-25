import './account.css'

import React, { useState, useEffect } from 'react';

import test from '../../media/test.png';
import placeholder_woman from '../../media/placeholder_woman.jpg';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BiBuildingHouse, BiMailSend, BiPhone, BiEdit } from "react-icons/bi";

export default function Account(props) {

    const [infoUser, setInfoUser] = useState(props.userInfo);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        return `${day}/${month < 10 ? `0${month}` : month}/${year}`;
    }
      

    return (
        <div className='accueil_content'>
            <div className='accueil_content_head'>
                <h1>Mon compte</h1>
            </div>

            <div className='account_content_banner'>
                <div className='account_content_banner_top'>
                    <div className='account_content_banner_top_left'>
                        <img src={placeholder_woman} />
                        <h1>{infoUser.name + ' ' +  infoUser.surname}</h1>
                        <ul>
                            <li>
                                <span>
                                    <BiBuildingHouse />
                                </span>

                                <p>106 rue des marchés Nancy</p>
                            </li>

                            <li>
                                <span className='phone'>
                                    <BiPhone />
                                </span>
                                <p>+33 6 33 58 96 75</p>
                            </li>

                            <li>
                                <span>
                                    <BiMailSend />
                                </span>

                                <p>{infoUser.username}</p>
                            </li>
                        </ul>
                    </div>

                    <div className='account_content_banner_top_middle'>
                        <div className='banner_middle_head'>
                            <h1>Informations personnelles</h1>
                            <a href='/accueil'>
                                <BiEdit 
                                    style={{
                                        height: 40,
                                        width: 40,
                                    }}
                                />
                            </a>
                        </div>

                        <ul className='list_info_perso'>
                            <li>
                                <h2 className='grey'>Nom</h2>
                                <h2>{infoUser.name}</h2>
                            </li>

                            <li>
                                <h2 className='grey'>Prénom</h2>
                                <h2>{infoUser.surname}</h2>
                            </li>

                            <li>
                                <h2 className='grey'>Date de naissance</h2>
                                <h2>{formatDate(infoUser.birth_date)}</h2>
                            </li>

                            <li>
                                <h2 className='grey'>Genre</h2>
                                <h2>{infoUser.sexe}</h2>
                            </li>
                            
                            <li>
                                <h2 className='grey'>Mot de passe</h2>
                                <h2>**********</h2>
                            </li>

                        </ul>
                    </div>

                    <div className='account_content_banner_top_right'>
                        <h1>
                            Se déconnecter
                        </h1>

                        <p>
                            <AiOutlineInfoCircle
                                style={{
                                    height: 20,
                                    width: 20,
                                    position: 'relative',
                                    top: 4,
                                    marginRight: 10,
                                }}
                            />

                            Veuillez prendre note que lorsque vous vous déconnectez 
                            vos A/rea seront encore actives et vous recevrez un email
                            à chaque notification reçue sur Reactify.
                        </p>

                        <button
                            onClick={() => {
                                localStorage.removeItem('isLogged');
                                localStorage.removeItem('username');
                                localStorage.removeItem('token');
                                window.location.href = '/login';
                            }}
                        >
                            Déconexion
                        </button>
                    </div>
                </div>

                <div className='account_content_banner_bottom'>
                    <h1>
                        Utilisation des données
                    </h1>
                    <p>
                        Reactify vous permet de créer vos propres A/rea et de les partager, 
                        vos Informations personnelles sont importantes pour nous afin de vous proposer une expérience unique !
                        Elles ne seront jamais partagées à des tiers.
                        Rendez vous dans la section support afin de nous contacter si vous avez des questions ou
                        pour nous faire part de vos suggestions !
                    </p>
                </div>
            </div>
        </div>
    )
}