import { config, getHeaders } from "../config";

export async function registerUser(user) {
  const path = "/users/register";
  const url = config.API.todoApi + path;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: getHeaders(),
    mode: "cors",
  });

  if (response.status !== 200) {
    throw new Error("Error registering user!");
  }

  return response.json();
}

export async function loginUser(user) {
  const path = "/users/login";
  const url = config.API.todoApi + path;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: getHeaders(),
    mode: "cors",
  });

  if (response.status !== 200) {
    throw new Error("Error logging in user!");
  }

  return response.json();
}
