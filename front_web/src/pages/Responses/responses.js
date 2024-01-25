import './responses.css'

import React, { useState, useEffect } from 'react';

import { AiOutlineInfoCircle } from 'react-icons/ai';

import background_banner from '../../media/background_list_area.svg';

import icon_area1 from '../../media/area1.jpg';
import icon_area2 from '../../media/area2.jpg';
import icon_area3 from '../../media/area3.jpg';

import { SlOptionsVertical } from 'react-icons/sl';

import SwitchButton from '../../components/switchButton/switchButton';

export default function Responses(props) {

    const [tabBlockArea, setTabBlockArea] = useState([]);

    const icon_area = [
        {
            img: icon_area1
        },
        {
            img: icon_area2
        },
        {
            img: icon_area3
        }
    ];

    const [isChecked, setIsChecked] = useState(false);

    const handleSwitchChange = () => {
        setIsChecked(!isChecked);
    };

    const getRandomeIcon = () => {
        const randome = Math.floor(Math.random() * icon_area.length);
        const randomImage = icon_area[randome].img;
        return randomImage;
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        fetch(`https://api.area.tal-web.com/area/for/${localStorage.getItem('id')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then((response) => response.json())
            .then((response) => {
                setTabBlockArea(response);
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className='response_content'>
            <div className='response_content_head'>
                <h1>Mes A/rea</h1>
            </div>

            <div className='response_content_banner'>
                <div className='response_content_banner_left'>
                    <h1>
                        Retouvez ici toutes vos A/rea !
                    </h1>

                    <p>
                        Vous pouvez les modifier, les supprimer ou encore les partager,
                        Activez les ou désactivez les en un clic !
                        Vos A/rea vous seront utiles dans vos tâches quotidiennes, n'hésitez pas à connecter vos
                        compte tel que Discord, Gmail, Twitter et bien d'autres pour profiter pleinement de l'expérience Reactify !
                    </p>

                    <div className='bottom_content_banner'>

                        <div className='container_element_tab'>
                            <h1>
                                Mes A/rea
                            </h1>

                            <div className='space_area' />

                            {tabBlockArea.map((area, index) => {
                                return (
                                    <div key={index}>
                                        <li>
                                            <div className='bottom_content_banner_item_left'>
                                                <img src={getRandomeIcon()} alt='icon_area' />
                                            </div>

                                            <div className='bottom_content_banner_item_right'>
                                                <div className='top_right'>

                                                    <div className="App">
                                                        <SwitchButton isChecked={isChecked} onChange={handleSwitchChange} />
                                                    </div>

                                                    <SlOptionsVertical
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            position: 'relative',
                                                            top: 7,
                                                            marginRight: 10,
                                                            color: 'black',
                                                        }}
                                                    />
                                                </div>

                                                <div className='desc_item'>
                                                    <h1 className='title'>
                                                        Votre A/rea numéro {index + 1}
                                                    </h1>

                                                    <p>
                                                        Vous pouvez supprimer ou désactivez cette A/rea de votre compte Reactify.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                )

                            })}
                        </div>

                        {/* <ul>
                            <li>
                                <div className='bottom_content_banner_item_left'>
                                    <img src={getRandomeIcon()} alt='icon_area' />
                                </div>

                                <div className='bottom_content_banner_item_right'>
                                    <div className='top_right'>

                                        <div className="App">
                                            <SwitchButton isChecked={isChecked} onChange={handleSwitchChange} />
                                        </div>

                                        <SlOptionsVertical
                                            style={{
                                                height: 20,
                                                width: 20,
                                                position: 'relative',
                                                top: 7,
                                                marginRight: 10,
                                                color: 'black',
                                            }}
                                        />
                                    </div>

                                    <div className='desc_item'>
                                        <h1>
                                            A/rea 1
                                        </h1>

                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Quisquam, voluptas. Quisquam, voluptas.
                                        </p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className='bottom_content_banner_item_left'>
                                    <img src={getRandomeIcon()} alt='icon_area' />
                                </div>

                                <div className='bottom_content_banner_item_right'>
                                    <div className='top_right'>

                                        <div className="App">
                                            <SwitchButton isChecked={isChecked} onChange={handleSwitchChange} />
                                        </div>

                                        <SlOptionsVertical
                                            style={{
                                                height: 20,
                                                width: 20,
                                                position: 'relative',
                                                top: 7,
                                                marginRight: 10,
                                                color: 'black',
                                            }}
                                        />
                                    </div>

                                    <div className='desc_item'>
                                        <h1>
                                            Send mail
                                        </h1>

                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Quisquam, voluptas. Quisquam, voluptas.
                                        </p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className='bottom_content_banner_item_left'>
                                    <img src={getRandomeIcon()} alt='icon_area' />
                                </div>

                                <div className='bottom_content_banner_item_right'>
                                    <div className='top_right'>

                                        <div className="App">
                                            <SwitchButton isChecked={isChecked} onChange={handleSwitchChange} />
                                        </div>

                                        <SlOptionsVertical
                                            style={{
                                                height: 20,
                                                width: 20,
                                                position: 'relative',
                                                top: 7,
                                                marginRight: 10,
                                                color: 'black',
                                            }}
                                        />
                                    </div>

                                    <div className='desc_item'>
                                        <h1>
                                            Discord receive message
                                        </h1>

                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Quisquam, voluptas. Quisquam, voluptas.
                                        </p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className='bottom_content_banner_item_left'>
                                    <img src={getRandomeIcon()} alt='icon_area' />
                                </div>

                                <div className='bottom_content_banner_item_right'>
                                    <div className='top_right'>

                                        <div className="App">
                                            <SwitchButton isChecked={isChecked} onChange={handleSwitchChange} />
                                        </div>

                                        <SlOptionsVertical
                                            style={{
                                                height: 20,
                                                width: 20,
                                                position: 'relative',
                                                top: 7,
                                                marginRight: 10,
                                                color: 'black',
                                            }}
                                        />
                                    </div>

                                    <div className='desc_item'>
                                        <h1>
                                            Binance bot
                                        </h1>

                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Quisquam, voluptas. Quisquam, voluptas.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul> */}
                    </div>
                </div>

                <div className='response_content_banner_right'>
                    <img src={background_banner} alt='background_banner' />
                    <p className='top_background_banner'>
                        <AiOutlineInfoCircle
                            style={{
                                position: 'relative',
                                top: '10px',
                                marginRight: '10px',
                                height: '35px',
                                width: '35px',
                            }}
                        />
                        Créez vos propres A/rea !
                    </p>

                    <ul>
                        <li>
                            <h2>
                                - Connectez vos comptes !
                            </h2>
                        </li>

                        <li>
                            <h2>
                                - Pérsonnalisez vos A/rea !
                            </h2>
                        </li>

                        <li>
                            <h2>
                                - Connectez vos comptes !
                            </h2>
                        </li>
                    </ul>

                    <button
                        onClick={() => props.editState('create')}
                    >
                        Commencer !
                    </button>
                </div>
            </div>
        </div>
    )
}