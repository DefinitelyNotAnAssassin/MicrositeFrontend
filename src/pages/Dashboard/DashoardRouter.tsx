import NoMatch from "../NoMatch";
import CurriculumForm from "./Curriculum";
import Logout from "./Logout";
import ManageArticles from "./ManageArticles";
import ProgramChairLogin from "./ProgramChairPortal";
import ProgramDashboard from "./ProgramDashboard";



export const DashboardRouter =[{
    path: "/",
    element: <ProgramDashboard />,
   
},
{
    path: "/curriculum",
    element: <CurriculumForm />,
   
},
{
    path: "/program_chair_login",   
    element: <ProgramChairLogin />,
},

{
    path: "/manage_articles",
    element: <ManageArticles />,
},
{
    path: "/logout",
    element: <Logout />,
},
{
    path: "*",
    element: <NoMatch />,
},
]