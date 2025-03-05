import { message } from "antd";
import { loginUser } from "../api/user-api";
import { useNavigate } from "react-router-dom";

export function useLoginUser() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(error);
      messageApi.error("Error logging user!", 3);
    }
  };

  return [login, contextHolder];
}
