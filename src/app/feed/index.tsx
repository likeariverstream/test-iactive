import React, { useEffect } from 'react'
import { fetchMessages } from '../../store/feed/actions'
import { useAppDispatch } from '../../hooks/use-app-dispatch'
export const Feed = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const interval = setInterval(() => {
          dispatch(fetchMessages())
        }, 5000);
        return () => clearInterval(interval)
      }, [dispatch]);

    return (
        <></>
    )
}
