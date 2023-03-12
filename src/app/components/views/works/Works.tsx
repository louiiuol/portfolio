import React, { useEffect } from 'react';
import {Svg, Typer} from '../../shared';
import { Switch, Route, NavLink } from 'react-router-dom';

import '../../../../assets/styles/components/views/works/works.css';
import { Routes } from '../../Routes';

export const Works = () => {

    const routes = Object.assign(Routes)?.works?.routes;

    useEffect(() =>
        document.querySelectorAll('.quarter').forEach(quarter => {
            if (quarter.children[0].classList.contains('expanded')) { quarter.classList.add('full') }
            else if(quarter.classList.contains('full')) {quarter.classList.remove('full')}
        }))

    return (
        <section id='works' className='main-container'>
            {routes.map((route: any) =>
                <article key={route.url} className="quarter">
                    <NavLink exact={route.exact} activeClassName='expanded' to={`/projets/${route.url}`} >
                        <header>
                            <Typer title={route.name} />
                            <Svg src='skills' name={route.img} styles='category-icon is-white' />
                        </header>
                    </NavLink>
                    <Switch>
                        <Route key={route.url + '-content'} exact={route.exact} path={`/projets/${route.url}`} component={route.component} />
                    </Switch>
                </article> )}
        </section> );

}