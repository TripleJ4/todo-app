import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "utils/mongodb"
import ITodo, { tryCreateTodo } from "interfaces/ITodo"
import {getTodos} from "server/todos"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method
  if (!(method === "GET" || method === "POST")) {
    res.setHeader("Allow", ["GET", "POST"])
    return res.status(405).end(`Method ${method} Not Allowed`)
  }

  switch (method) {
    case "GET":
      const todos = await getTodos()
      return res.status(200).json(todos)

    case "POST":
      const { db } = await connectToDatabase()
      const newTodo = JSON.parse(req.body)

      const response = tryCreateTodo(newTodo)
      if (!response.success) {
        return res.status(400).end("Todo is not valid")
      }

      const result = await db.collection("todos").insertOne(response.payload)
      const todo: ITodo = await db
        .collection("todos")
        .findOne({ _id: result.insertedId })
      return res.status(200).json(todo)

    default:
      res.setHeader("Allow", ["GET", "POST"])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
