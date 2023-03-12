import React from 'react';
import { Link, Route, useParams, Redirect, useLocation } from 'react-router-dom';
import { Img, QuarterContent } from '../../shared';

import videos from '../../../../assets/json/works/videos.json';
import '../../../../assets/styles/components/views/works/videos.css';

const feed = [...videos];

export const Videos = () =>{
    const location = useLocation().pathname.split('/');
    let id = location.splice(location.length - 1, 1)[0];
    return feed ? (<QuarterContent id='videos-container'>
        <Route path={`/projets/audiovisuel/:id`} component={Player} />
        <section className="next">
            {feed.map((collection, index) =>
                    <article key={index + '-collection'} className="collection-preview">
                        <h3>{collection.name}</h3>
                        <div className="covers">
                            {collection.content.map((video, indexx) => {
                                return video.src !== id ? <Link key={indexx + '-link'} to={`/projets/audiovisuel/${video.src}`}>
                                    <div className="cover" >
                                        <Img src='works/videos-covers' name={video.cover} alt={video.name} />
                                        <div className="preview-infos">
                                            <p className='is-primary'>{video.name}</p>
                                            <em>{video.date}</em>
                                        </div>
                                    </div>
                                </Link> : null })}
                        </div>
                    </article> )}
        </section>
        <Redirect to={'/projets/audiovisuel/' + feed[0].content[0].src}/>
    </QuarterContent>) : null;
}

const Player = () => {
    const { id } = useParams();
    const video = feed.map(col => col.content.find(vid => vid.src === id)).filter(table => !!table)[0];
    return video ? (
    <section className="video-details">
        <iframe title={video.name} key={video?.src} src={`https://www.youtube.com/embed/${video.src}`}></iframe>
        <div className="infos">
            <h3 className='is-primary'>{video.name} - <strong>{video.date}</strong></h3>
            <p>{video.description.map((desc: string, index: number) => <span key={index}>{desc}</span>)}</p>
        </div>
    </section>) : null;
}