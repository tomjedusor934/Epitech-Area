import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import GetStarted from './pages/get_started/get_started';
import LearnMore from './pages/learn_more/learn_more';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Accueil from './pages/accueil/Accueil';
import CreationAdmin from './pages/creationAdmin/creationAdmin'

// import Oauth2 from './pages/test_oaut2/oaut2';
import My_Api from './pages/api/api';
import MaPageAvecMusique from './pages/test_musique/test_musique';

export default function App() {

    const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'));
    const [infoUser, setInfoUser] = useState({});
    const [allNotif, setAllNotif] = useState([]);
    const [myId, setMyId] = useState('');
    const [alreadyReceived, setAlreadyReceived] = useState(false);
    const [receiveNotif, setReceiveNotif] = useState(false);
    const [nbNotif, setNbNotif] = useState(0);


    useEffect(() => {
        setIsLogged(localStorage.getItem('isLogged'));
    }, []);

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
                localStorage.setItem('id', response.id)
                setMyId(response.id);
                setAlreadyReceived(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         return;
    //     }

    //     if (myId !== '' && alreadyReceived === true) {
    //         const intervalId = setInterval(() => {
    //             fetch(`https://api.area.tal-web.com/notifications/${myId}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': localStorage.getItem('token'),
    //                 }
    //             })
    //                 .then((response) => response.json())
    //                 .then((response) => {
    //                     setAllNotif(response);
    //                     setNbNotif(response.length);
    //                     setReceiveNotif(true);
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                 });
    //         }, 1000);

    //         return () => {
    //             clearInterval(intervalId);
    //         };
    //     }
    // }, [myId, alreadyReceived]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {isLogged ? (
                        receiveNotif ? (
                            <Route path="/" element={<Accueil nbNotif={nbNotif} />} />
                        ) : (
                            <Route path="/" element={<Accueil nbNotif={0} />} />
                        )
                    ) : (
                        <Route path="/" element={<GetStarted />} />
                    )}
                    <Route path='/' element={<GetStarted />} />
                    <Route path='/learn_more' element={<LearnMore />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    {/* <Route path='/Oauth2' element={<Oauth2 />} /> */}
                    <Route path='/api' element={<My_Api />} />
                    <Route path='/creationAdmin' element={<CreationAdmin />} />
                    <Route path='/test_musique' element={<MaPageAvecMusique />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}