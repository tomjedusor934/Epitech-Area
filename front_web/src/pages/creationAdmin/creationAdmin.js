import './creationAdmin.css';
import React from 'react';

import { useState, useEffect } from 'react';

function CreationAdmin() {

    const [specialParams, setSpecialParams] = useState('');
    const [showSpecialParams, setShowSpecialParams] = useState(false);

    const [transformation, setTransformation] = useState('');

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [nameArea, setNameArea] = useState('');
    const [descriptionArea, setDescriptionArea] = useState('');
    const [nbInput, setNbInput] = useState(0);
    const [commonType, setCommonType] = useState('');
    const [service, setService] = useState('');

    const [idAreaCreated, setIdAreaCreated] = useState(9);
    const [indexStep, setIndexStep] = useState(0);

    const [typeStep, setTypeStep] = useState('');

    const [finalTab, setFinalTab] = useState([]);

    //hooks pour chaque step
    const tabTypeRequete = [
        {
            id: 1,
            type: 'GET'
        },
        {
            id: 2,
            type: 'POST'
        },
        {
            id: 3,
            type: 'PUT'
        },
        {
            id: 4,
            type: 'DELETE'
        }
    ]

    const enumService = [
        {
            id: 1,
            type: 'google',
        },
        {
            id: 2,
            type: 'discord',
        },
        {
            id: 3,
            type: 'github',
        },
        {
            id: 4,
            type: 'twitter',
        },
        {
            id: 5,
            type: 'lol',
        },
        {
            id: 6,
            type: 'spotify',
        },
        {
            id: 7,
            type: 'nothing',
        },
    ]

    const [requestType, setRequestType] = useState("");
    const [url, setUrl] = useState("");
    const [header, setHeader] = useState("");
    const [body, setBody] = useState('');

    const [transformationFunction, setTransformationFunction] = useState("");
    const [transformationParam, setTransformationParam] = useState("");


    const tab = [
        {
            id: 1,
            type: 'action'
        },
        {
            id: 2,
            type: 'reaction'
        },
        {
            id: 3,
            type: 'transformation'
        }
    ]

    const addStep = () => {
        let tmpTab = [];

        let newBody = body.replace(/"/g, "'");
        let newParams = transformationParam.replace(/"/g, "'");

        if (typeStep === 'action' || typeStep === 'reaction') {
            if (requestType === '' || url === '') {
                alert('Please complete all fields');
                return;
            }

            let tmp = {
                area_id: idAreaCreated,
                step_nb: indexStep,
                type: typeStep,
                method: requestType,
                url: url,
                headers: header,
                body: body,
                transformation_function: transformationFunction,
                transformation_params: transformationParam
            }

            tmpTab.push(tmp);
        } else if (typeStep === 'transformation') {
            if (transformationFunction === '' || transformationParam === '') {
                alert('Please complete all fields');
                return;
            }

            let tmp = {
                area_id: idAreaCreated,
                step_nb: indexStep,
                type: typeStep,
                method: 'NOTHING',
                url: url,
                headers: header,
                body: newBody,
                transformation_function: transformationFunction,
                transformation_params: newParams
            }

            tmpTab.push(tmp);
        }

        console.log("tmpTab : ", tmpTab)
        
        setIndexStep(indexStep + 1);
        
        setFinalTab([...finalTab, ...tmpTab]);

        //set all hooks to empty
        setRequestType("");
        setUrl("");
        setHeader("");
        setBody("");
        setTransformationFunction("");
        setTransformationParam("");
        setTypeStep("");
    }

    const handleCreate = () => {
        if (nameArea === '' || descriptionArea === '' || commonType === '') {
            alert('Please complete all fields');
            return;
        }

        fetch('https://api.area.tal-web.com/area/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                name: nameArea,
                description: descriptionArea,
                nb_user_input: nbInput,
                common_type: commonType,
                service: service
            })
        })
            .then((response) => response.json())
            .then((response) => {
                console.log("response : ", response);
                if (response.id) {
                    setIdAreaCreated(response.id);
                }
                alert('Area created');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const createArea = () => {
        console.log("finalTab : ", finalTab)
        finalTab.forEach((step) => {
            fetch('https://api.area.tal-web.com/area/add_step', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(step)
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log("response : ", response);
                    alert('Step created');
                })
                .catch((error) => {
                    alert('Error watch console');
                    console.error(error);
                });
        });
    }

    useEffect(() => {
        fetch('https://api.area.tal-web.com/area/special_params', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setSpecialParams(response);
            })
            .catch((error) => {
                console.error(error);
            });

        fetch('https://api.area.tal-web.com/area/transformation_functions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setTransformation(response);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    return (
        <div>
            <h1>Creation</h1>

            <div className='firstStep'>
                <h2>1. Create a new user</h2>
                <p>
                    Please complete the following fields to create a new A/rea
                </p>
                <div className='inputs'>
                    <input type='text' value={nameArea} onChange={(e) => setNameArea(e.target.value)} placeholder='Name' />
                    <input type='text' value={descriptionArea} onChange={(e) => setDescriptionArea(e.target.value)} placeholder='Description' />
                    <input type='text' value={nbInput} onChange={(e) => setNbInput(e.target.value)} placeholder='Number of input' />
                    <label htmlFor='service'>Service</label>
                    <select name='service' id='service' onChange={(e) => setService(e.target.value)}>
                        <option value=''>--Please choose an option--</option>
                        {enumService.map((item) => (
                            <option value={item.type}>{item.type}</option>
                        ))}
                    </select>
                    <label htmlFor='type'>Type</label>
                    <select name='type' id='type' onChange={(e) => setCommonType(e.target.value)}>
                        <option value=''>--Please choose an option--</option>
                        {tab.map((item) => (
                            <option value={item.type}>{item.type}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={() => handleCreate()}
                >
                    Create
                </button>
            </div>

            <div className='secondStep'>
                <h2>2. Add a step</h2>
                <button
                    onClick={() => setShowSpecialParams(!showSpecialParams)}
                >
                    ?
                </button>

                {
                    showSpecialParams ?
                        <div className='special_params'>
                            <h3>Special params</h3>
                            {specialParams.map((item) => (
                                <div className='list_params'>
                                    <h4>name: {item.name}</h4>
                                    <p>description: {item.description}</p>
                                </div>
                            ))}
                        </div>
                        :
                        null
                }

                {
                    idAreaCreated !== '' ?
                        <div>
                            <p>
                                Please complete the following fields to add an action to the area
                            </p>

                            <label htmlFor='type'>Type</label>
                            <select name='type' id='type' value={typeStep} onChange={(e) => setTypeStep(e.target.value)}>
                                <option value=''>--Please choose an option--</option>
                                {tab.map((item) => (
                                    <option value={item.type}>{item.type}</option>
                                ))}
                            </select>

                            {
                                typeStep === 'action' || typeStep === 'reaction' ?
                                    <div>
                                        <label htmlFor='type'>Type</label>
                                        <select name='type' id='type' onChange={(e) => setRequestType(e.target.value)}>
                                            <option value=''>--Please choose an option--</option>
                                            {tabTypeRequete.map((item) => (
                                                <option value={item.type}>{item.type}</option>
                                            ))}
                                        </select>
                                        <h3>URL</h3>
                                        <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL' />
                                        <h3>Header</h3>
                                        <input type='text' value={header} onChange={(e) => setHeader(e.target.value)} placeholder='Header' />
                                        <h3>Body</h3>
                                        <textarea type='text' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Body' />

                                        <button
                                            onClick={() => addStep()}
                                        >
                                            Add step
                                        </button>
                                    </div>
                                    : typeStep === 'transformation' ?
                                        <div>
                                            <label htmlFor='type'>Type</label>
                                            <h3>Transformation function</h3>

                                            <select name='type' id='type' onChange={(e) => setTransformationFunction(e.target.value)}>
                                                <option value=''>--Please choose an option--</option>
                                                {transformation.map((item) => (
                                                    <option value={item.name}>{item.name}</option>
                                                ))}
                                            </select>

                                            <h3>Transformation params</h3>

                                            {
                                                transformationFunction !== '' ?
                                                    transformation.map((item) => (
                                                        item.name === transformationFunction ?
                                                            <div>
                                                                nombre de paramètres:
                                                                {item.nb_params}
                                                            </div>
                                                            :
                                                            null
                                                    ))
                                                    :
                                                    null
                                            }

                                            <input type='text' value={transformationParam} onChange={(e) => setTransformationParam(e.target.value)} placeholder='transformation params' />
                                            <button
                                                onClick={() => addStep()}
                                            >
                                                Add step
                                            </button>
                                        </div>
                                        :
                                        null
                            }
                        </div>
                        :
                        null
                }

            </div>

            <div className='thirdStep'>
                <h2>Your actual steps:</h2>
                <div className='steps'>
                    <h3>
                        Id area: {idAreaCreated}
                    </h3>
                    {
                        finalTab.map((item) => (
                            <div className='step'>
                                <h3>
                                    Step: {item.step_nb}
                                </h3>
                                <h4>
                                    Type: {item.type}
                                </h4>
                                <h4>
                                    Method: {item.method}
                                </h4>
                                <h4>
                                    URL: {item.url}
                                </h4>
                                <h4>
                                    Header: {item.headers}
                                </h4>
                                <h4>
                                    Body: {item.body}
                                </h4>
                                <h4>
                                    Transformation function: {item.transformation_function}
                                </h4>
                                <h4>
                                    Transformation params: {item.transformation_params}
                                </h4>
                            </div>
                        ))
                    }
                </div>
            </div>

            <button
                onClick={() => createArea()}
            >
                Create
            </button>
        </div>
    );
}

export default CreationAdmin;
