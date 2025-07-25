import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import ErrorPage from "../components/ErrorPage/ErrorPage"
import ProductDetails from "../components/Home/Products/ProductDetails"
import Dashboard from "../pages/Dashboard/Dashboard"
import DashBoardLayout from "../layouts/DashBoardLayout"


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/products/:id',
                element: <ProductDetails />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashBoardLayout/>,
        children:[
            {
                
            }
        ]
    },


    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }



])