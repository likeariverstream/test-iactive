import React from 'react'
import style from './style.module.css'
import { AttachmentProps } from './interface'
import { getExtension } from '../../utils/get-extension'

export const Attachment = (props: AttachmentProps) => {
    const { attachments, id } = props
    return (
        <div className={style.container}>
            {attachments.map((item) => {
                if (item.type === 'video') {
                    return <video key={id} className={style.attachment} controls preload='metadata'>
                        <source src={item.url} type={`video/${getExtension(item.url)}`} />
                        Ваш браузер не поддерживает воспроизведение видео
                    </video>
                }
                if (item.type === 'image') {
                    return <img key={id} className={style.attachment} src={item.url} alt={item.type} />
                }
            })}
        </div>
    )
}
