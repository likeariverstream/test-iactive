import React, { memo, useState, useRef, useEffect } from 'react'
import style from './style.module.css'
import { PositionButton } from '../position-button'
import { MessageItemProps } from './interface'
import { IconButton } from '../icon-button'
import { UserInfo } from '../user-info'
import { getHoursAndMinutes } from '../../utils/get-hours-and-minutes'
import { Attachment } from '../attachment'

export const MessageItem = memo((props: MessageItemProps) => {
    const [hide, setHide] = useState(true)
    const [contentHeight, setContentHeight] = useState<number>()
    const contentRef = useRef(null)
    const maxLines = 3
    useEffect(() => {
        if (contentRef.current === null) {
            return
        }
        const hide = parseFloat(getComputedStyle(contentRef.current).height) > parseFloat(getComputedStyle(contentRef.current).lineHeight) * maxLines
        setContentHeight(parseFloat(getComputedStyle(contentRef.current).lineHeight) * maxLines)
        setHide(hide)
    }, [setHide])
    const {
        id,
        onClick,
        text,
        src,
        alt,
        username,
        comment,
        avatar,
        date,
        content,
        attachments,
        isLike,
        onSetLike,
        onDeleteLike,
        onReverseMessages
    } = props

    const callbacks = {
        onSetLike: (id: string) => onSetLike(id),
        onDeleteLike: (id: string) => onDeleteLike(id),
        onReverseMessages: () => onReverseMessages(),
        onHideContent: () => {
            if (contentRef.current === null) {
                return
            }
            if (!hide) {
                setHide(true)
            }
        },
        onVisibleContent: () => {
            if (contentRef.current === null) {
                return
            }
            setHide(false)
            setContentHeight(parseFloat(getComputedStyle(contentRef.current).height))
        }
    }

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
                    <IconButton onClick={onClick} src={src.sendSrc} alt={alt.send} />
                    <IconButton onClick={callbacks.onHideContent} src={src.hideSrc} alt={alt.hide} />
                    <IconButton onClick={callbacks.onReverseMessages} src={src.settingsSrc} alt={alt.settings} />
                    {isLike
                        ? <IconButton
                            onClick={() => callbacks.onDeleteLike(id)}
                            src={src.activeFavouriteSrc}
                            alt={alt.favourite} />
                        : <IconButton
                            onClick={() => callbacks.onSetLike(id)}
                            src={src.inactiveFavouriteSrc}
                            alt={alt.favourite} />}
                </div>
            </div>
            <p className={style.date}>{getHoursAndMinutes(date)}</p>
            <div ref={contentRef} className={style.content} style={{ height: hide ? contentHeight : 'max-content' }}>{content}</div>
            {hide && <button className={style.then} onClick={callbacks.onVisibleContent}>Далее</button>}
            <Attachment id={id} attachments={attachments} />
        </section>
    )
})
