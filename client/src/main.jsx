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

// react router dom v6
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path="/" element={<App />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="notes" element={<Note />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
