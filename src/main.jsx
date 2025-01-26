import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './components/Profile/Profile';
import AddFood from './components/AddFood/AddFood';
import AvailableFoods from './components/AvailableFoods/AvailableFoods';
import FoodDetails from './components/FoodDetails/FoodDetails';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ManageMyFoods from './components/ManageMyFoods/ManageMyFoods';
import UpdateFood from './components/UpdateFood/UpdateFood';
import MyFoodRequest from './components/MyFoodRequest/MyFoodRequest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('https://a10-server-seven.vercel.app/available-foods'),
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'add-food',
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
      },
      {
        path: 'available-foods',
        element: <AvailableFoods></AvailableFoods>,
        loader: () => fetch('https://a10-server-seven.vercel.app/available-foods')
      },
      {
        path: 'food/:id',
        element: <PrivateRoute><FoodDetails></FoodDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://a10-server-seven.vercel.app/food/${params.id}`), 
      },
      {
        path: 'update-food/:id',
        element: <PrivateRoute><UpdateFood></UpdateFood></PrivateRoute>,
        loader: ({ params }) => fetch(`https://a10-server-seven.vercel.app/update-food/${params.id}`)
      },
      {
        path: 'forget-password',
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: 'manage-foods',
        element: <PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>,
        loader: () => fetch(`https://a10-server-seven.vercel.app/food`)
      },
      {
        path: 'my-food-request',
        element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
      <Toaster />
    </HelmetProvider>
  </StrictMode>
)
