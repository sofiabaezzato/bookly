import React from 'react'
import { useLoaderData, useNavigation, useNavigate } from 'react-router-dom'

const Books = () => {
  const books = useLoaderData()
  const navigation = useNavigation()
  const navigate = useNavigate()

  if (navigation.state === "loading") {
    return <h1>Loading...</h1>
  }

  const handleDelete = async (id) => {
    try {
      const res =  await fetch(`http://localhost:3000/books/${id}`, { method: "DELETE" })
      const message = await res.json()
      
      if (res.ok) console.log(message)
      navigate("/")
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='flex flex-col justify-center items-center'>
      <h1 className='font-bold text-lg mb-4'>Books</h1>
      <ul className='list-none'>
        {books.map(book => (
          <li key={book.id} className='mb-2 p-2 border border-gray-500 flex justify-between items-center gap-4 rounded-lg'>
            <div className="">
              <p>Title: {book.title}</p>
              <p>Author: {book.author}</p>
            </div>
            <button onClick={() => handleDelete(book.id)}
              className='px-2 py-1 bg-yellow-400 rounded-md'
            >Delete</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

const dataLoader = async () => {
  const res = await fetch("http://localhost:3000/books")
  const books = await res.json()

  return books
}

export { Books, dataLoader}