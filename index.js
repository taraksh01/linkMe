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
import Authenticate from "./src/components/Authenticate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Authenticate>
            <Home />
          </Authenticate>
        ),
      },
      {
        path: "/login",
        element: (
          <Authenticate>
            <Login />
          </Authenticate>
        ),
      },
      {
        path: "/register",
        element: (
          <Authenticate>
            <Signup />
          </Authenticate>
        ),
      },
      {
        path: "/newpost",
        element: (
          <Authenticate>
            <NewPost />
          </Authenticate>
        ),
      },
      {
        path: "/:username",
        element: (
          <Authenticate>
            <UserProfile />
          </Authenticate>
        ),
      },
      {
        path: "post/:postId",
        element: (
          <Authenticate>
            <Post />
          </Authenticate>
        ),
      },
      {
        path: "/account/setting",
        element: (
          <Authenticate authorized>
            <AccountSettings />
          </Authenticate>
        ),
      },
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
