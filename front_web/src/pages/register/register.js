import './register.css';

import React, { useState, useEffect } from 'react';

import Load from '../../components/loading_container/loading_container';
import videoBg from '../../media/background_area.mp4';

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPasswordIcon, setShowPasswordIcon] = useState(
        <AiOutlineEyeInvisible 
            style={{
                height: 35,
                width: 35,
            }}
        />
    );

    const [showPasswordIcon2, setShowPasswordIcon2] = useState(
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

    const modifyShowPassword2 = () => {
        setShowPassword2(!showPassword2);

        if (showPassword2) {
            setShowPasswordIcon2(<AiOutlineEyeInvisible
                style={{
                    height: 35,
                    width: 35,
                }}
            />);
        } else {
            setShowPasswordIcon2(<AiOutlineEye
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

    const handleSecondPassword = (e) => {
        setSecondPassword(e.target.value);
    }

    const checkRegister = () => {

        if (password !== secondPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        if (password.length === 0 || secondPassword.length === 0 || username.length === 0) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        fetch('https://api.area.tal-web.com/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (response.ok) {
                    alert('Compte créé avec succès !');
                    window.location.href = '/login';
                } else {
                    alert('Erreur lors de la création du compte');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

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
                    <h1>Register</h1>
                    <h3>
                        Bienvenue ! Veuillez vous inscrire pour accéder à votre compte.
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
                                <label htmlFor='password'>Mot de passe</label>
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
                                <label htmlFor='password'>Mot de passe à nouveau</label>
                                <div className='flex_password'>
                                    <input 
                                        type={showPassword2 ? 'text' : 'password'}
                                        id='password'
                                        placeholder='Enter password again'
                                        value={secondPassword}
                                        onChange={(e) => handleSecondPassword(e)}
                                    />
                                    <div
                                        className='show_password'
                                        onClick={() => modifyShowPassword2()}
                                    >
                                        {showPasswordIcon2}
                                    </div>
                                </div>
                            </div>

                            <div className='form_group'>
                                <button
                                    onClick={
                                        () => {
                                            checkRegister();
                                        }
                                    }
                                >
                                    Créer
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className='remember_forgot'>
                        <div className='forgot'>
                            <a href='/login'>Déjà un compte ?</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
