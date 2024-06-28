const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb'); 
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())

dotenv.config()
// console.log(process.env.MONGO_URI)
const dbName='passop'
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

//get all passwords
app.get('/',async (req, res) => {
    const db = await client.db(dbName);
    const collection =await db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//add passwords
app.post('/',async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true,result: findResult})
})

//delete passwords
app.delete('/',async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true,result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port: http://localhost:${port}`)
})
