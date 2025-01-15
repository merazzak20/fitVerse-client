import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register.jsx";
import Login from "../Pages/Login/Login.jsx";
import Classes from "../Pages/AllClasses/Classes.jsx";
import AllTrainer from "../Pages/AllTrainer/AllTrainer.jsx";
import TrainerDetails from "../Pages/AllTrainer/AllTrainerComponent/TrainerDetails.jsx";
import Booking from "../Pages/Booking/Booking.jsx";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allClasses",
        element: <Classes></Classes>,
      },
      {
        path: "/allTrainer",
        element: <AllTrainer></AllTrainer>,
      },
      {
        path: "/allTrainer/:id",
        element: <TrainerDetails></TrainerDetails>,
      },
      {
        path: "/booking",
        element: <Booking></Booking>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
