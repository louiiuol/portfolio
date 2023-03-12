import React from 'react';
import Typist from 'react-typist';

export const Typer = (props: {title: string}) =>
    (<Typist avgTypingDelay={60} startDelay={0}>{props.title}</Typist>)