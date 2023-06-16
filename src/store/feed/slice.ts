import { createSlice } from '@reduxjs/toolkit'
import { fetchMessages } from './actions'

const initialState = {
    feed: []
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
          console.log(action.payload)
        })
      },
})

export const feedReducer = feedSlice.reducer
