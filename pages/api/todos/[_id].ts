import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectID } from "mongodb"
import { connectToDatabase } from "utils/mongodb"
import { tryCreateTodo } from "interfaces/ITodo"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method
  if (!(method === "GET" || method === "PUT" || method === "DELETE")) {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"])
    return res.status(405).end(`Method ${method} Not Allowed`)
  }

  const { db } = await connectToDatabase()
  let { _id } = req.query
  _id = new ObjectID(_id)

  switch (method) {
    case "GET":
      const todo = await db.collection("todos").findOne({ _id })
      const response = tryCreateTodo(todo)
      if (!response.success) {
        return res.status(400).end("Todo is not valid")
      }
      return res.status(200).json(response.payload)

    case "PUT":
      // TODO: Implement PUT request
      return res.status(200).end()

    case "DELETE":
      // TODO: Check if this actually worked
      await db.collection("todos").deleteOne({ _id })
      return res.status(204).end()

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
