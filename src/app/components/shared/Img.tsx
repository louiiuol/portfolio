import React from 'react';

interface ImgInputs { src: string, name: string, type?: string, alt: string, styles?: string, size?: string, onClick?: any, id?: string }

export const Img = (el: ImgInputs) =>
    <img id={el.id} alt={el.alt} className={`${el.styles ? el.styles : ''} ${el?.size ? el.size : ''}`} onClick={el.onClick}
        src={`${process.env.PUBLIC_URL}/images/${el.src}/${el.name}${el.type ? `.${el.type}` : ''}`} />