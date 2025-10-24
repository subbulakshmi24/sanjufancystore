const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


const app = express();
const port = 7001;

const users = [];
const secretKey = "secretkey";

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri =
  "mongodb+srv://ganesansuwathi_db_user:fancy@cluster0.bwj5q9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB and define routes
async function run() {
  try {
    await client.connect();
    const fancy = client.db("demo").collection("fancy");
    const store = client.db("demo1").collection("store");

    // CONTACT route
    app.post("/contact", async (req, res) => {
      try {
        const data = req.body;
        const result = await store.insertOne(data);
        res.status(200).json({ message: "Contact saved successfully", result });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving contact" });
      }
    });

    // REVIEW route
    app.post("/review", async (req, res) => {
      try {
        const data = req.body;
        const result = await fancy.insertOne(data);
        res.status(200).json({ message: "Review saved successfully", result });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving review" });
      }
    });

    // GET all store items
    app.get("/gets", async (req, res) => {
      const data = store.find();
      const result = await data.toArray();
      res.send(result);
    });

    // GET one store item
    app.get("/getone/:id", async (req, res) => {
      const id = req.params.id;
      const objid = { _id: new ObjectId(id) };
      const result = await store.findOne(objid);
      res.send(result);
    });

    // DELETE store item
    app.delete("/del/:id", async (req, res) => {
      const id = req.params.id;
      const objid = { _id: new ObjectId(id) };
      const result = await store.deleteOne(objid);
      res.send(result);
    });

    // UPLOAD to fancy collection
    app.post("/upload", async (req, res) => {
      const data = req.body;
      const result = await fancy.insertOne(data);
      res.send(result);
    });

    // GET all fancy items
    app.get("/getall", async (req, res) => {
      const data = fancy.find();
      const result = await data.toArray();
      res.send(result);
    });

    // GET one fancy item
    app.get("/getone-fancy/:id", async (req, res) => {
      const id = req.params.id;
      const objid = { _id: new ObjectId(id) };
      const result = await fancy.findOne(objid);
      res.send(result);
    });

    // DELETE fancy item
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const objid = { _id: new ObjectId(id) };
      const result = await fancy.deleteOne(objid);
      res.send(result);
    });

    // EDIT fancy item
    app.patch("/edit/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateOne = { $set: { ...updateData } };
      const options = { upsert: true };
      const result = await fancy.updateOne(filter, updateOne, options);
      res.send(result);
    });

    console.log(
      "Connected to MongoDB! You can now use all your routes safely."
    );
  } finally {
    // await client.close(); // Keep connection alive for API
  }
}
run().catch(console.dir);

// REGISTER route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.sendStatus(201);
  console.log("User registered successfully");
});

// LOGIN route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((us) => us.username === username);

  if (user) {
    const isValidUser = await bcrypt.compare(password, user.password);
    if (isValidUser) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: "1hr" });
      res.json({ token });
      console.log("Login successful");
    } else {
      res.status(401).json({
        message: "Invalid Credentials, password does not match",
      });
    }
  } else {
    res
      .status(401)
      .json({ message: "Invalid Credentials, user not found. Please sign up" });
  }
});


app.listen(port, () => {
  console.log("Server running on port", port);
});

