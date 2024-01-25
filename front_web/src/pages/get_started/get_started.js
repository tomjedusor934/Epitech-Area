import './get_started.css';

import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { AiOutlineArrowRight } from 'react-icons/ai';

import Load from '../../components/loading_container/loading_container';

import iphone from '../../media/Iphone.png';
import videoBg from '../../media/background_area.mp4';

function GetStarted() {
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, 
            {
                max: 25,
                speed: 1400,
                glare: true,
                'max-glare': 0.5,
            }
        );
    }, []);

    return (
        <div className="App">
            <Load />
            <div className='background_main_page'>
                <video src={videoBg} autoPlay loop muted />
            </div>
            
            <div className='back_glass'></div>

            <div className='container_all'>
                <div className='container_log_reg'>
                    <ul>
                        <li><a href='/login'>Login</a></li>
                        <li><a href='#'>Register</a></li>   
                    </ul>
                </div>
            </div>

            <div className='container_left_get'>
                <div className='head_left_get'>
                    <h1 className='title_main_page'>Reactify</h1>
                    <h2 className='sub_title_main_page'>
                        Unleash the Power of Automated Responses!
                    </h2>
                </div>

                <div className='paragraphe_acroche'>
                    <p>
                    Feeling overwhelmed by constant notifications across different
                    platforms? Reactify is here to help you effortlessly manage incoming
                    actions and generate personalized responses.
                    </p>
                </div>

                <div className='flex_button_get_started'>
                    <div className='get_started'>
                        <div onClick={() => {window.location.href = '/login';}} className='get_started_a'>Get Started <span> <AiOutlineArrowRight /></span></div>
                    </div>

                    <div className='learn_more_button' onClick={() => {window.location.href = '/learn_more';}}>
                        <div className='learn_a'>learn more</div>
                    </div>
                </div>
            </div>

            <div className='container_right_get'>
                <img src={iphone} alt='iphone' ref={tilt} />
            </div>
            
        </div>
    );
}

export default GetStarted;
