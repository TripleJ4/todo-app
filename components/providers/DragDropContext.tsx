import { DragDropContext as DndDragDropContext } from "react-beautiful-dnd"
import { ObjectId } from "bson"
import useDays from "hooks/useDays"
import useUpdateDay from "hooks/useUpdateDay"
import { cloneDeep } from "lodash"

type DragDropContextProps = {
  children: React.ReactNode
}

const reorder = (arr: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(arr)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  console.log("reorder result: ", result)
  return result
}

const DragDropContext = ({ children }: DragDropContextProps) => {
  const { data: days } = useDays()
  const updateDayMutation = useUpdateDay()

  const onDragEnd = (result, provided) => {
    // const dayId = ObjectId.createFromHexString(result.source.droppableId)
    // console.log("dayId: ", dayId)
    const day = days.find((day) => {
      console.log("id: ", day._id.toHexString())
      return day._id.toHexString() === result.source.droppableId
    })
    updateDayMutation.mutate({
      _id: day._id,
      data: {
        todos: reorder(
          day.todos,
          result.source.index,
          result.destination.index
        ),
      },
    })
  }

  return (
    <DndDragDropContext onDragEnd={onDragEnd}>{children}</DndDragDropContext>
  )
}

export default DragDropContext
