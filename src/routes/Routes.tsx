import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Services from "@/pages/Services";
import ForgotPassword from "@/pages/ForgotPassword";
import Index from "@/pages/Index";
import Task from "@/pages/Task";
import BindAccount from "@/pages/BindAccount";
import OrderRecord from "@/pages/OrderRecord";
import Product from "@/pages/Product";
import CheckIn from "@/pages/CheckIn";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/check-in",
        element: <CheckIn />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/index",
        element: <Index />,
      },
      {
        path: "/task",
        element: <Task />,
      },
      {
        path: "/bind-account",
        element: <BindAccount />,
      },
      {
        path: "/order-record",
        element: <OrderRecord />,
      },
      {
        path: "/product",
        element: <Product />,
      },

    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
