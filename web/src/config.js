const configs = {
  local: {
    API: {
      todoApi: "http://localhost:3000",
    },
  },
  dev: {
    API: {
      todoApi:
        "https://akcsujhdtb.execute-api.ap-southeast-2.amazonaws.com/dev",
    },
  },
};

export function getHeaders() {
  return {
    "content-type": "application/json",
    authorization: localStorage.getItem("token"),
  };
}

const env = (import.meta.env.VITE_ENV ?? "local").toLowerCase();

export const config = configs[env];
