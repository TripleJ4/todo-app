import IServiceResponse, {
  failureServiceResponse,
  successfulServiceResponse,
} from "interfaces/IServiceResponse"
import { isString, isBoolean } from "utils/typescript"

interface ITodo {
  _id?: string
  text: string
  completed: boolean
}

export default ITodo

/**
 * Tries to create an ITodo from any type.
 * Returns failure service response with error message if not valid ITodo.
 *
 * @param todo: any type
 */
export function tryCreateTodo(todo: any): IServiceResponse<ITodo> {
  if (isString(todo.text) && isBoolean(todo.completed)) {
    return successfulServiceResponse(todo)
  } else {
    return failureServiceResponse("Make sure todo has fields in correct format")
  }
}
