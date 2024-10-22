import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import ResourcesPage from "./pages/BSIT/Resources";
import CurriculumForm from "./pages/BSIT/Curriculum";
import LandingPage from "./pages/BSIT/LandingPage";
import StudentLogin from "./pages/BSIT/StudentPortal";
import StudentDashboard from "./pages/BSIT/StudentDashboard";
import ContactForm from "./pages/BSIT/Contact";
import MissionPage from "./pages/BSIT/Mission";
import { BSITRouter } from "./pages/BSIT/BSITRouter";

export const router = createBrowserRouter(
    BSITRouter
);
