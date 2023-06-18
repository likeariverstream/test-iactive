import { createAsyncThunk } from '@reduxjs/toolkit'
const url = import.meta.env.VITE_API_URL
export const fetchMessages = createAsyncThunk(
    'fetch/messages',
    async () => {
        const formData = new FormData()
        formData.append('actionName', 'MessagesLoad')
        formData.append('messageId', '0')
        try {
            const response = await fetch(url, {
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
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            })
            return response.json()
        } catch (e) {
            console.warn(e)
        }
    }
)

export const fetchOldMessages = createAsyncThunk(
    'fetch/oldMessages',
    async () => {
        const formData = new FormData()
        formData.append('actionName', 'MessagesLoad')
        // formData.append('messageId', messageId)
        formData.append('oldMessages', 'true')
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            })
            return response.json()
        } catch (e) {
            console.warn(e)
        }
    }
)
