import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
        process.env.NEXT_PUBLIC_MONGO_URL
    );

    const db = client.db();

    const meetupCollection = db.collection("student");

    const result = await meetupCollection.insertOne(data);


    client.close();

    res.status(201).json({ message: "meetup Inserted!!!" });
  }
}

export default handler;
