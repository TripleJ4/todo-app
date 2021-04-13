import useCollection from "hooks/useCollection"
import { useQueryClient, useMutation } from "react-query"
import ITodo from "interfaces/ITodo"

const useAddTodo = () => {
  const todosCollection = useCollection("todos")
  const queryClient = useQueryClient()

  return useMutation(
    async (todo: ITodo) => {
      await todosCollection.insertOne(todo)

      //   const result = await todosCollection.insertOne(todo)
      //   // This new todo isn't actually being used for anything
      //   const newTodo: ITodo[] = await todosCollection.find({
      //     _id: result.insertedId,
      //   })
      //   console.log("newTodo: ", newTodo[0])
      //   return newTodo[0]
    },
    {
      onMutate: async (newTodo) => {
        await queryClient.cancelQueries("todos")
        const previousTodos = queryClient.getQueryData<ITodo[]>("todos")
        queryClient.setQueryData<ITodo[]>("todos", (old) => [...old, newTodo])
        return { previousTodos }
      },
      onError: (err, newTodo, context: { previousTodos?: ITodo[] }) => {
        if (context?.previousTodos) {
          queryClient.setQueryData<ITodo[]>("todos", context.previousTodos)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("todos")
      },
    }
  )
}

export default useAddTodo
