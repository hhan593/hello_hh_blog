// src/router/index.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../routes/HomePage";
import PostListPage from "../routes/PostListPage";
import LoginPage from "../routes/LoginPage";
import Register from "../routes/Register";
import WritePage from "../routes/WritePage";
import SignlePostPage from "../routes/SignlePostPage";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Setting from "../routes/Setting";
import NotFound from "../routes/NotFound";
import Message from "./Message";
import { isLoggedIn } from "../utils/auth";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={isLoggedIn() ? "/home" : "/login"} replace />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoute>
            <PostListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/write",
        element: (
          <ProtectedRoute>
            <WritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/settings",
        element: <Setting />,
      },
      {
        path: "/messages",
        element: (
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        ),
      },
      {
        path: "/:slug",
        element: (
          <ProtectedRoute>
            <SignlePostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
