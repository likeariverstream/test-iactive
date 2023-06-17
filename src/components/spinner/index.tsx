import React, { memo } from 'react'
import { SpinnerProps } from './interface'
import style from './style.module.css'
export const Spinner = memo(({ active, children }: SpinnerProps) => {

    return (
        active ? <div className={style.spinner}/> : <>{children}</>
    )
})
