import { ObjectId } from "bson"
import ITodo from "interfaces/ITodo"

interface IDay {
  _id?: ObjectId
  user_id: string
  date: Date
  todos: ITodo[]
}

export default IDay
