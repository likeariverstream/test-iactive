import React, { memo } from "react";
import style from './style.module.css'
import { UserInfoProps } from "./interface";

export const UserInfo = memo((props: UserInfoProps) => {
    const { username, comment, src } = props
    return (
        <section className={style.section}>
            <img className={style.image} src={src} alt='Аватар' />
            <div className={style.wrapper}>
                <h4 className={style.username}>{username}</h4>
                <p className={style.comment}>{comment}</p>
            </div>
        </section>
    )
})
