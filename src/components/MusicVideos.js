import { useRef, useState } from 'react'
import clsx from 'clsx'
import useLazyLoad from './utils/useLazyLoad'
import { Card } from './UI/Card'
import PageSpinner from './UI/PageSpinner'
import { LoadingMusicVideos } from './LoadingMusicVideos'
import { useFetchData } from './hooks/useFetchData'
import Select from 'react-select'

const NUM_PER_PAGE = 20
const TOTAL_PAGES = 250

function sortByNewestToOld(first, second) {
  return second.release_year - first.release_year
}

const MusicVideos = () => {
  const [musicVideoGenreOptions, setMusicVideoGenreOptions] = useState()
  const [musicVideoReleaseYear, setMusicVideoReleaseYear] = useState()
  const { allMusicVideos, isLoading, isError, allGenres } = useFetchData()
  const musicVideosReleaseYear = [
    ...new Map(
      allMusicVideos?.map(({ release_year }) => [release_year, release_year]),
    ).values(),
  ]

  const triggerRef = useRef(null)
  const onGrabData = (currentPage) => {
    let musicVideos = allMusicVideos
      .sort(sortByNewestToOld)
      .slice(
        ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
        NUM_PER_PAGE * (currentPage % TOTAL_PAGES),
      )
    return musicVideos
  }
  let { data: musicVideos, loading } = useLazyLoad({ triggerRef, onGrabData })

  function filterVideosByYear(musicVideoReleaseYear) {
    if (musicVideoReleaseYear?.length > 0) {
      musicVideos = allMusicVideos.filter((data) =>
        musicVideoReleaseYear.find((i) => i.value === data.release_year),
      )
    }

    return musicVideos
  }

  filterVideosByYear(musicVideoReleaseYear)

  function filterVideosByGenre(musicVideoGenreOptions) {
    if (musicVideoGenreOptions?.length > 0) {
      musicVideos = allMusicVideos.filter((data) =>
        musicVideoGenreOptions.find((i) => i.value === data.genre_id),
      )
    }
    return musicVideos
  }

  filterVideosByGenre(musicVideoGenreOptions)

  let genreListItems = []
  for (let i = 0; i < allGenres?.length; i++) {
    genreListItems.push({ value: allGenres[i].id, label: allGenres[i].name })
  }

  let yearListItems = []
  for (let i = 0; i < musicVideosReleaseYear?.length; i++) {
    yearListItems.push({
      value: musicVideosReleaseYear[i],
      label: musicVideosReleaseYear[i],
    })
  }

  const handleGenreOptionChanges = (data) => {
    setMusicVideoGenreOptions(data)
  }

  const handleYeraOptionChanges = (data) => {
    setMusicVideoReleaseYear(data)
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
        <PageSpinner />
      ) : (
        <>
          <div className='grid items-center gap-2.5 grid-cols-16'>
            <div>
              <Select
                options={genreListItems}
                placeholder='Select genre'
                value={musicVideoGenreOptions}
                onChange={handleGenreOptionChanges}
                isSearchable={true}
                isMulti
              />
            </div>
            <div>
              <Select
                options={yearListItems}
                placeholder='Select year'
                value={musicVideoReleaseYear}
                onChange={handleYeraOptionChanges}
                isSearchable={true}
                isMulti
              />
            </div>
          </div>
          <div className='grid grid-cols-16 gap-4 mt-3'>
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
