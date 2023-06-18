export interface Feed {
    Messages: Message[]
    likeImages: unknown[]
    dislikeImages: unknown[]
}

export interface Message {
    _id: string
    author: string
    content: string
    channel: string
    id: string
    date: string
    attachments: Attachment[]
    senderNumber: string
    region: string
    isLike?: boolean
    isNew?: boolean
}

export interface Attachment {
    type: string
    url: string
}
