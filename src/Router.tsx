import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import ResourcesPage from "./pages/Resources";
import CurriculumForm from "./pages/Curriculum";
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentPortal";
import StudentDashboard from "./pages/StudentDashboard";
import ContactForm from "./pages/Contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
       
    },

    {
        path: "/resources",
        element: <ResourcesPage />,
       
    },
    {
        path: "/curriculum",
        element: <CurriculumForm />,
       
    },
    {
        path: "/student_portal",    
        element: <StudentLogin />,
    },
    {
        path: "/student_dashboard",    
        element: <StudentDashboard />,
    },
    {
        path: "/contact",    
        element: <ContactForm />,
    },

    {
        path: "*",
        element: <NoMatch />,
    },
]);
