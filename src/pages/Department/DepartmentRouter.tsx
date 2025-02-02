import React from 'react';
import LandingPage from '@/pages/Department/LandingPage'; 
import ResourcesPage from '@/pages/Program/Resources';
import CurriculumForm from '@/pages/Dashboard/Curriculum';
import MissionPage from '@/pages/Program/Mission';
import StudentLogin from '@/pages/Program/StudentPortal';
import StudentDashboard from '@/pages/Program/StudentDashboard';
import ContactForm from '@/pages/Program/Contact';
import NoMatch from '@/pages/NoMatch';
import ProgramDashboard from '@/pages/Dashboard/ProgramDashboard';
import ProgramChairLogin from '@/pages/Dashboard/ProgramChairPortal';
import ArticlesPage from '@/pages/Department/ArticlesPage';
import ViewArticle from '@/pages/Program/ViewArticle';
import path from 'path';
import { GetSubdomain } from '@/utils/Subdomain';



const subdomain = GetSubdomain();

export const DepartmentRouter = [{
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