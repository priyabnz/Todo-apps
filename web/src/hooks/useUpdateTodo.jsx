import { message } from "antd";
import { updateTodo } from "../api/todo-api";
import { useUpdateTodoState } from "../state/state-selectors";

export function useUpdateTodo() {
  const [messageApi, contextHolder] = message.useMessage();
  const updateTodoState = useUpdateTodoState();

  const swicthTodoStatus = async (todo) => {
    try {
      const updatedTodo = await updateTodo(todo);

      updateTodoState(updatedTodo);
    } catch (error) {
      console.error(error);
      messageApi.error("Error adding todo!", 3);
    }
  };

  return [swicthTodoStatus, contextHolder];
}
