import React from 'react';
import { Svg } from '.';
import { NavLink } from 'react-router-dom';

export const QuarterContent = (quarter: {id: string, children: any, styles?: string,}) =>
    (<section className="quarter-container">
        <NavLink className='close' to='/projets' >
            <Svg src='ui' name='close' />
        </NavLink>
        <section id={quarter.id} className={`quarter-content ${quarter.styles ? quarter.styles : ''}`}>
            {quarter.children}
        </section>
    </section>)
