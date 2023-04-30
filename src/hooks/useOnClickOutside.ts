import React, { useEffect } from 'react'

type UseOnClickOutside = {
    ref: React.RefObject<HTMLDivElement>
    handler: (e?: (MouseEvent | TouchEvent)) => void
}
export function useOnClickOutside({ ref, handler }: UseOnClickOutside): void {
    useEffect(() => {
        const listener = (event: (MouseEvent | TouchEvent)): void => {
            if (!ref.current || ref?.current.contains(event.target  as Node)) {
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
