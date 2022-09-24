import React from 'react'
import MusicVideos from './MusicVideos'
import DiscoverMusicVideos from './DiscoverMusicVideos'
import ScrollButton from './UI/ScrollToTopButton'
const MainPage = () => {
  const [query, setQuery] = React.useState('')

  function handleINputChange(e) {
    e.preventDefault()

    setQuery(e.target.value)
  }

  return (
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
  )
}

export default MainPage
