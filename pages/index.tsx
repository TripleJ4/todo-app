import useRealmApp from "hooks/useRealmApp"
import useTodos from "hooks/useTodos"
import useAddTodo from "hooks/useAddTodo"
import useDeleteTodo from "hooks/useDeleteTodo"
import useUpdateTodo from "hooks/useUpdateTodo"

import AuthForms from "components/organisms/AuthForms"

import { Layout, Typography, Input, Form, List, Button } from "antd"
import Todo from "components/molecules/Todo"

const { Sider, Content } = Layout
const { Title } = Typography

const Index = () => {
  const app = useRealmApp()
  const { status, data: todos, error, isFetching } = useTodos()

  const addTodoMutation = useAddTodo()
  const deleteTodoMutation = useDeleteTodo()
  const updateTodoMutation = useUpdateTodo()

  const [form] = Form.useForm()

  if (!app.currentUser) {
    return <AuthForms />
  }

  const onFinish = (values: { text: string }) => {
    addTodoMutation.mutate({
      // TODO: Include generated _id
      user_id: app.currentUser.id,
      text: values.text,
      completed: false,
    })
    form.resetFields()
  }

  return (
    <Layout className="min-h-screen">
      <Sider width={350} collapsible>
        <Button onClick={() => app.logOut()}>Log Out</Button>
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
            loading={status === "loading"}
            dataSource={todos}
            renderItem={(todo) => {
              return (
                <Todo
                  todo={todo}
                  onComplete={() => deleteTodoMutation.mutate(todo._id)}
                  onEdit={(text) =>
                    updateTodoMutation.mutate({
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

// export async function getServerSideProps() {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery("todos", getTodosServer)

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

export default Index
