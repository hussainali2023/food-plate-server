const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.xgu9cba.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log(uri);

async function run() {
  try {
    const foodCollection = client
      .db("food-plate")
      .collection("foodsCollection");

    const reviewCollection = client.db("food-plate").collection("reviews");

    app.get("/foods", async (req, res) => {
      const query = {};
      const foods = await foodCollection.find(query).toArray();
      res.send(foods);
    });

    app.get("/foods/foodType", async (req, res) => {
      const query = {};
      const foods = await foodCollection
        .find(query, { projection: { foodType: 1, _id: 0 } })
        .toArray();
      res.send(foods);
    });

    app.get("/foods/indian", async (req, res) => {
      const query = { foodType: "indian" };
      const indianFoods = await foodCollection.find(query).toArray();
      res.send(indianFoods);
    });
    app.get("/foods/italian", async (req, res) => {
      const query = { foodType: "italian" };
      const italianFoods = await foodCollection.find(query).toArray();
      res.send(italianFoods);
    });

    app.get("/foods/american", async (req, res) => {
      const query = { foodType: "american" };
      const americanFoods = await foodCollection.find(query).toArray();
      res.send(americanFoods);
    });
    app.get("/foods/chinese", async (req, res) => {
      const query = { foodType: "chinese" };
      const americanFoods = await foodCollection.find(query).toArray();
      res.send(americanFoods);
    });

    app.post("/foods", async (req, res) => {
      const foods = req.body;

      const result = await foodCollection.insertOne(foods);
      res.send(result);
    });

    app.get("/foods/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const food = await foodCollection.findOne(query);
      res.send(food);
    });

    app.post("/reviews", async (req, res) => {
      const reviews = req.body;
      console.log(reviews);
      const result = await reviewCollection.insertOne(reviews);
      res.send(reviews);
    });

    app.get("/reviews", async (req, res) => {
      const query = {};
      const reviews = await reviewCollection.find(query).toArray();
      res.send(reviews);
    });

    app.get("/reviews/foods/:foodName", async (req, res) => {
      const foodName = req.params.foodName;
      const email = req.params.email;
      const query = { foodName: foodName };
      const reviews = await reviewCollection.find(query).toArray();
      res.send(reviews);
    });
    app.get("/reviews/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const reviews = await reviewCollection.find(query).toArray();
      res.send(reviews);
    });
  } catch (data) {
    console.log(data);
  }
}

run().catch((data) => console.log(data));

app.get("/", async (req, res) => {
  res.send("Food Plate server is running");
});

app.listen(port, () => {
  console.log(`Food Plate server is Running on Port ${port}`);
});
