import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./pages/AuthLayout";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./pages/MainLayout";
import { useAuth } from "./providers/user.context";
import TasksPage from "./pages/TasksPage";
import ProfilePage from "./pages/ProfilePage";
import TaskDeatilPage from "./pages/TaskDeatilPage";
import ContactPage from "./pages/ContactPage";

function ProtectedRoute({ children }) {
  const { loggedInUser } = useAuth();
  if (loggedInUser === null) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

function UserLoggedInRoute({ children }) {
  const { loggedInUser } = useAuth();
  if (loggedInUser !== null) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tasks" element={<TasksPage />}>
          <Route path=":taskId" element={<TaskDeatilPage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/auth"
        element={
          <UserLoggedInRoute>
            <AuthLayout />
          </UserLoggedInRoute>
        }
      >
        <Route index path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
