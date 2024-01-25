import './learn_more.css';

import React from "react";
import { useEffect, useState, useRef } from "react";

import { AiOutlineCode, AiOutlineCodeSandbox } from 'react-icons/ai';
import { SiFsecure } from 'react-icons/si';

import Load from '../../components/loading_container/loading_container';
import videoBg from '../../media/background_area.mp4';
import woman_vr from '../../media/women-with-vr.png';

export default function LearnMore() {
    return (
        <div className="page_learn_more">
            <Load />
            <video src={videoBg} autoPlay loop muted />

            <div className="container_page_learn_more">
                <div className="left_container_learn_more">  
                    <div className="head_learn_more_bar">
                        <h1 className="title_main_page" onClick={() => {window.location.href = '/';}}>
                            Reactify
                        </h1>

                        <div className="right_log_reg">
                            <ul>
                                <li><a href='/login'>Login</a></li>
                                <li><a href='#'>Register</a></li>   
                            </ul>
                        </div>
                    </div>

                    <div className="flex_container_learn_more">
                        <div className="box_text_all_learn_banner">
                            <div className="gradient_text">
                                <h3>Learn more</h3>
                            </div>

                            <h2>
                                Create your own personalized responses and let Reactify do the rest!
                            </h2>

                            <p className="para_learn_more">
                                Reactify is a web and mobile application that allows you to create
                                personalized responses to incoming notifications. You can create
                                responses for any platform like Twitter, Discord or Gmail.
                            </p>

                            <div className="stats_container_learn_more">
                                <ul className="list_stats">
                                    <li className="item_stat">
                                        <span>
                                            <AiOutlineCode />
                                        </span>
                                        <p>
                                            Programable
                                        </p>
                                    </li>

                                    <li className="item_stat">
                                        <span>
                                            <SiFsecure />
                                        </span>
                                        <p>
                                            highly Secure
                                        </p>
                                    </li>

                                    <li className="item_stat">
                                        <span>
                                            <AiOutlineCodeSandbox />
                                        </span>
                                        <p>
                                            Lastest Technology
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="right_container_learn_more">
                            <img src={woman_vr} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}