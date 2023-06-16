import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMessages = createAsyncThunk(
    'fetch/messages',
    async () => {
        const formData = new FormData()
        formData.append('actionName', 'MessagesLoad')
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
