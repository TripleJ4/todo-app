import useCollection from "hooks/useCollection"
import { useQueryClient, useMutation } from "react-query"
import IDay from "interfaces/IDay"

const useAddDay = () => {
  const daysCollection = useCollection("days")
  const queryClient = useQueryClient()

  return useMutation(
    async (day: IDay) => {
      await daysCollection.insertOne(day)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("days")
      },
    }
  )
}

export default useAddDay
