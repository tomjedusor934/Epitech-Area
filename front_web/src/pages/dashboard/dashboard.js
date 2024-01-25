import './dashboard.css'

import React, { useState, useEffect } from 'react';

import mobile from '../../media/mobile.jpg';
import video_fuild from '../../media/fluid.mp4';

import { AiOutlineInfoCircle } from 'react-icons/ai';

import ilu_1 from '../../media/ilu_1.jpg';
import ilu_2 from '../../media/ilu_2.jpg';
import ilu_3 from '../../media/ilu_3.jpg';

export default function Dashboard(props) {

    const [infoUser, setInfoUser] = useState(props.userInfo);
    const [percent, setPercent] = useState(70);

    return (
        <div className='accueil_content'>
            {
                props.userInfo ?
                    <div>
                        <div className='accueil_content_head'>
                            <h1>Dashboard</h1>
                        </div>

                        <div className='accueil_content_banner'>
                            <div className='accueil_content_left'>
                                <h1>Bienvenue sur Reactify {props.userInfo.name} !</h1>
                                <h2>
                                    Reactify, l'application qui vous permet de créer des vos propes A/rea et de les partager avec vos amis !
                                </h2>
                                <button
                                    onClick={() => props.editState('area')}
                                >
                                    Voir mes A/rea
                                </button>
                            </div>

                            <div className='accueil_content_right'>
                                <img src={mobile} alt='mobile' />
                            </div>
                        </div>

                        <div className='accueil_content_body'>
                            <div className='accueil_content_body_left'>
                                <video src={video_fuild} autoPlay loop muted />
                                <div className='content_body_left_accueil'>
                                    <h2>
                                        Utilisation
                                    </h2>
                                    <p>
                                        Nombre d'A/rea éffectué aujourd'hui
                                    </p>

                                    <h3>
                                        7/10
                                    </h3>

                                    <div className='barre'>
                                        <div className='remplissage'
                                            style={{
                                                width: `${percent}%`,
                                                backgroundColor: 'rgb(207, 207, 255)',
                                                height: '100%',
                                                borderRadius: 'inherit',
                                            }}
                                        >

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='accueil_content_body_right'>
                                <h1>
                                    Les meilleurs A/rea du jour
                                </h1>
                                <ul className='list_content_body_right'>
                                    <li className='list_content_body_right_item'>
                                        <img src={ilu_1} alt='ilu_1' />
                                        <h3>Jordan Bouvier</h3>
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
                                            Permet d'envoyer le message "Bon anniversaire" à tous vos contacts
                                            à partir du calendrier Google
                                        </p>
                                    </li>

                                    <li className='list_content_body_right_item'>
                                        <img src={ilu_2} alt='ilu_2' />
                                        <h3>Tom Dufour</h3>
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
                                            Recevez une notification quand
                                            vous recevez un mail important !
                                        </p>
                                    </li>

                                    <li className='list_content_body_right_item'>
                                        <img src={ilu_3} alt='ilu_3' />
                                        <h3>Jean Dupont</h3>
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
                                            Utilisez Binance pour recevoir
                                            une notification quand le Bitcoin
                                            atteint un certain prix !
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    :

                    <div className='accueil_content_head'>
                        <h1>chargement</h1>
                    </div>
            }
        </div>
    )
}