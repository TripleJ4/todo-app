import { ObjectId } from "bson"

interface ITodo {
  _id?: ObjectId
  user_id: string
  text: string
  completed: boolean
}

export default ITodo
