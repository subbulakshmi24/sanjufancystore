const express=require("express")
const cors=require("cors")

const jwt=require('jsonwebtoken');
const  bcrypt=require('bcryptjs');

const app=express()

const port=7001


const users = [];  
const secretKey = 'secretkey';


app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion,ObjectId} = require('mongodb');
const uri = "mongodb+srv://ganesansuwathi_db_user:fancy@cluster0.bwj5q9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {  
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const fancy=client.db("demo").collection("fancy")
    const store=client.db("demo1").collection("store")

    app.post("/contact",async(req,res)=>{
    app.post("/review", async (req, res) => {
  try {
    const data = req.body;
    const fancy = client.db("demo").collection("reviews"); // create a new "reviews" collection
    const result = await fancy.insertOne(data);
    res.status(200).json({ message: "Review saved successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving review" });
  }
});

})


app.get("/gets",async(req,res)=>{
    const data1=store.find()
    const result=await data1.toArray()
    res.send(result)
  })

  app.get("/getone/:id",async(req,res)=>{
    const id=req.params.id
    const objid={_id:new ObjectId(id)};
    const result=await store.findOne(objid);
    res.send(result)
  })
  app.delete("/del/:id",async(req,res)=>{
    const id=req.params.id
    const objid={_id:new ObjectId(id)};
    const result=await store.deleteOne(objid);
    res.send(result)
  }
)


    app.post("/upload",async(req,res)=>{
        const data=req.body
        const result=await fancy.insertOne(data)
        res.send(result)
    })
    app.get("/getall",async(req,res)=>{
    const data=fancy.find()
    const result=await data.toArray()
    res.send(result)
  })
  

  app.get("/getone/:id",async(req,res)=>{
    const id=req.params.id
    const objid={_id:new ObjectId(id)};
    const result=await fancy.findOne(objid);
    res.send(result)
  })
  

    app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const objid={_id:new ObjectId(id)};
    const result=await fancy.deleteOne(objid);
    res.send(result)

  }
)


  app.patch("/edit/:id",async(req,res)=>{
      const id=req.params.id;
      const updatecoursedata=req.body;
      const filter={_id:new ObjectId(id)};
      

      const updateOne={
        $set:{
          ...updatecoursedata
        },
      }

        const options={upsert:true};
        const result=await fancy.updateOne(filter,updateOne,options);
        res.send(result);
    
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    const hashedPassword= await bcrypt.hash(password,10);
    users.push({username,password:hashedPassword});
    res.sendStatus(201);
    console.log("User registered Successfully")
})

// Login route
app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user=users.find((us)=>us.username===username)
    if(user){
       const isValiduser=await bcrypt.compare(password,user.password,);
       if(isValiduser){
            const token=await jwt.sign({username},secretKey,{expiresIn:'1hr'})
            res.json({ token });
            console.log("login Successfully");
       }else{
            res.status(401).json({message:'Invalid Credential,since Password Does not match'})
       }

    }else{
      res.status(401).json({message:'Invalid Credential,since User Not Found,SignUp to Login plz'})
    }
})

app.listen(port,()=>{
  console.log("Running on Port",port)
})


