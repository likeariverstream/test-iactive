import { createSlice } from '@reduxjs/toolkit'
import { fetchMessages, fetchNewMessages } from './actions'
import { Message } from './interfaces'
import { nanoid } from '@reduxjs/toolkit'

interface InitialState {
  messages: Message[]
  loading: boolean
  lastMessageId: string
}

const initialState: InitialState = {
  messages: [],
  loading: false,
  lastMessageId: ''
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setLike(state, action) {
      const element = state.messages.find((item) => item._id === action.payload)
      if (element) {
        element.isLike = true
        const likes = JSON.parse(localStorage.getItem('likes') ?? '{}')
        likes[action.payload] = true
        localStorage.setItem('likes', JSON.stringify(likes));
      }
    },
    deleteLike(state, action) {
      const element = state.messages.find((item) => item._id === action.payload)
      if (element) {
        element.isLike = false
        const likes = JSON.parse(localStorage.getItem('likes') ?? '{}')
        likes[action.payload] = false
        localStorage.setItem('likes', JSON.stringify(likes));
      }
    },
    reverseMessages(state) {
      state.messages = state.messages.reverse()
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      const likes = JSON.parse(localStorage.getItem('likes') ?? '{}')
      const modifiedMessages = action.payload.Messages.map((item: Message) => {
        if (item.id in likes) {
          return { ...item, isLike: true, _id: item.id }
        } else {
          return { ...item, isLike: false, _id: item.id }
        }
      })
      const sortedMessages = modifiedMessages.sort((a: Message, b: Message) => new Date(b.date).getTime() - new Date(a.date).getTime())
      state.messages = sortedMessages
      state.lastMessageId = sortedMessages[sortedMessages.length - 1].id
      state.loading = false
    })

    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchMessages.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(fetchNewMessages.fulfilled, (state, action) => {
        if (action.payload.Messages) {
          const modifiedMessages = action.payload.Messages.map((item: Message) => {
            return {...item, _id: nanoid()}
          })
          const sortedMessages = modifiedMessages.sort((a: Message, b: Message) => new Date(a.date).getTime() - new Date(b.date).getTime())
          state.messages = [...state.messages, ...sortedMessages]
          state.lastMessageId = sortedMessages[sortedMessages.length - 1].id
        }
    })
  },
})

export const { setLike, deleteLike, reverseMessages } = feedSlice.actions

export const feedReducer = feedSlice.reducer
