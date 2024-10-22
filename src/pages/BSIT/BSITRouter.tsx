import React from 'react';
import LandingPage from './LandingPage'; 
import ResourcesPage from './Resources';
import CurriculumForm from './Curriculum';
import MissionPage from './Mission';
import StudentLogin from './StudentPortal';
import StudentDashboard from './StudentDashboard';
import ContactForm from './Contact';
import NoMatch from '../NoMatch';
import ProgramDashboard from './ProgramDashboard';
import ProgramChairLogin from './ProgramChairPortal';
import ArticlesPage from './ArticlesPage';
import ViewArticle from './ViewArticle';
import path from 'path';



export const BSITRouter = [{
    path: "/",
    element: <LandingPage />,
   
},
{
    path: "/articles",  
    element: <ArticlesPage />,

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
    path: "/mission",    
    element: <MissionPage />,
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
    path: "/program_chair_login",
    element: <ProgramChairLogin />,
},
{
    path: "/program_dashboard",    
    element: <ProgramDashboard />,
},
{
    path: "/contact",    
    element: <ContactForm />,
},

{
    path: "/view_article",
    element: <ViewArticle />,
},
{
    path: "*",
    element: <NoMatch />,
},
]