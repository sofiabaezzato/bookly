import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    desc: "",
    cover: ""
  })

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books/${id}`)
        const data = await res.json()

        if (res.ok) {
          setBook({
            title: data[0].title,
            author: data[0].author,
            desc: data[0].desc,
            cover: data[0].cover
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchBook()
  }, [])

  const navigate = useNavigate()
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook({...book, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch(`http://localhost:3000/books/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          desc: book.desc,
          cover: book.cover
        }),
        headers: { "Content-Type": "application/json" }
      })
      
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <section className='flex flex-col justify-center items-center max-w-md mx-auto'>
      <h1 className='font-bold text-lg mb-4'>Update Book</h1>
      <div className="flex flex-col w-full gap-2">
          <input
            value={book.title}
            className="min-h-8 p-2 border border-gray-500 rounded-md"
            type="text"
            placeholder='Title'
            name="title"
            onChange={handleChange}/>
          <input
            value={book.author}
            className="min-h-8 p-2 border border-gray-500 rounded-md" 
            type="text" 
            placeholder='Author' 
            name="author" 
            onChange={handleChange}/>
          <textarea 
            value={book.desc}
            className="min-h-24 p-2 border border-gray-500 rounded-md" 
            type="text" 
            placeholder='Description' 
            name="desc" 
            onChange={handleChange} />
          <input 
            value={book.cover}
            className="min-h-8 p-2 border border-gray-500 rounded-md" 
            type="url" 
            placeholder='Cover URL' 
            name="cover" 
            onChange={handleChange}/>
          <button className='px-2 py-1  rounded-md bg-yellow-400' onClick={handleSubmit}>Update</button>
      </div>
    </section>
  )
}

export default Update