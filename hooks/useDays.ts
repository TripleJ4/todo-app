import useCollection from "hooks/useCollection"
import { useQuery } from "react-query"
import IDay from "interfaces/IDay"

const useDays = () => {
  const daysCollection = useCollection("days")

  return useQuery("days", async () => {
    const days: IDay[] = await daysCollection.find({})
    return days
  })
}

export default useDays
