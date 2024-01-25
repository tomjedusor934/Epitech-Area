import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { BiSolidDashboard, BiEdit, BiSolidSpreadsheet, BiSolidLayer, BiSolidInfoSquare, BiSolidBellRing, BiSolidUserAccount } from 'react-icons/bi';

export default function Navbar(props) {
    return (
        <div className='navbar'>
            <div className='navbar_container'>
                <h1>
                    Reactify
                </h1>

                <ul className='liste_global'>
                    <li className='item_lists'>
                        <h2 className='name_list'>Tools</h2>
                        <ul className='final_list'>
                            <li className={`item_lits_final ${props.state === 'dashboard' ? 'selected' : ''}`} onClick={() => props.editState('dashboard')}>
                                <div className={`icon_bi ${props.state === 'dashboard' ? 'selec_icon' : ''}`}>
                                    <BiSolidDashboard />
                                </div>

                                <h4>Dashboard</h4>
                            </li>

                            <li className={`item_lits_final ${props.state === 'area' ? 'selected' : ''}`} onClick={() => props.editState('area')}>
                                <div className={`icon_bi ${props.state === 'area' ? 'selec_icon' : ''}`}>
                                    <BiSolidSpreadsheet />
                                </div>

                                <h4>Mes A/Rea</h4>
                            </li>

                            <li className={`item_lits_final ${props.state === 'api' ? 'selected' : ''}`} onClick={() => props.editState('api')}>
                                <div className={`icon_bi ${props.state === 'api' ? 'selec_icon' : ''}`}>
                                    <BiSolidLayer />
                                </div>

                                <h4>Mes API</h4>
                            </li>

                            <li className={`item_lits_final ${props.state === 'create' ? 'selected' : ''}`} onClick={() => props.editState('create')}>
                                <div className={`icon_bi ${props.state === 'create' ? 'selec_icon' : ''}`}>
                                    <BiEdit />
                                </div>

                                <h4>Création</h4>
                            </li>
                        </ul>
                    </li>

                    <li className='item_lists'>
                        <h2 className='name_list2'>Other</h2>
                        <ul className='final_list'>
                            <li className={`item_lits_final ${props.state === 'notif' ? 'selected' : ''}`} onClick={() => props.editState('notif')}>
                                <div className={`icon_bi ${props.state === 'notif' ? 'selec_icon' : ''}`}>
                                    <BiSolidBellRing />
                                </div>


                                <div className='container_notifs'>
                                    <h4>Notification</h4>
                                    {
                                        props.nbNotif > 0 ?
                                            <h5
                                            style={{
                                                paddingTop: '7px',
                                            }}
                                            >
                                                {props.nbNotif > 99 ? '99+' : props.nbNotif}
                                            </h5>
                                        :
                                            ''
                                    }
                                </div>
                            </li>

                            <li className={`item_lits_final ${props.state === 'account' ? 'selected' : ''}`} onClick={() => props.editState('account')}>
                                <div className={`icon_bi ${props.state === 'account' ? 'selec_icon' : ''}`}>
                                    <BiSolidUserAccount />
                                </div>

                                <h4>Compte</h4>
                            </li>

                            <li className={`item_lits_final ${props.state === 'support' ? 'selected' : ''}`} onClick={() => props.editState('support')}>
                                <div className={`icon_bi ${props.state === 'support' ? 'selec_icon' : ''}`}>
                                    <BiSolidInfoSquare />
                                </div>

                                <h4>Support</h4>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}
