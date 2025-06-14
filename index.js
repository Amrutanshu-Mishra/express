import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

let teaData = []
let nextId = 1

//add a new tea
app.post('/teas', (req, res) => {
     const { name, price } = req.body
     const newTea = { id: nextId++, name, price }
     teaData.push(newTea)
     res.status(201).send(newTea)
})

app.get('/', (req, res) => {
     res.send('Hello World!')
})

//get all tea
app.get('/teas', (req, res) => {
     res.status(200).send(teaData)
})

//get a particular of tea
app.get('/teas/:id', (req, res) => {
     const tea = teaData.find(t => t.id == parseInt(req.params.id))
     if (!tea) {
          return res.status(404).send("tea not found")
     }
     res.status(200).send(tea)
})


//update tea
app.put('/teas/:id', (req, res) => {
     const tea = teaData.find(t => t.id == parseInt(req.params.id))
     if (!tea) {
          return res.status(404).send("tea not found")
     }
     const { name, price } = req.body
     console.log(name, price)
     tea.name = name
     tea.price = price
     res.send(200).send(tea)
})


//delete tea
app.delete('/teas/:id', (req, res) => {
     const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
     if(index==-1){
          return res.status(404).send('tea not found')
     }
     teaData.splice(index,1)
     return res.status(204).send('deleted ')
})

app.get('/about', (req, res) => {
     res.send('Amrutanshu mishra here!')
})

app.get('/linkedIn', (req, res) => {
     res.send('Amrutanshu mishra')
})

app.listen(port, () => {
     console.log(`Server listening on port ${port}`)
})