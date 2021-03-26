import ITodo from "interfaces/ITodo"

export async function getTodos() {
  const response = await fetch("/api/todos", { method: "GET" })
  if (!response.ok) {
    // TODO: Throw actual error from response
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

export async function getTodo(_id: string) {
  const response = await fetch(`/api/todos/${_id}`, { method: "GET" })
  if (!response.ok) {
    // TODO: Throw actual error from response
    throw new Error("Network response was not ok")
  }

  const todo: ITodo = await response.json()
  return todo
}

export async function patchTodo({ _id, data }: { _id: string; data: any }) {
  const response = await fetch(`api/todos/${_id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
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
    // TODO: Throw actual error from response
    throw new Error("Network response was not ok")
  }

  return null
}
