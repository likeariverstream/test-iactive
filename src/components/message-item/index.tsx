import React, { memo } from 'react'
import style from './style.module.css'
import { PositionButton } from '../position-button'
import { MessageItemProps } from './interface'
import { IconButton } from '../icon-button'
import { UserInfo } from '../user-info'
import { getExtension } from '../../utils/get-extension'
import { getHoursAndMinutes } from '../../utils/get-hours-and-minutes'

export const MessageItem = memo((props: MessageItemProps) => {
    const {
        onClick,
        text,
        src,
        username,
        comment,
        avatar,
        date,
        content,
        attachments } = props
    return (
        <section className={style.message}>
            <div className={style.block}>
                <UserInfo username={username} src={avatar} comment={comment} />
                <div className={style.wrapper}>
                    <PositionButton onClick={onClick} text={text.left} />
                    <PositionButton onClick={onClick} text={text.center} />
                    <PositionButton onClick={onClick} text={text.right} />
                </div>
                <div className={style.wrapper}>
                    <IconButton onClick={onClick} src={src.sendSrc} alt='Избранное' />
                    <IconButton onClick={onClick} src={src.hideSrc} alt='Избранное' />
                    <IconButton onClick={onClick} src={src.settingsSrc} alt='Избранное' />
                    <IconButton onClick={onClick} src={src.inactiveFavouriteSrc} alt='Избранное' />
                </div>
            </div>
            <p className={style.date}>{getHoursAndMinutes(date)}</p>
            <div className={style.content}>{content}</div>
            {attachments.map((item) => {
                if (item.type === 'video') {
                    return <video className={style.attachment} controls preload='metadata'>
                        <source src={item.url} type={`video/${getExtension(item.url)}`} />
                        Ваш браузер не поддерживает воспроизведение видео
                    </video>
                }
                if (item.type === 'image') {
                    return <img className={style.attachment} src={item.url} alt={item.type} />
                }
            })}
        </section>
    )
})
