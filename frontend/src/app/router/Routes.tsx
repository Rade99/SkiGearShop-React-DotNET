import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import { ContactPage } from "@mui/icons-material";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import NotFound from "../api/errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import CheckoutWraper from "../../features/checkout/CheckoutWraper";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {element: <RequireAuth/>, children: [
                { path: "checkout", element: <CheckoutWraper /> },
                { path: "orders", element: <Orders /> }
            ]},
            { path: "catalog", element: <Catalog /> },
            { path: "catalog/:id", element: <ProductDetails /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "not-found", element: <NotFound /> },
            { path: "basket", element: <BasketPage /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "*", element: <Navigate replace to="/not-found" /> }
        ]
    }
])