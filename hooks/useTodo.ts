import useCollection from "hooks/useCollection"
import { useQuery } from "react-query"
import ITodo from "interfaces/ITodo"

const useTodo = (_id: string) => {
  const todosCollection = useCollection("todos")

  return useQuery(["todos", _id], async () => {
    const todo: ITodo = await todosCollection.findOne({ _id })
    return todo
  })
}

export default useTodo
