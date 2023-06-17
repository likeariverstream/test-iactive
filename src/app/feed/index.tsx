import React, { useEffect, memo, useCallback, useMemo } from 'react'
import { fetchMessages, fetchNewMessages } from '../../store/feed/actions'
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
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchNewMessages(lastMessageId))
    }, 5000);
    return () => clearInterval(interval)
  }, [dispatch, lastMessageId])
  useEffect(() => {
    dispatch(fetchMessages())
  }, [])

  const callbacks = {
    icon: {
      onSetLike: useCallback((id: string) => {
        dispatch(setLike(id))
      }, [dispatch]),
      onDeleteLike: useCallback((id: string) => {
        dispatch(deleteLike(id))
      }, [dispatch])
    },
    onReverseMessages: useCallback(() => dispatch(reverseMessages()), [messages]),
    onClick: useCallback(() => true, [])
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
      <FeedLayout>
        {messages.map((message) => {
          console.log(message.date)
          return <MessageItem
            id={message._id}
            key={message._id}
            text={options.position.text}
            onSetLike={callbacks.icon.onSetLike}
            onDeleteLike={callbacks.icon.onDeleteLike}
            onReverseMessages={callbacks.onReverseMessages}
            onClick={callbacks.onClick}
            src={options.icons.sources}
            alt={options.icons.alts}
            username={message.author}
            avatar={avatar}
            comment={message.channel}
            date={message.date}
            content={message.content}
            attachments={message.attachments}
            isLike={message.isLike}
          />
        })}
      </FeedLayout>
    </Spinner>
  )
})
