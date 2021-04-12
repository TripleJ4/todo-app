import useRealmApp from "hooks/useRealmApp"
import { useQuery } from "react-query"

const useTodos = () => {
  const app = useRealmApp()
  const mongodb = app.currentUser?.mongoClient("mongodb-atlas")
  if (!mongodb) return null
  const todosCollection = mongodb.db("development").collection("todos")

  //   const queryClient = useQueryClient()
  const { data: todos } = useQuery("todos", async () => {
    return await todosCollection.find({})
  })
  return todos
}

export default useTodos
