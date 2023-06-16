import React from 'react'
import style from './style.module.css'
import { PositionButtonProps } from './interface'
export const PositionButton = (props: PositionButtonProps) => {
    const {text, onClick} = props
    return (
        <button className={style.button} onClick={onClick}>{text}</button>
    )
}
