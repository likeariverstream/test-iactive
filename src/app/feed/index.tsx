import React, { useEffect, memo, useCallback, useMemo, useRef } from 'react'
import { fetchMessages, fetchNewMessages, fetchOldMessages } from '../../store/feed/actions'
import { useAppDispatch } from '../../hooks/use-app-dispatch'
import { useAppSelector } from '../../hooks/use-app-selector'
import { shallowEqual } from 'react-redux'
import { MessageItem } from '../../components/message-item'
import activeFavouriteSrc from '../../assets/icons/active-favourite-icon.svg'
import inactiveFavouriteSrc from '../../assets/icons/inactive-favourite-icon.svg'
import hideSrc from '../../assets/icons/hide-icon.svg'
import sendSrc from '../../assets/icons/send-icon.svg'
import settingsSrc from '../../assets/icons/settings-icon.svg'
import avatar from '../../assets/avatar.svg'
import { FeedLayout } from '../../components/feed-layout'
import { deleteLike, reverseMessages, setLike } from '../../store/feed/slice'
import { Spinner } from '../../components/spinner'

export const Feed = memo(() => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector((state) => state.feed.messages, shallowEqual)
    const loading = useAppSelector((state) => state.feed.loading, shallowEqual)
    const lastMessageId = useAppSelector((state) => state.feed.lastMessageId, shallowEqual)
    const loaderRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchNewMessages(lastMessageId))
        }, 5000)
        return () => clearInterval(interval)
    }, [dispatch, lastMessageId])

    useEffect(() => {
        dispatch(fetchMessages())
    }, [dispatch])

    useEffect(() => {
        const callback = () => {
            const { current } = loaderRef
            if (!current) {
                return
            }
            const { bottom } = current.getBoundingClientRect()
            if (bottom <= window.innerHeight) {
                dispatch(fetchOldMessages())
            }
        }
        window.addEventListener('scroll', callback)
        return () => window.removeEventListener('scroll', callback)
    }, [dispatch])
    const callbacks = {
        icons: {
            onSetLike: useCallback((id: string) => {
                dispatch(setLike(id))
            }, [dispatch]),
            onDeleteLike: useCallback((id: string) => {
                dispatch(deleteLike(id))
            }, [dispatch])
        },
        onReverseMessages: useCallback(() => dispatch(reverseMessages()), [dispatch]),
    }

    const options = useMemo(() => {
        return {
            icons: {
                sources: {
                    activeFavouriteSrc,
                    inactiveFavouriteSrc,
                    hideSrc,
                    sendSrc,
                    settingsSrc,
                },
                alts: {
                    favourite: 'Избранное',
                    hide: 'Скрыть',
                    send: 'Отправить',
                    settings: 'Настройки',
                },
                tooltips: {
                    hide: 'Свернуть сообщение',
                    settings: 'Изменить порядок сообщений',
                    favourite: 'Добавить в избранное',
                    notFavourite: 'Убрать из избранного'
                }
            },
            position: {
                text: {
                    left: 'Левый',
                    center: 'Центр',
                    right: 'Правый',
                }
            }
        }
    }, [])

    return (
        <Spinner active={loading}>
            <FeedLayout ref={loaderRef}>
                {messages.map((message) => {
                    return <MessageItem
                        id={message._id}
                        key={message._id}
                        text={options.position.text}
                        onSetLike={callbacks.icons.onSetLike}
                        onDeleteLike={callbacks.icons.onDeleteLike}
                        onReverseMessages={callbacks.onReverseMessages}
                        sources={options.icons.sources}
                        tooltips={options.icons.tooltips}
                        alts={options.icons.alts}
                        username={message.author}
                        avatar={avatar}
                        comment={message.channel}
                        date={message.date}
                        content={message.content}
                        attachments={message.attachments}
                        isLike={message.isLike}
                        isNew={message.isNew}
                    />
                })}
            </FeedLayout>
        </Spinner>
    )
})
