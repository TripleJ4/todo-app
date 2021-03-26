import { QueryClient, useQuery, useMutation, useQueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import { getTodos, postTodo, patchTodo, deleteTodo } from "client/todos"
import { getTodos as getTodosServer } from "server/todos"
import ITodo from "interfaces/ITodo"

import { Layout, Typography, Input, Form, List } from "antd"
import Todo from "components/molecules/Todo"

const { Sider, Content } = Layout
const { Title } = Typography

const Index = () => {
  const queryClient = useQueryClient()
  const { data: todos } = useQuery("todos", getTodos)

  // TODO update with property typescript usage
  // https://react-query.tanstack.com/examples/optimistic-updates-typescript
  const postTodoMutation = useMutation(postTodo, {
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries("todos")
      const previousTodos = queryClient.getQueryData<ITodo[]>("todos")
      queryClient.setQueryData<ITodo[]>("todos", (old) => [...old, newTodo])
      return { previousTodos }
    },
    onError: (err, newTodo, context: { previousTodos?: ITodo[] }) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<ITodo[]>("todos", context.previousTodos)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("todos")
    },
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

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("todos", getTodosServer)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Index
