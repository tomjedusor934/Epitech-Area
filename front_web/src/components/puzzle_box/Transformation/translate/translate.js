import './translate.css';

import React, { useState, useEffect, useRef } from 'react';

import { FiTrash } from 'react-icons/fi';
import { BsDiscord } from 'react-icons/bs';
import { MdGTranslate } from 'react-icons/md';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

export default function Translate() {
    const [selectedOptions, setSelectedOptions] = useState('');
    const [isLanguageSelected, setIsLanguageSelected] = useState(false);

    const handleSelectChange = (event) => {
        const newSelectedOption = event.target.value;
        setSelectedOptions(newSelectedOption);
        setIsLanguageSelected(true);

        // Récupérez le tableau myArray depuis le localStorage
        const storedArray = JSON.parse(localStorage.getItem('myArray'));

        // Parcourez le tableau pour trouver un objet avec name: "Translate" et langue vide
        const translateWithoutLang = storedArray.find(item => item.name === 'Translate' && item.langue === '');

        if (translateWithoutLang) {
            // Mettez à jour la langue de l'objet avec la nouvelle langue sélectionnée
            translateWithoutLang.langue = newSelectedOption;

            // Mettez à jour le tableau dans le localStorage
            localStorage.setItem('myArray', JSON.stringify(storedArray));
        } else {
            // Affichez une erreur si aucune entrée avec une langue vide n'est trouvée
            alert("Erreur : Impossible de trouver une langue vide pour la traduction.");
        }
    };

    return (
        <div className="content_item">
            <div className='item_temp_translate'>
                <span className='icon_temp translate'>
                    <MdGTranslate
                        style={{
                            height: 30,
                            width: 30,
                        }}
                    />
                </span>


                <div className='top_right_item'>
                    <h2>
                        Transformation
                    </h2>

                </div>

                <h1>
                    Traduction
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

                    Traduit le texte d'entré en la langue voulu. (Vous ne pouvez séléctionner la langue qu'une seule fois)
                </p>

                <select
                    onChange={handleSelectChange}
                    value={selectedOptions}
                    disabled={isLanguageSelected}
                >
                    <option value="">Sélectionnez une langue</option>
                    <option value="Fr">fr</option>
                    <option value="En">En</option>
                    <option value="Es">Es</option>
                    <option value="Ch">Ch</option>
                </select>
            </div>
        </div>
    );
}