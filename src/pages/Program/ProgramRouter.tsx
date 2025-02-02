import React from 'react';
import LandingPage from './LandingPage'; 
import ResourcesPage from './Resources';
import CurriculumForm from '../Dashboard/Curriculum';
import MissionPage from './Mission';
import StudentLogin from './StudentPortal';
import StudentDashboard from './StudentDashboard';
import ContactForm from './Contact';
import NoMatch from '../NoMatch';
import ProgramDashboard from '../Dashboard/ProgramDashboard';
import ProgramChairLogin from '../Dashboard/ProgramChairPortal';
import ArticlesPage from './ArticlesPage';
import ViewArticle from './ViewArticle';
import path from 'path';
import { GetSubdomain } from '@/utils/Subdomain';
import ManageArticles from '../Dashboard/ManageArticles';



const subdomain = GetSubdomain();

export const ProgramRouter = [{
    path: "/",
    element: <LandingPage />,
   
},
{
    path: "/articles",  
    element: <ArticlesPage  />,

},

{
    path: "/resources",
    element: <ResourcesPage  />,
   
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
    path: "/program_dashboard",    
    element: <ProgramDashboard />,
},
{
    path: "/manage_articles",
    element: <ManageArticles />,
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