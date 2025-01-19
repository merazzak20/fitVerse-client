import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register.jsx";
import Login from "../Pages/Login/Login.jsx";
import AllClasses from "../Pages/AllClasses/AllClasses.jsx";
import AllTrainer from "../Pages/AllTrainer/AllTrainer.jsx";
import TrainerDetails from "../Pages/AllTrainer/AllTrainerComponent/TrainerDetails.jsx";
import Booking from "../Pages/Booking/Booking.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import Payment from "../Pages/Payment/Payment.jsx";
import BeATrainerPage from "../Pages/BeATrainer/BeATrainerPage.jsx";
import Dashboard from "../layout/Dashboard.jsx";
import AllSubscriber from "../Pages/Dashboard/Admin/AllSubscriber.jsx";
import Profile from "../Pages/Dashboard/Common/Profile.jsx";
import AdminAllTrainer from "../Pages/Dashboard/Admin/AdminAllTrainer.jsx";
import PaymentHistory from "../Pages/Dashboard/Member/PaymentHistory.jsx";
import MyBooking from "../Pages/Dashboard/Member/MyBooking.jsx";
import TrainerApplication from "../Pages/Dashboard/Member/TrainerApplication.jsx";
import ManageSlots from "../Pages/Dashboard/Trainer/ManageSlots.jsx";
import AppliedTrainer from "../Pages/Dashboard/Admin/AppliedTrainer.jsx";
import ApplicantDetails from "../Pages/Dashboard/Admin/ApplicantDetails.jsx";
import Statistics from "../Pages/Dashboard/Admin/Statistics.jsx";
import DashboardLanding from "../Pages/Dashboard/Common/DashboardLanding.jsx";
import AddClasses from "../Pages/Dashboard/Admin/AddClasses.jsx";
import AddSlot from "../Pages/Dashboard/Trainer/AddSlot.jsx";

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
        element: <AllClasses></AllClasses>,
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
        element: (
          <PrivateRouter>
            <Booking></Booking>
          </PrivateRouter>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRouter>
            <Payment></Payment>
          </PrivateRouter>
        ),
      },
      {
        path: "/beAtriner",
        element: (
          <PrivateRouter>
            <BeATrainerPage></BeATrainerPage>
          </PrivateRouter>
        ),
      },
    ],
  },

  // Login and Register
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },

  // Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRouter>
            <DashboardLanding />
          </PrivateRouter>
        ),
      },
      // Admin Route
      {
        path: "allSubscriber",
        element: <AllSubscriber></AllSubscriber>,
      },
      {
        path: "adminAllTrainer",
        element: <AdminAllTrainer></AdminAllTrainer>,
      },
      {
        path: "applliedTrainer",
        element: <AppliedTrainer></AppliedTrainer>,
      },
      {
        path: "applliedTrainer/:id",
        element: <ApplicantDetails></ApplicantDetails>,
      },
      {
        path: "statistics",
        element: <Statistics></Statistics>,
      },
      {
        path: "addClasses",
        element: <AddClasses></AddClasses>,
      },

      // Trainer
      {
        path: "manageSlots",
        element: <ManageSlots></ManageSlots>,
      },
      {
        path: "addSlots",
        element: <AddSlot></AddSlot>,
      },

      // Member
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "myBooking",
        element: <MyBooking></MyBooking>,
      },
      {
        path: "memberToTrainer",
        element: <TrainerApplication></TrainerApplication>,
      },

      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
