import React from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import { Routes } from '../../Routes';

import '../../../../assets/styles/components/views/presentation/presentation.css';

export const Presentation = () => {

    const routes = Object.assign(Routes)?.presentation?.routes;

    return (
        <section id='presentation' className='main-container'>
            <ul className='sub-nav links'>
                {routes.map((route: any) =>
                    <li key={route?.url}>
                        <NavLink activeClassName="selected" to={`/presentation/${route?.url}`}>{route?.name}</NavLink>
                    </li>)}
            </ul>
            <Switch>
                {routes.map((route: any) =>
                    <Route key={route.url + '-content'} exact={route.exact} path={`/presentation/${route.url}`} component={route.component} />)}
            </Switch>
            <Redirect to='/presentation/profil'/>
        </section>);

}