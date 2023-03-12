import React, { useState, useEffect } from 'react'
import { Img, Svg, QuarterContent } from '../../shared'

import works from '../../../../assets/json/works/graphism.json'
import '../../../../assets/styles/components/views/works/graphism.css';

export const Graphism = () => {

    const feed = [...works];

    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(feed[0]);
    const [isSelected, setIsSelected] = useState(false);

    const select = (currentIndex: number) => {
        const formatedIndex = currentIndex === -1 ? feed.length - 1 : (currentIndex === feed.length ? 0 : currentIndex);
        setIndex(formatedIndex );
        setSelected(feed[formatedIndex]);
        if (!isSelected) { setIsSelected(true) }
    }

    return (
        <QuarterContent id='graphism'>
            {feed.map((collection, current) =>
                <article key={current} className="graphic shadowed" onClick={() => select(current)}>
                    <Img src={`works/graphism/${collection.src}`} name={collection.content[0].src} alt={collection.name}/>
                    <h2>{collection.name}</h2>
                </article>
            )}
            {isSelected && (<section id="gallery-fullscreen">
                <ImgFullScreen collection={selected}>
                    <header>
                        <Svg src='ui' name='left' styles='nav prev' onClick={() => select(index - 1)} />
                        <h3>{selected.name}</h3>
                        <Svg src='ui' name='left' styles='nav next' onClick={() => select(index + 1)}/>
                    </header>
                </ImgFullScreen>
                <Svg src='ui' name='close' styles='close white' onClick={() => setIsSelected(false)} />
            </section> )}
        </QuarterContent>)

}

const ImgFullScreen = (props: any) => {

    const [index, setIndex] = useState(0);
    const select = (currentIndex: number) => {
        setIndex(currentIndex === -1 ? props.collection?.content.length - 1
            : (currentIndex === props.collection?.content.length ? 0 : currentIndex));
    }

    useEffect(() => {
        if (index > props.collection?.content.length - 1) { setIndex(0) }
    }, [props.collection, index])

    return props.collection?.content[index] ?
        (<section className="collection">
            {props.children}
            <div className="selected">
                <div className="wrapper">
                    <div className="header">
                        <h4>{props.collection?.content[index].name} (<em>{props.collection?.content[index].location}</em>)</h4>
                        <p className="description">{props.collection?.content[index].description}</p>
                    </div>
                    {props.collection?.content.length > 1 ? <div className="navbar">
                        <Svg src='ui' name='left' styles='nav prev' onClick={() => select(index - 1)} />
                        <Svg src='ui' name='left' styles='nav next' onClick={() => select(index + 1)} />
                    </div> : null}
                    <figure id='img-container'>
                        <Img id='featured' src={`works/graphism/${props.collection.src}`} name={props.collection?.content[index].src} alt={props.collection?.content[index].name} />
                    </figure>
                </div>
            </div>
        </section>) : null;

}