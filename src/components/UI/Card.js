export const Card = ({ artist, title, imageUrl }) => {
  return (
    <div className='rounded overflow-hidden shadow-lg'>
      <img className='w-full h-64 object-center' src={imageUrl} alt={artist} />
      <div className='px-6 py-2'>
        <div className='flex flex-col items-center'>
          <h1 className='w-full text-center text-base tracking-tighter font-semibold'>
            {artist}
          </h1>
          <h2 className='text-sm tracking-tighter mt-1 text-center'>{title}</h2>
        </div>
      </div>
    </div>
  )
}
