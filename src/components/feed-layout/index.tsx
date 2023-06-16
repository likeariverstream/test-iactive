import React, { memo } from 'react'
import { FeedLayoutProps } from './interface'
import style from './style.module.css'
export const FeedLayout = memo(({ children } : FeedLayoutProps) => {

    return (
        <main className={style.main}>{children}</main>
    )
})
