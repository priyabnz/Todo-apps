import { message } from "antd";
import { deleteTodo } from "../api/todo-api";
import { useFetchTodos } from "./useFetchTodos";
import { useRecoilValue } from "recoil";
import { todoPaginationState } from "../state/app-state";

export function useDeleteTodo() {
  const [messageApi, contextHolder] = message.useMessage();
  const [fetchTodos] = useFetchTodos();
  const paginationState = useRecoilValue(todoPaginationState);

  const deleteTodos = async (id) => {
    try {
      await deleteTodo(id);

      await fetchTodos(paginationState.page, 5, paginationState.filter);

      return true;
    } catch (error) {
      console.error(error);
      messageApi.error("Error deleting todo!", 3);

      return false;
    }
  };

  return [deleteTodos, contextHolder];
}
