import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { AuthLayout } from "./components/AuthLayout";
import App from "./App";
import Note from "./pages/Note";
import "./index.css";
import AllNotePage from "./pages/AllNotePage";
import TodoPage from "./pages/TodoPage";
import CalendarPage from "./pages/CalendarPage";

// react router dom v6
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path="/" element={<App />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="notes" element={<AllNotePage />} />
        <Route path="notes/:id" element={<Note />} />
        <Route path="todos" element={<TodoPage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
