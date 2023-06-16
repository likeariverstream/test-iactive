import { createSlice } from '@reduxjs/toolkit'
import { fetchMessages } from './actions'
import { Message } from './interfaces'

interface InitialState {
  messages: Message[]
}

const initialState: InitialState = {
    messages: []
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
          state.messages = action.payload.Messages
        })
      },
})

export const feedReducer = feedSlice.reducer
