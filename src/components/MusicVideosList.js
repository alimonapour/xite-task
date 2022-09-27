import { useRef } from 'react'
import { Card } from './UI/Card'
import { useLazyLoad } from './hooks/useLazyLoad'

export default function MusicVideosList({ items }) {
  const loaderTriggerRef = useRef(null)
  const { visibleItems, isLastPage } = useLazyLoad(
    items,
    loaderTriggerRef.current,
  )

  return (
    <div className='grid grid-cols-16 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-3'>
      {visibleItems
        ? visibleItems.map((item) => (
            <Card
              key={item.id}
              artist={item.artist}
              title={item.title}
              imageUrl={item.image_url}
            />
          ))
        : null}
      <div
        ref={loaderTriggerRef}
        style={{ height: '100px' }}
        hidden={isLastPage}
      ></div>
    </div>
  )
}
