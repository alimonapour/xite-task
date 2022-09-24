export const Card = ({ artist, title, imageUrl }) => {
  return (
    <div className='w-full rounded overflow-hidden shadow-lg m-2'>
      <img className='w-full h-64 object-center' src={imageUrl} alt={artist} />
      <div className='px-6 py-2'>
        <div className='font-regular flex flex-col items-center justify-around'>
          <h1 className='text-xl'>{artist}</h1>
          <h2 className='text-md '>{title}</h2>
        </div>
      </div>
    </div>
  )
}
