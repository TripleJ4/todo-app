import ITodo from "interfaces/ITodo"

export async function getTodos() {
  const response = await fetch("/api/todos", { method: "GET" })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const todos: ITodo[] = await response.json()
  return todos
}

export async function postTodo(todo: ITodo) {
  const response = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
  })
  if (!response.ok) {
    // TODO: Throw actual error from response
    throw new Error("Network response was not ok")
  }

  const newTodo: ITodo = await response.json()
  return newTodo
}

export async function deleteTodo(_id: string) {
  const response = await fetch(`/api/todos/${_id}`, { method: "DELETE" })
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return null
}
