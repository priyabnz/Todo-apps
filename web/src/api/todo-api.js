import { config, getHeaders } from "../config";

export async function createTodo(todo) {
  const path = "/todos";
  const url = config.API.todoApi + path;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: getHeaders(),
    mode: "cors",
  });

  if (response.status !== 201) {
    throw new Error("Error creating todo!");
  }

  return response.json();
}

export async function getUserTodos(page, take, status) {
  const path = `/todos?page=${page}&take=${take}&status=${status}`;
  const url = config.API.todoApi + path;

  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
    mode: "cors",
  });

  if (response.status !== 200) {
    throw new Error("Error getting todos!");
  }

  return response.json();
}

export async function deleteTodo(id) {
  const path = `/todos/${id}`;
  const url = config.API.todoApi + path;

  const response = await fetch(url, {
    method: "DELETE",
    headers: getHeaders(),
    mode: "cors",
  });

  if (response.status !== 200) {
    throw new Error("Error deleting todos!");
  }
}

export async function updateTodo(todo) {
  const { _id, ...rest } = todo;
  const path = `/todos/${_id}`;
  const url = config.API.todoApi + path;

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(rest),
    headers: getHeaders(),
    mode: "cors",
  });

  if (response.status !== 200) {
    throw new Error("Error updating todo!");
  }

  return response.json();
}
