import React, { forwardRef, LegacyRef } from 'react'
import style from './style.module.css'

export const Loader = forwardRef((ref: LegacyRef<HTMLDivElement>) => {

    return (
        <div ref={ref} className={style.loader} />
    )
})
