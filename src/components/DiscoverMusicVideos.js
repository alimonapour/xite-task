import React from 'react'
import { useFetchData } from './hooks/useFetchData'
import { Card } from './UI/Card'
import Spinner from './UI/Spinner'

const DiscoverMusicVideos = ({ query }) => {
  const { allMusicVideos, isLoading, isError } = useFetchData()
  let musicVideos = []
  if (query.length > 0) {
    musicVideos = allMusicVideos.filter((el) => {
      return Object.values(el).some((val) =>
        String(val).toLowerCase().includes(query),
      )
    })
  }

  return (
    <div>
      {isError ? (
        <div className='flex flex-col items-center justify-between text-rose-600 text-lg '>
          <p>There was an error:</p>
          <pre>{isError?.message}</pre>
        </div>
      ) : null}

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className='grid grid-cols-16 gap-4'>
            {musicVideos.length === 0 && (
              <p>
                Hmmm... There were no music videos found with this search.
                <br /> Please try another.
              </p>
            )}
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
        </>
      )}
    </div>
  )
}

export default DiscoverMusicVideos
