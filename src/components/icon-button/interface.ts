export interface IconButtonProps {
    src: string
    alt: string
    onClick: () => void
    type?: 'button' | 'submit' | 'reset'
}
