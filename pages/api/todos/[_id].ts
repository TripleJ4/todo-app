import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectID } from "mongodb"
import { connectToDatabase } from "utils/mongodb"
import ITodo, { tryCreateTodo } from "interfaces/ITodo"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method
  if (
    !(
      method === "GET" ||
      method === "PUT" ||
      method === "PATCH" ||
      method === "DELETE"
    )
  ) {
    res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"])
    return res.status(405).end(`Method ${method} Not Allowed`)
  }

  const { db } = await connectToDatabase()
  const todosCollection = db.collection("todos")
  let { _id } = req.query
  _id = new ObjectID(_id)

  switch (method) {
    case "GET":
      const todo = await todosCollection.findOne({ _id })
      const response = tryCreateTodo(todo)
      if (!response.success) {
        return res.status(400).end("Todo is not valid")
      }
      return res.status(200).json(response.payload)

    case "PUT":
      // TODO: Implement PUT request - this should entirely replace the todo
      return res.status(200).end()

    case "PATCH":
      const result = await todosCollection.updateOne(
        { _id },
        { $set: JSON.parse(req.body) }
      )
      const newTodo: ITodo = await todosCollection.findOne({
        _id: result.upsertedId || _id,
      })
      return res.status(200).json(newTodo)

    case "DELETE":
      await todosCollection.deleteOne({ _id })
      return res.status(204).end()

    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
