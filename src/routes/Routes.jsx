import { createBrowserRouter } from "react-router"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import ErrorPage from "../components/ErrorPage/ErrorPage"
import ProductDetails from "../components/Home/Products/ProductDetails"
import DashBoardLayout from "../layouts/DashBoardLayout"
import MyProfile from "../components/Dashboard/Sidebar/Menu/Guest/MyProfile"
import AddProduct from "../components/Dashboard/Sidebar/Menu/Guest/AddProduct"
import MyProducts from "../components/Dashboard/Sidebar/Menu/Guest/MyProducts"
import ProductReviewQueue from "../components/Dashboard/Sidebar/Menu/Moderator/ProductReviewQueue"
import ReportedContent from "../components/Dashboard/Sidebar/Menu/Moderator/ReportedContent"
import ManageCoupons from "../components/Dashboard/Sidebar/Menu/Admin/ManageCoupons"
import ManageUsers from "../components/Dashboard/Sidebar/Menu/Admin/ManageUsers"
import StatisticsPage from "../components/Dashboard/Sidebar/Menu/Admin/StatisticsPage"
import UpdateProduct from "../components/Dashboard/Sidebar/Menu/Guest/UpdateProduct"
import Products from "../components/Home/Products/Products"


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
            },
            {
                path:'/products',
                element:<Products/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashBoardLayout/>,
        children:[
            {
                path:'/dashboard/my-profile',
                element:<MyProfile/>

            },
            {
                path:'add-product',
                element:<AddProduct/>
            
            }
            ,
            {
                path:'my-products',
                element:<MyProducts/>
            
            },
            {
                path:'product-review-queue',
                element:<ProductReviewQueue/>
            }
            ,
            {
                path:'reported-content',
                element:<ReportedContent/>
            }
            // admin
            ,
            {
                path:'manage-coupons',
                element:<ManageCoupons/>
            }
            ,
            {
                path:'manage-users',
                element:<ManageUsers/>
            }
            ,
            {
                path:'statistics',
                element:<StatisticsPage/>
            },
            {
                path:'my-products/update/:id',
                element:<UpdateProduct/>
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