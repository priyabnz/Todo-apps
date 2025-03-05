import { useRecoilCallback } from "recoil";

import { availableTodos, todosState } from "./app-state";

export const useAddTodoToState = () => {
  const addTodo = useRecoilCallback(({ set }) => (todos) => {
    todos.forEach((t) => set(todosState(t._id), t));

    set(availableTodos, () => todos.map((e) => e._id));
  });

  return addTodo;
};
export const useUpdateTodoState = () => {
  const updateTodo = useRecoilCallback(({ set }) => (todo) => {
    set(todosState(todo._id), (t) => ({ ...t, ...todo }));
  });

  return updateTodo;
};
