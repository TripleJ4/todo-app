import { Droppable as DndDroppable } from "react-beautiful-dnd"

const Droppable = ({ droppableId, children, className }) => {
  return (
    <DndDroppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          className={className}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </DndDroppable>
  )
}

export default Droppable
