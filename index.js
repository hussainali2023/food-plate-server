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

async function run() {
  try {
    const foodCollection = client
      .db("food-plate")
      .collection("foodsCollection");

    app.get("/foods", async (req, res) => {
      const query = {};
      const foods = await foodCollection.find(query).toArray();
      res.send(foods);
    });
    app.get("/foods/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const food = await foodCollection.findOne(query);
      res.send(food);
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
