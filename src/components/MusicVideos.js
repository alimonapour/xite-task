import { useRef } from 'react'
import clsx from 'clsx'
import useLazyLoad from './hooks/useLazyLoad'
import { Card } from './UI/Card'
import { MusicVideosSkeleton } from './MusicVideosSkeleton'

const PAGE_SIZE = 20

function sortByNewestToOld(first, second) {
  return second.release_year - first.release_year
}

const MusicVideos = ({ musicVideos, isLoading }) => {
  const triggerRef = useRef(null)

  const onGrabData = (currentPage) => {
    const totalPagesCount = musicVideos?.length / PAGE_SIZE
    const newList = musicVideos
      ?.sort(sortByNewestToOld)
      .slice(
        ((currentPage - 1) % totalPagesCount) * PAGE_SIZE,
        PAGE_SIZE * (currentPage % totalPagesCount),
      )
    return newList
  }

  let { data, loading, currentPage } = useLazyLoad({
    triggerRef,
    onGrabData,
  })

  let hasMore = currentPage * PAGE_SIZE <= musicVideos?.length

  return (
    <div>
      {isLoading ? (
        <div className='mt-3'>
          <MusicVideosSkeleton />
        </div>
      ) : (
        <>
          <div className='grid sm:grid-cols-16 lg:grid-cols-4 gap-4 mt-3'>
            {data?.map((video) => {
              return (
                <Card
                  key={video.id}
                  artist={video.artist}
                  title={video.title}
                  imageUrl={video.image_url}
                />
              )
            })}
          </div>
          <div
            ref={triggerRef}
            className={clsx('trigger', {
              hidden: !hasMore || loading,
            })}
          >
            <MusicVideosSkeleton />
          </div>
        </>
      )}
    </div>
  )
}

export default MusicVideos
