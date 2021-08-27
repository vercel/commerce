import { RefObject, useEffect } from 'react'
import { MouseAndTouchEvent } from './types.utils'

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	callback: (event: MouseAndTouchEvent) => void
) {
	useEffect(() => {
		const listener = (event: MouseAndTouchEvent) => {
			const el = ref?.current

			// Do nothing if clicking ref's element or descendent elements
			if (!el || el.contains(event.target as Node)) {
				return
			}

			callback(event)
		}

		document.addEventListener(`mousedown`, listener)
		document.addEventListener(`touchstart`, listener)

		return () => {
			document.removeEventListener(`mousedown`, listener)
			document.removeEventListener(`touchstart`, listener)
		}

		// Reload only if ref or handler changes
	}, [ref, callback])
}
