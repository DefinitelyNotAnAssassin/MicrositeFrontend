import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProgramRouter } from "./pages/Program/ProgramRouter";
import { GetSubdomain } from "./utils/Subdomain";
import { DepartmentRouter } from "./pages/Department/DepartmentRouter";
import { DashboardRouter } from "./pages/Dashboard/DashoardRouter"; 


const subdomain = GetSubdomain();
var routes = [] 


switch (subdomain) { 

    case "scmcs": 
    case "sithm":
    case "sase": 
    case "snahs": 
    case "smls": 
        routes = DepartmentRouter;
        break;


    case "bsit":
    case "bmma":
    case "bacomm":
        routes = ProgramRouter;
        break;

    case "dashboard":
        routes = DashboardRouter;
        break;

    
    default:
        routes = ProgramRouter;
        location.href = subdomain != "localhost" ? location.href.replace(subdomain, "bsit") : location.href.replace("localhost", "bsit.localhost");


        break;


} 

export const router = createBrowserRouter(routes);

