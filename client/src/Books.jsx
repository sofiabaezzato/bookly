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
    <section>
      <h1>Books</h1>
      <ul className='list-none'>
        {books.map(book => (
          <li key={book.id} className='mb-2'>
            Title: {book.title}, Author: {book.author}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
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