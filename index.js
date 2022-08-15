const express = require('express');

// const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;


const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

//middle wire
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zoeq8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {

        await client.connect();
        console.log('connected  dynamic-form');
        const database = client.db('dynamic-form');


        const bikeCollection = database.collection('bikes');
        const carsCollection = database.collection('cars');
        const furnitureCollection = database.collection('furnitures');




        //get Bikes Api
        app.get('/bikes', async (req, res) => {
            const cursor = bikeCollection.find({});
            const order = await cursor.toArray();
            res.send(order);

        })

        //get furnitures Api
        app.get('/furnitures', async (req, res) => {
            const cursor = furnitureCollection.find({});
            const order = await cursor.toArray();
            res.send(order);

        })

        //get cars Api
        app.get('/cars', async (req, res) => {
            const cursor = carsCollection.find({});
            const order = await cursor.toArray();
            res.send(order);

        })

        //bike POST API
        app.post('/bikes', async (req, res) => {
            const bike = req.body;
            console.log('hit the post order api', bike);

            const result = await bikeCollection.insertOne(bike);;
            console.log(result);
            res.json(result);
        });
        //car POST API
        app.post('/cars', async (req, res) => {
            const bike = req.body;
            console.log('hit the post order api', bike);

            const result = await carsCollection.insertOne(bike);;
            console.log(result);
            res.json(result);
        });
        //furniture POST API
        app.post('/furnitures', async (req, res) => {
            const bike = req.body;
            console.log('hit the post order api', bike);

            const result = await furnitureCollection.insertOne(bike);;
            console.log(result);
            res.json(result);
        });


    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running travel server');
})

app.listen(port, () => {
    console.log('Running travel tours server', port);
})


// dynamic-form
// Ek9kPSNxAD9ldGH6
