import useCollection from "hooks/useCollection"
import { useQueryClient, useMutation } from "react-query"
import { ObjectId } from "bson"
import { set } from "lodash"

const useUpdateDay = () => {
  const daysCollection = useCollection("days")
  const queryClient = useQueryClient()

  return useMutation(
    async ({ _id, data }: { _id: ObjectId; data: any }) => {
      daysCollection.updateOne({ _id }, { $set: data })
    },
    {
      onMutate: async ({ _id, data }) => {
        console.log("onMutate: ", _id, data)
        // await queryClient.cancelQueries(["days", _id])
        const previousDay = queryClient.getQueryData(["days", _id])

        let newDay = { ...previousDay }
        Object.keys(data).map((field) => set(newDay, field, data[field]))
        queryClient.setQueryData(["days, _id"], newDay)

        return { previousDay }
      },
      onSettled: (data, error, variables) => {
        queryClient.invalidateQueries(["days", variables._id])
      },
    }
  )
}

export default useUpdateDay
