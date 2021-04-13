import useCollection from "hooks/useCollection"
import { useQuery } from "react-query"
import ITodo from "interfaces/ITodo"

const useTodos = () => {
  const todosCollection = useCollection("todos")

  return useQuery("todos", async () => {
    const todos: ITodo[] = await todosCollection.find({})
    return todos
  })
}

export default useTodos
