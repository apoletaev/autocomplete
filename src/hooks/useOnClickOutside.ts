import React, { useEffect } from 'react'

type UseOnClickOutside = {
    ref: React.RefObject<HTMLDivElement>
    handler: (e?: unknown) => void
}
export function useOnClickOutside({ ref, handler }: UseOnClickOutside): void {
    useEffect(() => {
        const listener = (event: any): void => {
            if (!ref.current || ref?.current.contains(event.target)) {
                return
            }

            handler(event)
        }

        document.addEventListener('mousedown', listener)

        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)

            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}
