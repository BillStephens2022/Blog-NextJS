import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      const pwParam = encodeURIComponent(process.env.MONGODB_PW);
      client = await MongoClient.connect(
        `mongodb+srv://two4onebill:${pwParam}@cluster0.xvwjnur.mongodb.net/blog-nextjs?retryWrites=true&w=majority`
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database..." });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" })
      return;
    }

    

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });

      client.close();
  }
}

export default handler;
