export interface Feed {
    Messages: Message[]
    likeImages: unknown[]
    dislikeImages: unknown[]
}

export interface Message {
    author: string
    content: string
    channel: string
    id: string
    date: string
    attachments: Attachment[]
    senderNumber: string
    region: string
}

export interface Attachment {
    type: string
    url: string
}
