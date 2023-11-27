import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/SignIn-SignUp/Login";
import Products from "../pages/Products/Products";
import Register from "../pages/SignIn-SignUp/Register";
import ProductDetails from "../pages/Products/ProductDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
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

        }



      ]
    },
  ]);

  export default router;