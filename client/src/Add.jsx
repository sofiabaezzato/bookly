import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    desc: "",
    cover: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setNewBook({...newBook, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch("http://localhost:3000/books", {
        method: "POST",
        body: JSON.stringify({
          title: newBook.title,
          author: newBook.author,
          desc: newBook.desc,
          cover: newBook.cover
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
      <h1 className='font-bold text-lg mb-4'>Add New Book</h1>
      <div className="flex flex-col w-full gap-2">
          <input className="min-h-8 p-2 border border-gray-500 rounded-md" type="text" placeholder='Title' name="title" onChange={handleChange}/>
          <input className="min-h-8 p-2 border border-gray-500 rounded-md" type="text" placeholder='Author' name="author" onChange={handleChange}/>
          <textarea className="min-h-24 p-2 border border-gray-500 rounded-md" type="text" placeholder='Description' name="desc" onChange={handleChange} />
          <input className="min-h-8 p-2 border border-gray-500 rounded-md" type="url" placeholder='Cover URL' name="cover" onChange={handleChange}/>
          <button className='px-2 py-1  rounded-md bg-yellow-400' onClick={handleSubmit}>Add</button>
      </div>
    </section>
  )
}

export default Add