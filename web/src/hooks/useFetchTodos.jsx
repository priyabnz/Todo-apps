import { message } from "antd";
import { getUserTodos } from "../api/todo-api";
import { useRecoilState } from "recoil";
import { todoPaginationState } from "../state/app-state";
import { useAddTodoToState } from "../state/state-selectors";

export function useFetchTodos() {
  const [messageApi, contextHolder] = message.useMessage();
  const [paginationState, setPaginationState] =
    useRecoilState(todoPaginationState);
  const addTodoToState = useAddTodoToState();

  const fetchTodo = async (page = 1, take = 1, filter) => {
    try {
      const [{ notes, totalCount }] = await getUserTodos(page, take, filter);
      addTodoToState(notes);
      setPaginationState((state) => ({
        ...state,
        totalItems: totalCount,
        isLoading: false,
      }));

      return true;
    } catch (error) {
      console.error(error);
      messageApi.error("Error fetching todos!", 3);
      setPaginationState((state) => ({ ...state, isLoading: false }));

      return false;
    }
  };

  return [fetchTodo, contextHolder];
}
