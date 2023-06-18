export interface MessageItemProps {
    id: string
    onSetLike: (id: string) => void
    onDeleteLike: (id: string) => void
    text: Record<string, string>
    type?: 'button' | 'submit' | 'reset'
    sources: Record<string, string>
    tooltips: Record<string, string>
    alts: Record<string, string> 
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
    isNew?: boolean
    isLastMessage?: boolean
}
