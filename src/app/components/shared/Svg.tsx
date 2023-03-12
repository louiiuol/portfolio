import React, { useState, useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';

export const Svg = (props: {src: string, name: string, styles?: string, onClick?: any, id?: string}) => {

    const IconWrapper = (icon: any) => (<ReactSVG id={icon.id ? icon.id : ''} className={`icon-svg ${icon?.extra ? icon.extra : ''}`} src={icon.file} onClick={icon.onClick} />);
    const ImportedIconRef = useRef(null);
    const [loading, setLoading] = useState(false);
        useEffect(() => {
        setLoading(true);
        const importIcon = async () => {
            try {
                const { default: namedImport } = await import(`../../../assets/icons/${props.src}/${props.name}.svg`);
                ImportedIconRef.current = namedImport;
            } catch (err) {
                console.error(err);
                throw err;
            } finally {
                setLoading(false);
            }
        };
        importIcon();
        }, [props.name, props.src]);
        const { current: ImportedIcon } = ImportedIconRef;
    return !loading && ImportedIconRef.current ? <IconWrapper id={props.id} file={ImportedIcon} extra={props.styles} onClick={props.onClick} /> : null;

};