import express from 'express'
import cors from 'cors'
import mysql from "mysql"

const app = express()

const port = 2222

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vilagvege',
})

app.use(express.json())
app.use(cors())


app.get('/aha', (req, res) => {
  const q = 'SELECT * FROM station'
  db.query(q, (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.post('/aha', (req, res) => {
  const q = 'INSERT INTO station(`location`, `ipAdd`, `battCap`, `battCha`) VALUES (?)'
  const values = [req.body.location, req.body.ipAdd, req.body.battCap, req.body.battCha]

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.delete('/aha/:id', (req, res) => {
  const stationId = req.params.id
  const q = 'DELETE FROM station WHERE id = ?'

  db.query(q, [stationId], (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.put('/aha/:id', (req, res) => {
  const stationId = req.params.id
  const q = 'UPDATE station SET `location` = ?, `ipAdd` = ?, `battCap` = ?, `battCha` = ? WHERE id = ? '

  const values = [req.body.location, req.body.ipAdd, req.body.battCap, req.body.battCha]

  db.query(q, [...values, stationId], (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.listen(port, () => {
  console.log(`A szerver a ${port} porton fut.`)
})