import { message } from "antd";
import { createTodo } from "../api/todo-api";
import { useFetchTodos } from "./useFetchTodos";
import { useRecoilState } from "recoil";
import { todoPaginationState } from "../state/app-state";

export function useAddTodo() {
  const [messageApi, contextHolder] = message.useMessage();
  const [fetchTodos] = useFetchTodos();
  const [paginationState, setPaginationState] =
    useRecoilState(todoPaginationState);

  const addTodo = async (title, description) => {
    try {
      await createTodo({ title, description });
      const newFilter = paginationState.filter !== "all" ? "pending" : "all";

      await fetchTodos(1, 1, newFilter);

      setPaginationState((s) => ({ ...s, filter: newFilter }));
      return true;
    } catch (error) {
      console.error(error);
      messageApi.error("Error adding todo!", 3);

      return false;
    }
  };

  return [addTodo, contextHolder];
}
