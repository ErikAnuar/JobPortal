const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware here
app.use(express.json());
app.use(cors());

// replace username(${process.env.DB_USER}) and password(${process.env.DB_PASS}) here

const uri = `mongodb+srv://tkulzhan:tkulzhan@cluster.czbqaif.mongodb.net?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("jobPortal");
    const jobsCollection = db.collection("jobs");
    const usersCollection = db.collection("users");

    // Creating index for job sorting last job posted will show first
    const indexKeys = { title: 1, category: 1 };
    const indexOptions = { name: "titleCategory" };
    await jobsCollection.createIndex(indexKeys, indexOptions);
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    app.post("/create-user", async (req, res) => {
      const { userEmail } = req.body;

      try {
        // Check if the user already exists
        const existingUser = await usersCollection.findOne({
          email: userEmail,
        });

        if (existingUser) {
          return res.status(400).send({
            message: "User with this email already exists.",
            status: false,
          });
        }

        // If the user doesn't exist, create a new user
        const result = await usersCollection.insertOne({ email: userEmail });

        if (result.insertedId) {
          return res.status(200).send(result);
        } else {
          return res.status(500).send({
            message: "Failed to create a new user. Try again later.",
            status: false,
          });
        }
      } catch (error) {
        console.error("Error in /create-user endpoint:", error);
        return res.status(500).send({
          message: "Internal server error. Try again later.",
          status: false,
        });
      }
    });


    app.post("/favorite-job", async (req, res) => {
      const { userEmail, jobId } = req.body;

      // Update the user's favoriteJobs array
      const result = await usersCollection.updateOne(
        { email: userEmail },
        { $addToSet: { favoriteJobs: jobId } } // Use $addToSet to avoid duplicates
      );

      if (result.modifiedCount > 0 || result.upsertedCount > 0) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "Can not insert favorite job. Try again later.",
          status: false,
        });
      }
    });

    app.get("/favorite-jobs/:email", async (req, res) => {
      const userEmail = req.params.email;

      // Find the user and retrieve their favorite jobs
      const user = await usersCollection.findOne({ email: userEmail });

      if (user) {
        const favoriteJobs = user.favoriteJobs || [];
        res.send(favoriteJobs);
      } else {
        res.status(404).send({
          message: "User not found.",
          status: false,
        });
      }
    });

    app.delete("/favorite-job/:email/:jobId", async (req, res) => {
      const userEmail = req.params.email;
      const jobId = req.params.jobId;

      // Remove the job ID from the user's favoriteJobs array
      const result = await usersCollection.updateOne(
        { email: userEmail },
        { $pull: { favoriteJobs: jobId } }
      );

      if (result.modifiedCount > 0) {
        res.send({ status: true });
      } else {
        res.status(404).send({
          message: "Job not found in favorites.",
          status: false,
        });
      }
    });

    // post a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createdAt = new Date();
      // console.log(body);
      const result = await jobsCollection.insertOne(body);
      if (result?.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert try again leter",
          status: false,
        });
      }
    });

    // get all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      res.send(jobs);
    });

    // get single job using id
    app.get("/all-jobs/:id", async (req, res) => {
      // console.log(req.params.id);
      const jobs = await jobsCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(jobs);
    });

    // get jobs based on email for my job listing
    app.get("/myJobs/:email", async (req, res) => {
      // console.log("email---", req.params.email);
      const jobs = await jobsCollection
        .find({
          postedBy: req.params.email,
        })
        .toArray();
      res.send(jobs);
    });

    // delete a job
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(filter);
      res.send(result);
    });

    // updata a job
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      // console.log(body);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...jobData,
        },
      };
      const options = { upsert: true };
      const result = await jobsCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
