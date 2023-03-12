import React from 'react';
import { Img, Svg, Tab } from '../../shared';

import '../../../../assets/styles/components/views/presentation/profil.css';

const links = [
    { name: 'linkedin', src: 'https://www.linkedin.com/in/louis-godlewski' },
    { name: 'codepen', src: 'https://codepen.io/louiiuol' },
    { name: 'github', src: 'https://github.com/louiiuol' },
    { name: 'codewars', src: 'https://www.codewars.com/users/louiiuol' },
    {name: 'flickr', src:'https://www.flickr.com/photos/l0u-g/'}
]

export const Profil = () =>
    (<Tab id='profil' title='Développeur Fullstack Javascript'>
        <AsideIntro />
        <Intro />
    </Tab>)

const AsideIntro = () =>
    (<aside id='intro-aside' className='animated'>
        <Img alt="Louis Godlewski's portrait" type='png' size='lg' src='intro' name='portrait' />
        <Socials />
    </aside>)

const Socials = () =>
    (<div className='socials is-white spaced'>
        <em className='centered'>Retrouvez moi sur les réseaux :</em>
        <ul className='links'> { links.map((social, id) => <SocialLink key={id} src={social.src} name={social.name} /> )} </ul>
    </div>)

const SocialLink = (social: { src: string, name: string }) =>
    (<li><a className='is-white' target='blank' href={social.src}><Svg src='socials' name={social.name} /></a></li>)

const Intro = () =>
    (<div id='intro'>
        <p className='legend-intro animated'>Passionné d'UX design et de structure de données, je suis un développeur web souhaitant contribuer à l'ensemble des étapes de construction d'un projet web, en fonction de vos besoins.</p>
        <ul className='list circle bolded animated'>
            <li>Création de composants graphiques comportant une logique d'affichage dédiée et réutilisable.</li>
            <li>Implémentation d'algorithmes et de services persistant la logique métier en base de données.</li>
            <li>Vérification du code via des tests d'intégration ou unitaire.</li>
            <li>Déploiement en continue des fonctionnalités via Github, Jenkins, AWS</li>
        </ul>
        <p className='outro animated'>
            <strong>Poste recherché</strong>: développeur full stack Javascript. <br />Si mon profil vous intéresse, n'hésitez pas à me contacter !
            </p>
    </div>)