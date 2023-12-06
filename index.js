import ReactDOM from "react-dom/client";
import App from "./src/App";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import Home from "./src/pages/Home";
import NewPost from "./src/pages/NewPost";
import UserProfile from "./src/pages/UserProfile";
import Post from "./src/pages/Post";
import AccountSettings from "./src/pages/AccountSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      { path: "/newpost", element: <NewPost /> },
      { path: "/:username", element: <UserProfile /> },
      { path: "post/:postId", element: <Post /> },
      { path: "/account/setting", element: <AccountSettings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
