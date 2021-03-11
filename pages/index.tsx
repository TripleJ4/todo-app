import { useState } from "react"
import { Layout, Typography, Input, Form, List, Checkbox } from "antd"
import { findSourceMap } from "node:module"

const { Sider, Content } = Layout
const { Title } = Typography

type Todo = {
  id: string
  text: string
  completed: boolean
}

const Index = () => {
  const [form] = Form.useForm()
  const [todos, setTodos] = useState<Array<Todo>>([])

  const onFinish = (values: { todo: string }) => {
    setTodos(
      todos.concat([
        {
          id: `${values.todo}-${new Date().getTime()}`,
          text: values.todo,
          completed: false,
        },
      ])
    )
    form.resetFields()
  }

  const deleteTodo = (id: string) => {
    setTimeout(() => {
      const index = todos.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        todos.splice(index, 1)
        setTodos(todos)
      }
    }, 1000)
  }

  return (
    <Layout className="min-h-screen">
      <Sider width={350} collapsible>
        Sider
      </Sider>

      <Content className="bg-gray-100 w-full min-h-screen p-6">
        <div className="flex flex-col items-center max-w-xl mx-auto">
          <Title level={1}>Today</Title>
          <Form form={form} onFinish={onFinish} className="w-full">
            <Form.Item name="todo">
              <Input placeholder="What do you want to do today?" />
            </Form.Item>
          </Form>
          <List
            className="w-full"
            size="large"
            bordered
            dataSource={todos}
            renderItem={(todo, i) => {
              return (
                <List.Item key={todo.id}>
                  <Checkbox
                    checked={todos[i].completed}
                    onChange={(e) => {
                      if (e.target.checked) {
                        todos[i].completed = true
                        deleteTodo(todo.id)
                      } else {
                        todos[i].completed = false
                      }
                      setTodos(todos.slice())
                    }}
                  >
                    {todo.text}
                  </Checkbox>
                </List.Item>
              )
            }}
          />
        </div>
      </Content>
    </Layout>
  )
}

export default Index
