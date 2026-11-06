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
import { SERVER_URL } from './config';

const queryClient = new QueryClient();

// Loaders: list pages fall back to an empty list if the API is unreachable or errors,
// so the page still renders instead of crashing.
const loadList = async (path) => {
  try {
    const res = await fetch(`${SERVER_URL}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    return [];
  }
};

// Single-item loader: show the error page if the item can't be loaded.
const loadItem = async (path) => {
  const res = await fetch(`${SERVER_URL}${path}`);
  if (!res.ok) throw new Response('Not Found', { status: res.status });
  return res.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => loadList('/available-foods'),
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
        loader: () => loadList('/available-foods')
      },
      {
        path: 'food/:id',
        element: <PrivateRoute><FoodDetails></FoodDetails></PrivateRoute>,
        loader: ({ params }) => loadItem(`/food/${params.id}`), 
      },
      {
        path: 'update-food/:id',
        element: <PrivateRoute><UpdateFood></UpdateFood></PrivateRoute>,
      },
      {
        path: 'forget-password',
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: 'manage-foods',
        element: <PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>,
        loader: () => loadList('/food')
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
