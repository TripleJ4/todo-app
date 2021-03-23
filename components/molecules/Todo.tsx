import { useState } from "react"
import ITodo from "interfaces/ITodo"
import { List, Checkbox, Typography } from "antd"

const { Text } = Typography

type TodoProps = {
  todo: ITodo
  onComplete: () => void
  onEdit: (text: string) => void
}

const Todo = ({ todo, onComplete, onEdit }: TodoProps) => {
  const [text, setText] = useState(todo.text)

  return (
    <List.Item className="justify-start">
      <Checkbox
        className="mr-4"
        checked={todo.completed}
        onChange={(e) => {
          if (e.target.checked) {
            onComplete()
          }
        }}
      />
      <Text
        className="w-full flex justify-between"
        editable={{
          tooltip: false,
          onChange: (val) => {
            if (val !== todo.text) {
              setText(val)
              onEdit(val)
            }
          },
        }}
      >
        {text}
      </Text>
    </List.Item>
  )
}

export default Todo
