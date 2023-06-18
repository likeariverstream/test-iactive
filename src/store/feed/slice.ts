import { createSlice } from '@reduxjs/toolkit'
import { fetchMessages, fetchNewMessages, fetchOldMessages } from './actions'
import { Message } from './interfaces'
import { nanoid } from '@reduxjs/toolkit'
import { sortByDate } from '../../utils/sort-by-date'

interface InitialState {
  messages: Message[]
  loading: boolean
  lastMessageId: string
  isReversed: boolean
}

const initialState: InitialState = {
    messages: [],
    loading: false,
    lastMessageId: '',
    isReversed: false
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
                localStorage.setItem('likes', JSON.stringify(likes))
            }
        },
        deleteLike(state, action) {
            const element = state.messages.find((item) => item._id === action.payload)
            if (element) {
                element.isLike = false
                const likes = JSON.parse(localStorage.getItem('likes') ?? '{}')
                likes[action.payload] = false
                localStorage.setItem('likes', JSON.stringify(likes))
            }
        },
        reverseMessages(state) {
            state.isReversed = !state.isReversed
            state.messages = state.messages.reverse()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            const likes = JSON.parse(localStorage.getItem('likes') ?? '{}')
            const modifiedMessages = action.payload.Messages.map((item: Message) => {
                if (item.id in likes) {
                    return { ...item, isLike: true, _id: item.id, isNew: true }
                } else {
                    return { ...item, isLike: false, _id: item.id, isNew: true }
                }
            })
            const sortedMessages = sortByDate(modifiedMessages)
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
                    return { ...item, _id: nanoid(), isNew: true }
                })
                const sortedMessages = sortByDate(modifiedMessages)
                const modifiedOldMessages = state.messages.map((item) => ({ ...item, isNew: false }))
                state.messages = state.isReversed 
                    ? [...sortedMessages, ...modifiedOldMessages,] : [...modifiedOldMessages, ...sortedMessages]
                state.lastMessageId = sortedMessages[sortedMessages.length - 1].id
            }
        })
        builder.addCase(fetchOldMessages.fulfilled, (state, action) => {
            const likes = JSON.parse(localStorage.getItem('likes') ?? '{}')
            const modifiedMessages = action.payload.Messages.map((item: Message) => {
                if (item.id in likes) {
                    return { ...item, isLike: true, _id: item.id, isNew: false }
                } else {
                    return { ...item, isLike: false, _id: item.id, isNew: false }
                }
            })
            const sortedMessages = sortByDate(modifiedMessages)
            const newMessages = state.messages.filter((item) => item._id !== item.id)
            state.messages = [...sortedMessages, ...newMessages]
            state.lastMessageId = state.messages[state.messages.length - 1].id
        })
    },
})

export const { setLike, deleteLike, reverseMessages } = feedSlice.actions

export const feedReducer = feedSlice.reducer
