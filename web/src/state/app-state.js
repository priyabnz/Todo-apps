import { atom, atomFamily } from "recoil";

export const availableTodos = atom({
  key: "AvailableTodos",
  default: [],
});

export const todosState = atomFamily({
  key: "TodosState",
  default: null,
});

export const todoPaginationState = atom({
  key: "TodoPaginationState",
  default: {
    page: 1,
    take: 5,
    isLoading: false,
    totalItems: 0,
    filter: "pending",
  },
});
