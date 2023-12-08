import ReactDOM from "react-dom/client";
import App from "./src/App";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import Home from "./src/pages/Home";
import Authenticate from "./src/components/Authenticate";
import { Suspense, lazy } from "react";

const UserProfile = lazy(() => import("./src/pages/UserProfile"));
const Post = lazy(() => import("./src/pages/Post"));
const AccountSettings = lazy(() => import("./src/pages/AccountSettings"));
const NewPost = lazy(() => import("./src/pages/NewPost"));

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
          <Suspense>
            <Authenticate>
              <NewPost />
            </Authenticate>
          </Suspense>
        ),
      },
      {
        path: "/:username",
        element: (
          <Suspense>
            <Authenticate>
              <UserProfile />
            </Authenticate>
          </Suspense>
        ),
      },
      {
        path: "post/:postId",
        element: (
          <Suspense>
            <Authenticate>
              <Post />
            </Authenticate>
          </Suspense>
        ),
      },
      {
        path: "/account/setting",
        element: (
          <Suspense>
            <Authenticate>
              <AccountSettings />
            </Authenticate>
          </Suspense>
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
