import { memo } from 'react'
import style from './style.module.css'
import { IconButtonProps } from './interface'
export const IconButton = memo((props: IconButtonProps) => {
    const { src, alt, onClick, tooltip, type = 'button' } = props
    return (
        <button className={style.button} onClick={onClick} type={type}>
            <img src={src} alt={alt} />
            {tooltip && <div className={style.tooltip}>{tooltip}</div>}
        </button>
    )
})
