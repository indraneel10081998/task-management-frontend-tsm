import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../routes";
import Dashboard from "./pages/Dashboard";
import PrimaryLayout from "./layouts/PrimaryLayout";
import AuthForm from "./pages/AuthForm";
import { ModalProvider } from "./context/ModalContext";
import { Provider } from "react-redux";
import store from "./app/store";
import { initializeAuthState } from "./app/slices/loginSlice";

const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: <AuthForm type="login" /> },
  { path: ROUTES.REGISTER, element: <AuthForm type="signup" /> },
  {
    path: ROUTES.BASE,
    element: <PrimaryLayout />,
    children: [{ path: "", element: <Dashboard /> }],
  },
]);

store.dispatch(initializeAuthState());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </Provider>
  </StrictMode>
);
