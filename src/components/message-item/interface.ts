export interface MessageItemProps {
    onClick: () => void
    text: Record<string, string>
    type?: 'button' | 'submit' | 'reset'
    src: Record<string, string>
    username: string
    comment?: string
    avatar: string
    date: string
    content: string
    attachments: {
        type: string
        url: string
    }[]
}
