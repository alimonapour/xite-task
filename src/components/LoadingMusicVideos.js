export const LoadingCard = () => {
  return (
    <div className='w-full rounded overflow-hidden shadow-lg m-2'>
      <div className='w-full h-64 bg-gray-300 animate-pulse'></div>
      <div className='px-6 py-4 items-center'>
        <div className='font-regular text-xl mb-2 w-20 h-4 bg-gray-300 animate-pulse'></div>
      </div>
    </div>
  )
}

export const LoadingMusicVideos = () => {
  const loadPages = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className='grid grid-cols-16 gap-4 animate-pulse'>
      {loadPages.map((num) => {
        return <LoadingCard key={num} />
      })}
    </div>
  )
}
