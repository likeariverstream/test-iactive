export const getExtension = (url: string) => {
    return url.split('.').pop()
}
