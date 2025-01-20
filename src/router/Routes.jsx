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
import AddForum from "../Pages/Dashboard/Trainer/AddForum.jsx";
import AllForums from "../Pages/Forums/AllForums.jsx";
import AdminRouter from "./AdminRouter.jsx";
import TrainerRouter from "./TrainerRouter.jsx";

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
        path: "/allForums",
        element: <AllForums></AllForums>,
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
        element: (
          <PrivateRouter>
            <AdminRouter>
              <AllSubscriber></AllSubscriber>
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "adminAllTrainer",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <AdminAllTrainer></AdminAllTrainer>
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "applliedTrainer",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <AppliedTrainer></AppliedTrainer>
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "applliedTrainer/:id",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <ApplicantDetails></ApplicantDetails>
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <Statistics></Statistics>
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "addClasses",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <AddClasses></AddClasses>
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "adminAddForum",
        element: (
          <PrivateRouter>
            <AddForum></AddForum>
          </PrivateRouter>
        ),
      },

      // Trainer
      {
        path: "manageSlots",
        element: (
          <PrivateRouter>
            <TrainerRouter>
              <ManageSlots></ManageSlots>
            </TrainerRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "addSlots",
        element: (
          <PrivateRouter>
            <TrainerRouter>
              <AddSlot></AddSlot>
            </TrainerRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "addForum",
        element: (
          <PrivateRouter>
            <AddForum></AddForum>
          </PrivateRouter>
        ),
      },

      // Member
      {
        path: "paymentHistory",
        element: (
          <PrivateRouter>
            <PaymentHistory></PaymentHistory>
          </PrivateRouter>
        ),
      },
      {
        path: "myBooking",
        element: (
          <PrivateRouter>
            <MyBooking></MyBooking>
          </PrivateRouter>
        ),
      },
      {
        path: "memberToTrainer",
        element: (
          <PrivateRouter>
            <TrainerApplication></TrainerApplication>
          </PrivateRouter>
        ),
      },

      {
        path: "profile",
        element: (
          <PrivateRouter>
            <Profile></Profile>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
