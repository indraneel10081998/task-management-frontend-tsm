import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../routes";
import Dashboard from "./pages/Dashboard";
import PrimaryLayout from "./layouts/PrimaryLayout";
import AuthForm from "./pages/AuthForm";
import { ModalProvider } from "./context/ModalContext";

const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: <AuthForm type="login" /> },
  { path: ROUTES.REGISTER, element: <AuthForm type="signup" /> },
  {
    path: ROUTES.BASE,
    element: <PrimaryLayout />,
    children: [{ path: "", element: <Dashboard /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </StrictMode>
);
