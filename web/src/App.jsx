import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { TodoPage } from "./pages/TodoPage/TodoPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <TodoPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
