import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectID } from "mongodb"
import { connectToDatabase } from "utils/mongodb"

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
      return res.status(200).json(todo)

    case "PUT":
      // TODO: Implement PUT request
      return res.status(200).end()

    case "DELETE":
      await db.collection("todos").deleteOne({ _id })
      return res.status(204).end()

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
