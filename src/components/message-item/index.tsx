import React, { memo, useState, useRef, useEffect, forwardRef, LegacyRef } from 'react'
import style from './style.module.css'
import { PositionButton } from '../position-button'
import { MessageItemProps } from './interface'
import { IconButton } from '../icon-button'
import { UserInfo } from '../user-info'
import { getHoursAndMinutes } from '../../utils/get-hours-and-minutes'
import { Attachment } from '../attachment'

export const MessageItem = memo(forwardRef((props: MessageItemProps, ref: LegacyRef<HTMLDivElement>) => {
    const [hide, setHide] = useState(true)
    const [disabledButton, setDisabledButton] = useState(false)
    const [contentHeight, setContentHeight] = useState<number>()
    const contentRef = useRef(null)
    const thenRef = useRef(null)
    const maxLines = 3
    useEffect(() => {
        if (contentRef.current === null) {
            return
        }
        const hide = parseFloat(getComputedStyle(contentRef.current).height)
            > parseFloat(getComputedStyle(contentRef.current).lineHeight) * maxLines
        setContentHeight(parseFloat(getComputedStyle(contentRef.current).lineHeight) * maxLines)
        setHide(hide)
        setDisabledButton(!hide)
    }, [setHide])
    const {
        id,
        text,
        sources,
        tooltips,
        alts,
        username,
        comment,
        avatar,
        date,
        content,
        attachments,
        isLike,
        onSetLike,
        onDeleteLike,
        onReverseMessages,
        isNew
    } = props

    const callbacks = {
        onSetLike: (id: string) => onSetLike(id),
        onDeleteLike: (id: string) => onDeleteLike(id),
        onReverseMessages: () => onReverseMessages(),
        onHideContent: () => {
            if (contentRef.current === null) {
                return
            }
            if (disabledButton) {
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
        <section className={style.message} ref={ref}>
            <div className={style.block}>
                <UserInfo username={username} src={avatar} comment={comment} />
                <div className={style.buttons}>
                    <PositionButton text={text.left} />
                    <PositionButton text={text.center} />
                    <PositionButton text={text.right} />
                </div>
                <div className={style.icons}>
                    <IconButton src={sources.sendSrc} alt={alts.send} />
                    <IconButton
                        onClick={callbacks.onHideContent}
                        tooltip={tooltips.hide} src={sources.hideSrc} alt={alts.hide} />
                    <IconButton
                        onClick={callbacks.onReverseMessages}
                        tooltip={tooltips.settings} src={sources.settingsSrc} alt={alts.settings} />
                    {isLike
                        ? <IconButton
                            onClick={() => callbacks.onDeleteLike(id)}
                            src={sources.activeFavouriteSrc}
                            alt={alts.favourite}
                            tooltip={tooltips.notFavourite} />
                        : <IconButton
                            onClick={() => callbacks.onSetLike(id)}
                            src={sources.inactiveFavouriteSrc}
                            alt={alts.favourite}
                            tooltip={tooltips.favourite} />}
                </div>
            </div>
            <div className={style.wrapper}>
                <p className={style.date}>{getHoursAndMinutes(date)}</p>
                <div className={style.info}>
                    <div
                        ref={contentRef}
                        className={style.content}
                        style={{ height: hide ? contentHeight : 'max-content' }}>{content}</div>
                    {hide && <button
                        ref={thenRef} className={style.then} onClick={callbacks.onVisibleContent}>Далее</button>}
                    <Attachment id={id} attachments={attachments} />
                </div>
            </div>
            {isNew && <span className={style.tag}>#Новое</span>}
        </section>
    )
}))
