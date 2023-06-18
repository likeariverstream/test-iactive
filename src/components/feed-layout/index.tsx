import React, { memo, forwardRef, LegacyRef } from 'react'
import { FeedLayoutProps } from './interface'
import style from './style.module.css'
export const FeedLayout = memo(forwardRef((props: FeedLayoutProps, ref: LegacyRef<HTMLDivElement>) => {
    const { children } = props
    return (
        <main className={style.main} ref={ref}>{children}</main>
    )
}))
