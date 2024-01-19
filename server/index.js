import express from 'express'
import mysql from 'mysql2'
import 'dotenv/config'
import cors from 'cors'

const app = express()
const PORT = 3000

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '&5qe4SfV4b37fF',
  database: "bookly"
})
if (db) console.log('db connected!')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/books', (req, res) => {
  const query = "SELECT * FROM books"
  db.query(query, (err, data) => {
    if (err) return res.status(400).send(err)
    return res.json(data)
  })
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const query = "SELECT * FROM books WHERE id = ?"
  
  db.query(query, [id], (err, data) => {
    if (err) return res.status(400).send(err)
    return res.json(data)
  })
})

app.post('/books', (req, res) => {
  const query = "INSERT INTO books (`title`, `author`, `desc`, `cover`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.author,
    req.body.desc,
    req.body.cover,
  ]

  db.query(query, [values], (err, data) => {
    if (err) return res.status(400).send(err)
    return res.json('New book created.')
  })
})

app.delete('/books/:id', (req, res) => {
  const id = req.params.id
  const query = "DELETE FROM books WHERE id = ?"

  db.query(query, [id], (err, data) => {
    if (err) return res.status(400).send(err)
    return res.json(`Book ${id} deleted.`)
  })
})

app.put('/books/:id', (req, res) => {
  const id = req.params.id
  const query = "UPDATE books SET `title`= ?, `author` = ?, `desc` = ?, `cover` = ? WHERE id = ?"
  const values = [
    req.body.title,
    req.body.author,
    req.body.desc,
    req.body.cover,
  ]

  db.query(query, [...values, id], (err,data) => {
    if (err) return res.status(400).send(err)
    return res.json(`Book ${id} updateded.`)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})