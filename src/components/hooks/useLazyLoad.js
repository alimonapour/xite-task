import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollEnd } from './useScrollEnd'

const PAGE_SIZE = 20

export function useLazyLoad(items, loaderTriggerElement) {
  const lastItems = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPagesCount = items?.length
  const isLastPage = totalPagesCount === currentPage || totalPagesCount === 0

  const onScrollEnd = useCallback(() => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, isLastPage])

  useEffect(() => {
    if (lastItems.current !== items) {
      setCurrentPage(1)
      lastItems.current = items
    }
  }, [items])

  useScrollEnd(loaderTriggerElement, onScrollEnd)

  const visibleItems = items?.slice(0, currentPage * PAGE_SIZE)

  return { visibleItems, currentPage, isLastPage }
}
