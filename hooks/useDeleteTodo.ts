import { remove } from "lodash"
import useCollection from "hooks/useCollection"
import { useQueryClient, useMutation } from "react-query"
import ITodo from "interfaces/ITodo"

const useDeleteTodo = () => {
  const todosCollection = useCollection("todos")
  const queryClient = useQueryClient()

  return useMutation(
    async (_id: string) => {
      await todosCollection.deleteOne({ _id })
    },
    {
      onMutate: async (_id) => {
        await queryClient.cancelQueries("todos")
        const previousTodos = queryClient.getQueryData<ITodo[]>("todos")
        const newTodos: ITodo[] = previousTodos.slice()
        remove(newTodos, (todo: ITodo) => todo._id === _id)
        queryClient.setQueryData<ITodo[]>("todos", newTodos)
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

export default useDeleteTodo
