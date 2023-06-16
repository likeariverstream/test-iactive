import { configureStore } from '@reduxjs/toolkit'
import { feedReducer } from './feed/slice'

export const store = configureStore({
    reducer: {
        feed: feedReducer
    }
})
