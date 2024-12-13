import Image from 'next/image'

type Character = {
  fullName: string
  nickname: string
  hogwartsHouse: string
  interpretedBy: string
  children: string[]
  image: string
  birthdate: string
  index: number
}

export const revalidate = 3600 // Revalidate every hour

async function fetchCharacters() {
  try {
    const res = await fetch(
      'https://potterapi-fedeperin.vercel.app/en/characters'
    )
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return await res.json()
  } catch (error) {
    console.error('Error fetching characters:', error)
    return []
  }
}

export default async function Home() {
  const characters: Character[] = await fetchCharacters()

  return (
    <div className='container mx-auto py-10 px-4'>
      <header className='mb-12 text-center'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>
          Explore the Magical World of Harry Potter
        </h1>
        <p className='text-lg text-gray-600'>
          Discover the beloved characters from the wizarding world and their
          fascinating stories.
        </p>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {characters.map((character) => (
          <div
            key={character.index}
            className='p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300'
          >
            <div className='flex flex-col items-center'>
              <div className='relative w-[180px] h-[180px] mb-6'>
                <Image
                  alt={character.fullName}
                  src={character.image}
                  fill
                  className='rounded-full object-cover'
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 180px'
                />
              </div>
              <h2 className='text-2xl font-bold text-gray-900 mb-2 text-center'>
                {character.fullName}
              </h2>
              <p className='text-gray-500 italic text-center pb-4 border-b w-full mb-4'>
                {character.nickname || 'No nickname'}
              </p>
              <div className='text-gray-700 space-y-4 w-full'>
                <div className='flex justify-between'>
                  <span className='font-semibold'>House:</span>
                  <span>{character.hogwartsHouse || 'Unknown'}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Portrayed by:</span>
                  <span>{character.interpretedBy || 'Unknown'}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Birthdate:</span>
                  <span>{character.birthdate || 'Unknown'}</span>
                </div>

                {character.children.length > 0 && (
                  <div className='mt-4'>
                    <p className='text-gray-700 font-semibold mb-2'>
                      Children:
                    </p>
                    <ul className='list-disc list-inside text-gray-600 space-y-1'>
                      {character.children.map((child, idx) => (
                        <li key={idx}>{child}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
