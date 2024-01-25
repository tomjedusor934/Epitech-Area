import './login.css';

import React, { useState, useEffect } from 'react';

import Load from '../../components/loading_container/loading_container';
import videoBg from '../../media/background_area.mp4';

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordIcon, setShowPasswordIcon] = useState(
        <AiOutlineEyeInvisible 
            style={{
                height: 35,
                width: 35,
            }}
        />
    );

    const modifyShowPassword = () => {
        setShowPassword(!showPassword);

        if (showPassword) {
            setShowPasswordIcon(<AiOutlineEyeInvisible
                style={{
                    height: 35,
                    width: 35,
                }}
            />);
        } else {
            setShowPasswordIcon(<AiOutlineEye
                style={{
                    height: 35,
                    width: 35,
                }}
            />);
        }
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const checkLogin = (e) => {
        e.preventDefault();
        fetch('https://api.area.tal-web.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            const xAccessToken = response.headers.get('x-access-token');
            console.log(xAccessToken);
    
            if (response.ok) {
                localStorage.setItem('username', username);
                localStorage.setItem("isLogged", true);
                localStorage.setItem("token", xAccessToken);
    
                window.location.href = '/';
            } else {
                console.log("Erreur lors de la connexion de l'utilisateur.");
            }
    
            if (response.status === 500) {
                console.log("Erreur lors de la connexion de l'utilisateur.");
            }
        })
        .catch(error => {
            console.log(error);
        });
    };
    

    return (
        <div className='login_container'>
            <Load />
            <div className="left_login">
                <video src={videoBg} autoPlay loop muted />
                <div className='blur'></div>
                <div className='top_left_login'>
                    <h1 onClick={() => {window.location.href = '/';}}>
                        Reactify
                    </h1>
                </div>
                <div className='on_video'>
                    <h1>
                        Welcome back!
                    </h1>
                </div>
            </div>

            <div className='right_container'>
                <div className='inside_container_right'>
                    <h1>Login</h1>
                    <h3>
                        Welcome back ! Please login to your account.
                    </h3>

                    <div className='form_login'>
                        <form>
                            <div className='form_group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    placeholder='ex: jean.françois@gmail.com'
                                    value={username}
                                    onChange={(e) => handleUsername(e)}
                                />
                            </div>

                            <div className='form_group'>
                                <label htmlFor='password'>Password</label>
                                <div className='flex_password'>
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={(e) => handlePassword(e)}
                                    />
                                    <div
                                        className='show_password'
                                        onClick={() => modifyShowPassword()}
                                    >
                                        {showPasswordIcon}
                                    </div>
                                </div>
                            </div>

                            <div className='form_group'>
                                <button
                                    onClick={
                                        (e) => {
                                            checkLogin(e);
                                        }
                                    }
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className='remember_forgot'>
                        <div className='remember'>
                            <input type='checkbox' id='remember' />
                            <label htmlFor='remember'>Remember me</label>
                        </div>

                        <div className='forgot'>
                            <a href='/register'>
                                Pas encore de compte ?
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
