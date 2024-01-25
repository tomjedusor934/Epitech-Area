import './create.css';

import react, { useEffect, useState } from 'react';

import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';
import { BiLogoGmail } from 'react-icons/bi';
import { BsTwitter } from 'react-icons/bs';
import { BiSolidCustomize } from 'react-icons/bi';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

import guys_create from '../../media/guys_create.jpg';
import gmail from '../../media/gmail.png';

export default function Create(props) {
    return (
        <div className='create_content'>
            <div className='accueil_content_head'>
                <h1>Créez votre A/rea</h1>
            </div>

            <div className='create_content_banner'>
                <div className='create_content_banner_head'>
                    <span className='logo_info'>
                        <AiOutlineInfoCircle
                            style={{
                                height: 30,
                                width: 30,
                            }}
                        />
                    </span>
                    <h2 className='create_content_banner_title'>
                        Utilisez un système de blueprint afin de créez vos propes A/rea, choissisez les actions que vous souhaitez et 
                        liez les aux réactions que vous voulez.
                    </h2>
                </div>
                
                <div className='create_content_banner_body'>
                    <ul className='content_choose_temp'>
                        <li className='item_temp'>
                            <span className='icon_temp discord'>
                                <BsDiscord
                                    style={{
                                        height: 30,
                                        width: 30,
                                    }}
                                />
                            </span>
                            <h1>
                                Discord
                            </h1>
                            <p>
                                <span className='icon_info'>
                                    <AiOutlineInfoCircle
                                        style={{
                                            height: 20,
                                            width: 20,
                                        }}
                                    />
                                </span>
                                Créez votre A/rea avec un modèle pré-défini
                                adapté à votre utilisation de Discord.
                            </p>

                            <div className='bottom_item'>
                                <div className='bottom_item_left'>
                                    90% des utilisateurs sont satisfaits de ce modèle.
                                </div>

                                <div className='bottom_item_right'>
                                    <div className='like'>
                                        <AiFillLike
                                            style={{
                                                height: 30,
                                                width: 30,
                                            }}
                                        />
                                    </div>

                                    <div className='disklike'>
                                        <AiFillDislike
                                            style={{
                                                height: 30,
                                                width: 30,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className='item_temp'>
                            <span className='icon_temp gmail'>
                                <img src={gmail}
                                    style={{
                                        height: 20,
                                        width: 30,
                                        objectFit: 'cover',
                                    }}
                                />
                            </span>
                            <h1>
                                Gmail
                            </h1>

                            <p>
                                <span className='icon_info'>
                                    <AiOutlineInfoCircle
                                        style={{
                                            height: 20,
                                            width: 20,
                                        }}
                                    />
                                </span>
                                Créez votre A/rea avec un modèle pré-défini
                                adapté à votre utilisation de Gmail.
                            </p>

                            <div className='bottom_item'>
                                <div className='bottom_item_left'>
                                    90% des utilisateurs sont satisfaits de ce modèle.
                                </div>

                                <div className='bottom_item_right'>
                                    <div className='like'>
                                        <AiFillLike
                                            style={{
                                                height: 30,
                                                width: 30,
                                            }}
                                        />
                                    </div>

                                    <div className='disklike'>
                                        <AiFillDislike
                                            style={{
                                                height: 30,
                                                width: 30,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className='item_temp'>
                            <span className='icon_temp twitter'>
                                <BsTwitter
                                    style={{
                                        height: 30,
                                        width: 30,
                                    }}
                                />
                            </span>
                            <h1>
                                Twitter
                            </h1>

                            <p>
                                <span className='icon_info'>
                                    <AiOutlineInfoCircle
                                        style={{
                                            height: 20,
                                            width: 20,
                                        }}
                                    />
                                </span>
                                Créez votre A/rea avec un modèle pré-défini
                                adapté à votre utilisation de Twitter.
                            </p>

                            <div className='bottom_item'>
                                <div className='bottom_item_left'>
                                    90% des utilisateurs sont satisfaits de ce modèle.
                                </div>

                                <div className='bottom_item_right'>
                                    <div className='like'>
                                        <AiFillLike
                                            style={{
                                                height: 30,
                                                width: 30,
                                            }}
                                        />
                                    </div>

                                    <div className='disklike'>
                                        <AiFillDislike
                                            style={{
                                                height: 30,
                                                width: 30,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className='item_temp' onClick={
                            () => props.editState('create_area')
                        }>
                            <span className='icon_temp custom'>
                                <BiSolidCustomize
                                    style={{
                                        height: 30,
                                        width: 30,
                                    }}
                                />
                            </span>
                            <h1>
                                Custom
                            </h1>

                            <p>
                                <span className='icon_info'>
                                    <AiOutlineInfoCircle
                                        style={{
                                            height: 20,
                                            width: 20,
                                        }}
                                    />
                                </span>
                                Pas de modèle pré-défini
                                et choissisez vos actions et réactions pour une
                                utilisation personnalisée.
                            </p>

                            <div className='bottom_item'>
                                <div className='bottom_item_left'>
                                    90% des utilisateurs sont satisfaits de ce modèle.
                                </div>

                                <div className='bottom_item_right'>
                                    <div className='like'>
                                        <AiFillLike
                                            style={{
                                                height: 30,
                                                width: 30,
                                            }}
                                        />
                                    </div>

                                    <div className='disklike'>
                                        <AiFillDislike
                                            style={{
                                                height: 30,
                                                width: 30,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className='create_content_banner_footer'>
                    <div className='create_content_banner_footer_left'>
                        <div className='title'>
                            <h1>Comment créer une A/rea ?</h1>
                        </div>
                        
                        <h2>
                            Une A/rea vous permet de lier des actions à des réactions, par exemple, si vous recevez un mail de votre banque, vous pouvez
                            automatiquement envoyer un mail à votre comptable.
                            Importez vos différents comptes dans l'onglet "Mes API",
                            Vous aurez ainsi accès aux modules liés à vos comptes, tel que discord, gmail etc...

                        </h2>
                    </div>

                    <div className='create_content_banner_footer_right'>
                        <img src={guys_create} />
                    </div>
                </div>

            </div>
        </div>
    )
}