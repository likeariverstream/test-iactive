import React, { memo } from 'react'
import style from './style.module.css'
import { PositionButtonProps } from './interface'
export const PositionButton = memo((props: PositionButtonProps) => {
    const { text, onClick, type = 'button' } = props
    return (
        <button className={style.button} onClick={onClick} type={type}>{text}</button>
    )
})
