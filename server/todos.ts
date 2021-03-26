import { connectToDatabase } from "utils/mongodb"
import ITodo, { tryCreateTodo } from "interfaces/ITodo"

// Async functions that are also called in getStaticProps / getServerSideProps
// TODO: This function should throw an error on fail
export async function getTodos() {
  const { db } = await connectToDatabase()
  const todos = await db.collection("todos").find({}).toArray()

  let validTodos: ITodo[] = []
  todos.forEach((todo: ITodo) => {
    const response = tryCreateTodo(todo)
    if (response.success) {
      validTodos.push(response.payload)
    }
  })

  return JSON.parse(JSON.stringify(validTodos))
}
