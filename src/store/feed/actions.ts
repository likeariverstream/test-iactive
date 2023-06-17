import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMessages = createAsyncThunk(
    'fetch/messages',
    async () => {
        const formData = new FormData()
        formData.append('actionName', 'MessagesLoad')
        formData.append('messageId', '0')
        try {
            const response = await fetch('/api', {
                method: 'POST',
                body: formData,
            })
            return response.json()
        } catch (e) {
            console.warn(e)
        }
    }
)

export const fetchNewMessages = createAsyncThunk(
    'fetch/newMessages',
    async (messageId: string) => {
        const formData = new FormData()
        formData.append('actionName', 'MessagesLoad')
        formData.append('messageId', messageId)
        formData.append('oldMessages', 'false')
        try {
            const response = await fetch('/api', {
                method: 'POST',
                body: formData,
            })
            return response.json()
        } catch (e) {
            console.warn(e)
        }
    }
)
