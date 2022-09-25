import React from 'react'
import { useFetchData } from './hooks/useFetchMusicVideos'
import { Card } from './UI/Card'

function sortByNewestToOld(first, second) {
  return second.release_year - first.release_year
}

const DiscoverMusicVideos = ({ query }) => {
  const { allMusicVideos } = useFetchData()
  let musicVideos = []
  if (query.length > 0) {
    musicVideos = allMusicVideos.filter(({ artist, title }) => {
      return Object.values({ artist, title }).some((val) =>
        String(val).toLowerCase().includes(query),
      )
    })
  }

  return (
    <div>
      {musicVideos.length === 0 && (
        <p className='text-base font-semibold'>
          Hmmm... There were no music videos found with this search.
          <br /> Please try another.
        </p>
      )}
      <div className='grid sm:grid-cols-16 lg:grid-cols-4 gap-4 mt-3  '>
        {musicVideos.sort(sortByNewestToOld).map((video) => {
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
    </div>
  )
}

export default DiscoverMusicVideos
