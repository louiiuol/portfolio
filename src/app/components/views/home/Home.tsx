import React from 'react';
import {Svg} from '../../shared/Svg';
import Typist from 'react-typist';

import '../../../../assets/styles/components/views/home/home.css';

export const Home = () =>
    <section id='home' className='main-container'>
        <div className="content">
            <Svg id='app-logo' src='socials' name='logo'/>
            <IntroWriter />
        </div>
    </section>

const IntroWriter = () => {
    const texts = ["Bienvenue",
        "Je suis un UI / UX Designer",
        "un concepteur d'application",
        "un développeur web fullstack Javascript, Java et MySQL",
    ]
    const final = "je suis disponible pour échanger sur vos projets et besoins";
    return (<h1 id='intro-typer'>
        <Typist avgTypingDelay={75} startDelay={100}>
            {texts.map((text, id) =>
                <span key={id} >{text} <Typist.Backspace count={text.length + 1} delay={1250} /></span> )}
            {final}
        </Typist>
    </h1>)
};