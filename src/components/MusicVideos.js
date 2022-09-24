import { useRef } from 'react'
import clsx from 'clsx'
import useLazyLoad from './utils/useLazyLoad'
import { Card } from './UI/Card'
import PageSpinner from './UI/PageSpinner'
import { LoadingMusicVideos } from './LoadingMusicVideos'
import { useFetchData } from './hooks/useFetchData'

const NUM_PER_PAGE = 20
const TOTAL_PAGES = 250

function sortByNewestToOld(first, second) {
  return second.release_year - first.release_year
}

const MusicVideos = () => {
  const { allMusicVideos, isLoading, isError } = useFetchData()

  const triggerRef = useRef(null)
  const onGrabData = (currentPage) => {
    const musicVideos = allMusicVideos
      .sort(sortByNewestToOld)
      .slice(
        ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
        NUM_PER_PAGE * (currentPage % TOTAL_PAGES),
      )
    return musicVideos
  }
  const { data: musicVideos, loading } = useLazyLoad({ triggerRef, onGrabData })
  return (
    <div>
      {isError ? (
        <div className='flex flex-col items-center justify-between text-rose-600 text-lg '>
          <p>There was an error:</p>
          <pre>{isError?.message}</pre>
        </div>
      ) : null}

      {isLoading ? (
        <PageSpinner />
      ) : (
        <>
          <div className='grid grid-cols-16 gap-4'>
            {musicVideos.map((video) => {
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
            className={clsx('trigger', { visible: loading })}
          >
            <LoadingMusicVideos />
          </div>
        </>
      )}
    </div>
  )
}

export default MusicVideos
