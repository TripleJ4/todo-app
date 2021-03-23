import { useQuery, useMutation, useQueryClient } from "react-query"
import { getTodos, postTodo, patchTodo, deleteTodo } from "api/todos"

import { Layout, Typography, Input, Form, List } from "antd"
import Todo from "components/molecules/Todo"

const { Sider, Content } = Layout
const { Title } = Typography

const Index = () => {
  const queryClient = useQueryClient()
  const query = useQuery("todos", getTodos)
  const todos = query.data
  // TODO don't invalidate bc we already have new todo
  const postTodoMutation = useMutation(postTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  })
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  })
  const patchTodoMutation = useMutation(patchTodo, {
    onSuccess: () => queryClient.invalidateQueries("todos"),
  })
  const [form] = Form.useForm()

  const onFinish = (values: { text: string }) => {
    postTodoMutation.mutate({ text: values.text, completed: false })
    form.resetFields()
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
            renderItem={(todo) => {
              return (
                <Todo
                  todo={todo}
                  onComplete={() => deleteTodoMutation.mutate(todo._id)}
                  onEdit={(text) =>
                    patchTodoMutation.mutate({
                      _id: todo._id,
                      data: { text: text },
                    })
                  }
                  key={todo._id}
                />
              )
            }}
          />
        </div>
      </Content>
    </Layout>
  )
}

export default Index
