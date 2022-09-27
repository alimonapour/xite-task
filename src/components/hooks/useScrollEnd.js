import { useEffect } from 'react'

export function useScrollEnd(element, onScrollEnd) {
  useEffect(() => {
    if (element) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onScrollEnd()
        }
      })
      observer.observe(element)

      return () => {
        observer.disconnect()
      }
    }
  }, [element, onScrollEnd])
}
