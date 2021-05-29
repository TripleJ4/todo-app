import { Draggable as DndDraggable } from "react-beautiful-dnd"

const Draggable = ({ draggableId, index, children }) => {
  return (
    <DndDraggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </DndDraggable>
  )
}

export default Draggable
