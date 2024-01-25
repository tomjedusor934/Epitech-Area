import './support.css'

import React, { useState, useEffect } from 'react';

import minding from '../../media/minding.jpg';
import faq from '../../media/faq.jpg';

export default function Support(props) {
    return (
        <div className='accueil_content'>
            <div className='accueil_content_head'>
                <h1>Support</h1>
            </div>

            <div className='support_banner'>
                <div className='support_banner_left'>
                    <h1>
                        Bienvenue sur la page de support de Reactify !
                    </h1>

                    <p
                        style={{
                            color: 'white',
                        }}
                    >
                        Vous pouvez retrouver ici toutes les informations en lien avec le fonctionnement
                        de l'application Reactify. Mais également la possibilité de nous contacter en cas
                        de problème ou de question. Nous vous répondrons dans les plus brefs délais.
                    </p>
                </div>
            </div>

            <div className='support_content'>
                <div className='head_support'>
                    <div className='left_head_support'>
                        <h1>
                            Laissez Reactify s'en occuper
                        </h1>

                        <p>
                            Avec Reactify, vous n'avez pas à vous soucier de vos 
                            rendez-vous ou des anniversaires de vos proches.
                            Nous nous occupons d'envoyer des notifications pour vous !
                        </p>
                    </div>

                    <div className='right_head_support'>
                        <div className='semi_bottom'>
                            <h1>
                                Contactez le support !
                            </h1>

                            <p>
                                Vous avez une question ? Un problème ? N'hésitez pas à nous contacter.
                                Vous pouvez également nous contacter pour nous faire part de vos suggestions
                                d'amélioration et pour nous faire part de vos retours.
                            </p>
                        
                            <a href='mailto:exemple@gmail.com'>
                                Nous contacter
                            </a>
                        </div>

                        <div className='semi_head'>
                            <h1>
                                Profitez de votre temps libre !
                            </h1>

                            <p>
                                Créez une A/rea pour gérer les rendez-vous de votre entreprise.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}