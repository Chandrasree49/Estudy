import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login";
import ViewAllUsers from "../pages/ViewAllUsers";
import ViewAllStudySessions from "../pages/ViewAllStudySesssions";
import CreateStudySession from "../pages/CreateStudySession";
import ViewTutorSession from "../pages/ViewTutorSession";
import ViewTutorMaterials from "../pages/ViewTutorMaterials";
import Notes from "../pages/Notes";
import StudySessions from "../pages/StudySessions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/viewallusers",
        element: <ViewAllUsers></ViewAllUsers>,
      },
      {
        path: "/viewallsession",
        element: <ViewAllStudySessions></ViewAllStudySessions>,
      },
      {
        path: "/CreateStudySession",
        element: <CreateStudySession></CreateStudySession>,
      },
      {
        path: "/ViewTutorSession",
        element: <ViewTutorSession></ViewTutorSession>,
      },
      {
        path: "/ViewTutorMaterials",
        element: <ViewTutorMaterials></ViewTutorMaterials>,
      },
      {
        path: "/Notes",
        element: <Notes></Notes>,
      },
      {
        path: "/StudySessions",
        element: <StudySessions></StudySessions>,
      },
    ],
  },
]);
