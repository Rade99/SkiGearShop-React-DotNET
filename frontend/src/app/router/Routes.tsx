import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import HomePage from "../../features/home/HomePage";
import { ContactPage } from "@mui/icons-material";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import NotFound from "../api/errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            {path: "catalog", element: <Catalog />},
            {path: "catalog/:id", element: <ProductDetails />},
            {path: "about", element: <AboutPage />},
            {path: "contact", element: <ContactPage />},
            {path: "not-found", element: <NotFound />},
            {path: "basket", element: <BasketPage />},
            {path: "*", element: <Navigate replace to="/not-found" />},
        ]
    }
])