import './basic_reaction.css';

import React, { useState, useEffect, useRef } from 'react';

import { FiTrash } from 'react-icons/fi';
import { BsDiscord } from 'react-icons/bs';
import { AiFillCar } from 'react-icons/ai';
import { AiOutlinePlusCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BiSolidCustomize } from 'react-icons/bi';

export default function Basic_reaction(props) {
    const [params, setParams] = useState([]);
    const [Valider, setValider] = useState(false);

    useEffect(() => {
        let tabParams = [];
        for (let i = 0; i < props.nb_params; i++) {
            tabParams.push("");
        }
        setParams(tabParams);
    }, [props.nb_params]);

    const handleInputChange = (index, event) => {
        const values = [...params];
        values[index] = event.target.value;
        setParams(values);
    };

    const validateParams = () => {
        const storedArray = JSON.parse(localStorage.getItem('myArray'));

        for (let i = 0; i < storedArray.length; i++) {
            if (storedArray[i].id == props.id_node) {
                storedArray[i].params = params;
                break;
            }
        }

        localStorage.setItem('myArray', JSON.stringify(storedArray));
        setValider(true);
    }

    return (
        <div className="content_item">
            <div className='item_temp_meteo'>
                <span className='icon_temp discord'>
                    <BiSolidCustomize
                        style={{
                            height: 30,
                            width: 30,
                        }}
                    />
                </span>


                <div className='top_right_item'>
                    <h2>
                        Reaction
                    </h2>

                </div>

                <h1>
                    {props.name}
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
                    {props.description}
                </p>

                {params.map((param, index) => (
                    <input
                        key={index}
                        type="text"
                        value={param}
                        onChange={event => handleInputChange(index, event)}
                        disabled={Valider}
                    />
                ))}

                {
                    props.nb_params != 0 ?
                        <button
                            className="btn_validate"
                            onClick={() => validateParams()}
                        >
                            Valider
                        </button>
                        :
                        <div></div>
                }
            </div>
        </div>
    );
}