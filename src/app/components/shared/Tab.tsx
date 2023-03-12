import React from 'react';
import { Typer } from './Typer';

export const Tab = (tab: {title: string, id: string, children: any, styles?: string,}) =>
    (<section className="tab">
        <Typer title={tab.title} />
        <section id={tab.id} className={`content ${tab.styles ? tab.styles : ''}`}>
            {tab.children}
        </section>
    </section>)