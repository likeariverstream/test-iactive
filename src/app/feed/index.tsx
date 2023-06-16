import React, { useEffect, memo, useCallback, useMemo } from 'react'
import { fetchMessages } from '../../store/feed/actions'
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

export const Feed = memo(() => {
  const dispatch = useAppDispatch()
  const messages = useAppSelector((state) => state.feed.messages, shallowEqual)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchMessages())
    }, 5000);
    return () => clearInterval(interval)
  }, [dispatch]);
  const callbacks = {
    onClick: useCallback(() => true, [])
  }
  const options = useMemo(() => {
    return {
      icon: {
        sources: {
          activeFavouriteSrc,
          inactiveFavouriteSrc,
          hideSrc,
          sendSrc,
          settingsSrc,
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
    <FeedLayout>
      {messages.map((message) => {
        return <MessageItem
          key={message.id}
          text={options.position.text}
          onClick={callbacks.onClick}
          src={options.icon.sources}
          username={message.author}
          avatar={avatar}
          comment={message.channel}
          date={message.date}
          content={message.content}
          attachments={message.attachments}
        />
      })}
    </FeedLayout>
  )
})
