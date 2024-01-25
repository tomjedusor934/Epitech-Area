import './Accueil.css'

import React, { useState, useEffect } from 'react';

import Navbar from '../../components/navbar/Navbar';
import Dashboard from '../dashboard/dashboard';
import Responses from '../Responses/responses';
import Account from '../account/account';
import Create from '../create/create';
import Support from '../support/support';
import Load from '../../components/loading_container/loading_container';
import Create_area from '../create_new_area/create_area';
import Notification from '../notification/notification';
import MesApi from '../mesApi/mesApi';

export default function Accueil(props) {

    const [state, setState] = useState('dashboard');
    const [infoUser, setInfoUser] = useState();
    const [alreadyReceived, setAlreadyReceived] = useState(true);

    const [myArray, setMyArray] = useState([]);

    const editState = (newState) => {
        setState(newState);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        fetch('https://api.area.tal-web.com/user/infos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'username': localStorage.getItem('username')
            }
        })
            .then((response) => response.json())
            .then((response) => {
                setInfoUser(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const storedArray = localStorage.getItem('myArray');

        if (storedArray) {
            localStorage.removeItem('myArray');
            setMyArray([]);
        }
    }, [state]);

    // console.log(props);

    return (
        <div className='accueil_container'>
            <Load />
            {alreadyReceived == true ? (
                <Navbar state={state} editState={editState} nbNotif={props.nbNotif} />
            ) : null}
            <div className='accueil'>
                {
                    state === 'dashboard' ?
                        <Dashboard state={state} editState={editState} userInfo={infoUser} />
                        :
                        state === 'area' ?
                            <Responses state={state} editState={editState} userInfo={infoUser} />
                            :
                            state === 'account' ?
                                <Account userInfo={infoUser} />
                                :
                                state === 'create' ?
                                    <Create state={state} editState={editState} userInfo={infoUser} />
                                    :
                                    state === 'support' ?
                                        <Support userInfo={infoUser} />
                                        :
                                        state === 'create_area' ?
                                            <Create_area state={state} editState={editState} userInfo={infoUser} />
                                            :
                                            state === 'notif' ?
                                                <Notification state={state} editState={editState} userInfo={infoUser} />
                                                :
                                                state === 'api' ?
                                                    <MesApi state={state} editState={editState} userInfo={infoUser} />
                                                    :
                                                    <div>
                                                        <h1>Erreur 404</h1> 
                                                        <h2>Page introuvable</h2>
                                                    </div>
                }
            </div>
        </div>
    )
}