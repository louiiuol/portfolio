import React from 'react';
import Isotope from 'isotope-layout';
import '../../../../assets/styles/components/views/works/project.css';

export const Projects = (props: any) => {
    var iso = new Isotope( '.grid', {
        itemSelector: '.grid-item',
        layoutMode: 'masonry'
    });
    return (
        
        <section>
            <div className="button-group filter-button-group">
            <button data-filter="*">show all</button>
            <button data-filter=".metal">metal</button>
            <button data-filter=".transition">transition</button>
            <button data-filter=".alkali, .alkaline-earth">alkali & alkaline-earth</button>
            <button data-filter=":not(.transition)">not transition</button>
            <button data-filter=".metal:not(.transition)">metal but not transition</button>
            </div>

            <section className="grid">
                <div className="grid-sizer"></div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
                <div className="grid-item">Hello</div>
            </section>
        </section>
        )
}