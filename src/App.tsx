import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import Navbar from "./pages/BSIT/Navbar"
import LandingPage from "./pages/BSIT/LandingPage"
import Articles from "./pages/BSIT/Articles"
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";  

export default function App() {
    return (
        <>

        <RouterProvider router={router} />
        
       




        
        </>
      

    )
}
