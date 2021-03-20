import { useState, useEffect } from "react"
import { Layout, Typography, Input, Form, List, Checkbox } from "antd"

const { Sider, Content } = Layout
const { Title } = Typography

type Todo = {
  _id: string
  text: string
  completed: boolean
}

const Index = () => {
  const [form] = Form.useForm()
  const [todos, setTodos] = useState<Array<Todo>>([])

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos", { method: "GET" })
      const todos = await response.json()
      setTodos(todos)
    }
    fetchTodos()
  }, [])

  const onFinish = async (values: { text: string }) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text: values.text, completed: false }),
    })
    const todo = await response.json()
    setTodos(todos.concat([todo]))
    form.resetFields()
  }

  const deleteTodo = async (_id: string) => {
    const response = await fetch(`/api/todos/${_id}`, { method: "DELETE" })
    if (response.ok) {
      const index = todos.findIndex((todo) => todo._id === _id)
      if (index !== -1) {
        todos.splice(index, 1)
        setTodos(todos)
      }
    }
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
            <Form.Item name="text">
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
                <List.Item key={todo._id}>
                  <Checkbox
                    checked={todos[i].completed}
                    onChange={(e) => {
                      if (e.target.checked) {
                        todos[i].completed = true
                        deleteTodo(todo._id)
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
