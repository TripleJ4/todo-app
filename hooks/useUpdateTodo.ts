import useCollection from "hooks/useCollection"
import { useQueryClient, useMutation } from "react-query"

const useUpdateTodo = () => {
  const todosCollection = useCollection("todos")
  const queryClient = useQueryClient()

  return useMutation(
    async ({ _id, data }: { _id: string; data: any }) => {
      todosCollection.updateOne({ _id }, { $set: data })
    },
    {
      onSuccess: () => queryClient.invalidateQueries("todos"),
    }
  )
}

export default useUpdateTodo
