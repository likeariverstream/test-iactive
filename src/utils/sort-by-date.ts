import { Message } from '../store/feed/interfaces'

export const sortByDate = (array: Message[]) => {
    return array.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
