export interface MessageItemProps {
    id: string
    onSetLike: (id: string) => void
    onDeleteLike: (id: string) => void
    onClick: () => void
    text: Record<string, string>
    type?: 'button' | 'submit' | 'reset'
    src: Record<string, string>
    alt: Record<string, string>
    username: string
    comment?: string
    avatar: string
    date: string
    content: string
    attachments: {
        type: string
        url: string
    }[]
    isLike?: boolean
    onReverseMessages: () => void
}
