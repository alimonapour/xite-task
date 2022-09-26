import React from 'react'
import { useFetchData } from './hooks/useFetchMusicVideos'
import MusicVideos from './MusicVideos'
import ScrollButton from './UI/ScrollToTopButton'
import Select from 'react-select'

const MainPage = () => {
  const [query, setQuery] = React.useState('')
  const [musicVideoGenreOptions, setMusicVideoGenreOptions] = React.useState([])
  const [musicVideoReleaseYear, setMusicVideoReleaseYear] = React.useState([])
  const { isError, allMusicVideos, allGenres, isLoading } = useFetchData()

  const musicVideosReleaseYear = [
    ...new Map(
      allMusicVideos?.map(({ release_year }) => [release_year, release_year]),
    ).values(),
  ]

  function filterMusicVideos(
    musicVideoReleaseYear,
    musicVideoGenreOptions,
    query,
  ) {
    let filteredList = allMusicVideos
    if (musicVideoGenreOptions?.length > 0) {
      filteredList = filteredList.filter((musicVideo) =>
        musicVideoGenreOptions.find((i) => i.value === musicVideo.genre_id),
      )
    }

    if (musicVideoReleaseYear?.length > 0) {
      filteredList = filteredList.filter((musicVideo) =>
        musicVideoReleaseYear.find((i) => i.value === musicVideo.release_year),
      )
    }

    if (query.length > 0) {
      filteredList = filteredList.filter(({ artist, title }) => {
        return Object.values({ artist, title }).some((val) =>
          String(val).toLowerCase().includes(query),
        )
      })
    }
    return filteredList
  }

  const filteredMusicVideos = filterMusicVideos(
    musicVideoReleaseYear,
    musicVideoGenreOptions,
    query,
  )

  function handleINputChange(e) {
    e.preventDefault()
    setQuery(e.target.value)
  }

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
        <div className='flex flex-col items-center justify-between text-rose-600 text-lg mt-3'>
          <p>There was an error:</p>
          <>
            <pre>An error occurred while fetching the data.</pre>
            <pre>Please try again later.</pre>
          </>
        </div>
      ) : (
        <div className='mt-5'>
          <input
            required
            placeholder='Search music videos...'
            className='serch-input'
            value={query}
            type='text'
            onChange={handleINputChange}
          />

          <div className='grid items-center gap-2.5 sm: grid-cols-16 lg:grid-cols-2'>
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
          <MusicVideos
            musicVideos={filteredMusicVideos}
            isLoading={isLoading}
            dependencies={[
              musicVideosReleaseYear.length,
              musicVideoGenreOptions.length,
            ]}
          />
          <ScrollButton />
        </div>
      )}
    </div>
  )
}

export default MainPage
