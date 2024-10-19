import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import Navbar from "./pages/Navbar"
import LandingPage from "./pages/LandingPage"
import Articles from "./pages/Articles"
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";  

export default function App() {
    return (
        <>

        <RouterProvider router={router} />
        
       




        
        </>
      

    )
}
