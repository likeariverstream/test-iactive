import React from 'react'
import style from './style.module.css'
import { IconButtonProps } from './interface'
export const IconButton = (props: IconButtonProps) => {
    const {src, alt, onClick} = props
    return (
        <button className={style.button} onClick={onClick}><img src={src} alt={alt} /></button>
    )
}
