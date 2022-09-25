import React from 'react'
import { useFetchData } from './hooks/useFetchMusicVideos'
import MusicVideos from './MusicVideos'
import DiscoverMusicVideos from './DiscoverMusicVideos'
import ScrollButton from './UI/ScrollToTopButton'
const MainPage = () => {
  const [query, setQuery] = React.useState('')
  const { isError } = useFetchData()
  function handleINputChange(e) {
    e.preventDefault()
    setQuery(e.target.value)
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

          {query?.length > 0 ? (
            <DiscoverMusicVideos query={query} />
          ) : (
            <MusicVideos />
          )}
          <ScrollButton />
        </div>
      )}
    </div>
  )
}

export default MainPage
