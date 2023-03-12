import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Svg } from '.';

import '../../../assets/styles/components/shared/header.css';
import { Routes } from '../Routes';

export const Header = () => {

    const [toggle, setToggle] = useState(false);

    return (<nav id='main-nav'>
        <Link to='/'>
            <h3 onClick={() => setToggle(false)}>L<span>ouis </span>G<span>ODLEWSKI{toggle}</span></h3>
        </Link>
        <Svg src='ui' name='hamburger' styles={`hamburger is-primary ${toggle ? 'toggled' : ''}`} onClick={ () => setToggle(!toggle) }/>
        <ul className={`links ${toggle ? 'expanded' : ''}`}>
            {Object.values(Routes).map(({ name, url, exact }) =>
                <li key={`${name}-link`} onClick={() => setToggle(false)}>
                    <NavLink key={url + '-content' }exact={exact} to={url} activeClassName="selected">{name}</NavLink></li>)}
            <li><a href="mailto:louis.godlewski@gmail.com">Contact</a></li>
        </ul>
    </nav>);

}