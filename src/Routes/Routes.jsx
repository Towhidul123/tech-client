import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/SignIn-SignUp/Login";
import Products from "../pages/Products/Products";
import Register from "../pages/SignIn-SignUp/Register";
import ProductDetails from "../pages/Products/ProductDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AddProduct from "../pages/Dashboard/MyProfile/AddProduct";
import MyProduct from "../pages/Dashboard/MyProfile/MyProduct";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Error from "../pages/Error/Error";
import DefaultDashboard from "../pages/Dashboard/DefaultDashboard";
import ProductReview from "../pages/Dashboard/Moderator/ProductReview";
import ReportedContent from "../pages/Dashboard/Moderator/ReportedContent";
import ModReview from "../pages/Dashboard/Moderator/ModReview";
import AdminStats from "../pages/Dashboard/Admin/AdminStats";
import ManageCoupon from "../pages/Dashboard/Admin/ManageCoupon";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/products',
            element: <Products></Products>
        },

        {
          path:'login',
          element:<Login></Login>
        },
        
        {
          path:'register',
          element:<Register></Register>
        },
        
        {
          path:'/products/:productId',
          element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
          loader: ({ params }) => fetch(`http://localhost:5000/products/${params.productId}`)

        },

        {
          path:'/productReview/:productId',
          element:<PrivateRoute><ModReview></ModReview></PrivateRoute>,
          loader: ({ params }) => fetch(`http://localhost:5000/productReview/${params.productId}`)

        }



      ]
    },

    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement:<Error></Error>,
      children:[
        {
          path:'DashBoard',
          element:<DefaultDashboard></DefaultDashboard>
        },
        {
          path:'MyProfile',
          element:<MyProfile></MyProfile>
        },
        {
          path:'AddProducts',
          element:<AddProduct></AddProduct>
        },
        {
          path:'MyProduct',
          element:<MyProduct></MyProduct>
        },

        {
          path:'users',
          element:<AllUsers></AllUsers>
        },

        {
          path:'ProductReview',
          element:<ProductReview></ProductReview>
        },
        {
          path:'ReportedContent',
          element:<ReportedContent></ReportedContent>
        },
        {
          path:'Statistics',
          element:<AdminStats></AdminStats>
        },
        {
          path:'Coupon',
          element:<ManageCoupon></ManageCoupon>
        }
      ]
    }
  ]);

  export default router;