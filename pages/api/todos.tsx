import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "utils/mongodb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase()

  const todos = await db.collection("todos").find({}).toArray()
  console.log(todos)

  res.json(todos)
}
