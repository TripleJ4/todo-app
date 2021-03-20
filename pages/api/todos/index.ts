import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "utils/mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method
  if (!(method === "GET" || method === "POST")) {
    res.setHeader("Allow", ["GET", "POST"])
    return res.status(405).end(`Method ${method} Not Allowed`)
  }

  const { db } = await connectToDatabase()

  switch (method) {
    case "GET":
      const todos = await db.collection("todos").find({}).toArray()
      return res.status(200).json(todos)

    case "POST":
      const body = JSON.parse(req.body)
      const result = await db.collection("todos").insertOne(body)
      const todo = await db
        .collection("todos")
        .findOne({ _id: result.insertedId })
      return res.status(200).json(todo)

    default:
      res.setHeader("Allow", ["GET", "POST"])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
