import useCollection from "hooks/useCollection"
import { useQuery } from "react-query"
import ITodo from "interfaces/ITodo"

const useTodo = (_id: string) => {
  const todosCollection = useCollection("todos")

  return useQuery(["todos", _id], async () => {
    const todos: ITodo[] = await todosCollection.find({ _id })
    console.log("TODO: ", todos[0])
    return todos[0]
  })
}

export default useTodo
