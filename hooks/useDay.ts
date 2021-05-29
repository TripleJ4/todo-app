import useCollection from "hooks/useCollection"
import { useQuery } from "react-query"
import IDay from "interfaces/IDay"

const useDay = (date: Date) => {
  const daysCollection = useCollection("days")

  return useQuery(["days", date], async () => {
    const day: IDay = await daysCollection.findOne({ date })
    return day
  })
}

export default useDay
