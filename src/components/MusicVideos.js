import { useRef, useState } from 'react'
import clsx from 'clsx'
import useLazyLoad from './utils/useLazyLoad'
import { Card } from './UI/Card'
import { MusicVideosSkeleton } from './MusicVideosSkeleton'
import { useFetchData } from './hooks/useFetchMusicVideos'
import Select from 'react-select'

const PAGE_SIZE = 20

function sortByNewestToOld(first, second) {
  return second.release_year - first.release_year
}

const MusicVideos = () => {
  const [musicVideoGenreOptions, setMusicVideoGenreOptions] = useState()
  const [musicVideoReleaseYear, setMusicVideoReleaseYear] = useState()
  const { allMusicVideos, isLoading, allGenres } = useFetchData()
  const musicVideosReleaseYear = [
    ...new Map(
      allMusicVideos?.map(({ release_year }) => [release_year, release_year]),
    ).values(),
  ]

  const triggerRef = useRef(null)
  const onGrabData = (currentPage) => {
    const totalPagesCount = allMusicVideos.length / PAGE_SIZE
    let musicVideos = allMusicVideos
      .sort(sortByNewestToOld)
      .slice(
        ((currentPage - 1) % totalPagesCount) * PAGE_SIZE,
        PAGE_SIZE * (currentPage % totalPagesCount),
      )
    return musicVideos
  }
  let {
    data: musicVideos,
    loading,
    currentPage,
  } = useLazyLoad({
    triggerRef,
    onGrabData,
  })

  let hasMore = currentPage * PAGE_SIZE <= allMusicVideos?.length
  function filterVideosByYear(musicVideoReleaseYear) {
    if (musicVideoReleaseYear?.length > 0) {
      musicVideos = allMusicVideos.filter((data) =>
        musicVideoReleaseYear.find((i) => i.value === data.release_year),
      )
    }

    return musicVideos
  }

  const filteredMusicViodeosByYear =
    musicVideoReleaseYear?.length >= 1
      ? filterVideosByYear(musicVideoReleaseYear)
      : []

  hasMore =
    filteredMusicViodeosByYear?.length >= 1
      ? currentPage * PAGE_SIZE <= filteredMusicViodeosByYear?.length
      : currentPage * PAGE_SIZE <= allMusicVideos?.length

  function filterVideosByGenre(musicVideoGenreOptions) {
    if (musicVideoGenreOptions?.length > 0) {
      musicVideos = allMusicVideos.filter((data) =>
        musicVideoGenreOptions.find((i) => i.value === data.genre_id),
      )
    }
    return musicVideos
  }

  const filteredMusicViodeosByGenres =
    musicVideoGenreOptions?.length >= 1
      ? filterVideosByGenre(musicVideoGenreOptions)
      : []

  hasMore =
    filteredMusicViodeosByGenres?.length >= 1
      ? currentPage * PAGE_SIZE <= filteredMusicViodeosByGenres?.length
      : currentPage * PAGE_SIZE <= allMusicVideos?.length

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

      {isLoading ? (
        <div className='mt-3'>
          <MusicVideosSkeleton />
        </div>
      ) : (
        <>
          <div className='grid sm:grid-cols-16 lg:grid-cols-4 gap-4 mt-3'>
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
