const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port =  3000;
const url = 'mongodb://localhost:27017';
const dbName = 'SuppliesForSchools';
let db;

app.use(bodyParser.text());
app.use(cors());

app.post('/api/message', (req,res) => {
    console.log(req.body);
    db.collection('message').insertOne({'msg': req.body});
    res.status(200).send();
})

app.get('/api/message', async (req,res) => {
    const docs = await db.collection('message').find({}).toArray();

    if(!docs) return res.json({error: "error getting messages"})

    res.json(docs)
    
})


MongoClient.connect(url, function (err, client) {

    if(err) return console.log('mongodb error', err);

    console.log("connected successfully to server");

    db = client.db(dbName);

})

app.listen(port, () => console.log('App running on port', port));