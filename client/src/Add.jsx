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
    <section className='max-w-screen-sm'>
      <h1>Add New Book</h1>
      <div className="flex flex-col">
          <input type="text" placeholder='Title' name="title" onChange={handleChange}/>
          <input type="text" placeholder='Author' name="author" onChange={handleChange}/>
          <textarea type="text" placeholder='Description' name="desc" onChange={handleChange} />
          <input type="url" placeholder='Cover URL' name="cover" onChange={handleChange}/>
          <button onClick={handleSubmit}>Add</button>
      </div>
    </section>
  )
}

export default Add