import React, { useState, useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, ArrowDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import Navbar from './Navbar'
import Activities from './Activities'
import Autoplay from "embla-carousel-autoplay"
import Hero from './Hero'
import ProgramHighlight from './ProgramHighlight' 
import Articles from './Articles'
import Announcements from './Announcements'
import  Footer  from './Footer'

export default function BSITLandingPage() {
  const controls = useAnimation()
  const { scrollYProgress } = useScroll()


  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }))
  }, [controls])

 
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        
      {/* Hero Section */}
      <Hero scroll = {scrollYProgress} />
       
      {/* Carousel Section */}
      <ProgramHighlight />
      {/* Activities Section */}

      <Activities controls = {controls} />
     
      {/* Articles Section */}
      
      <Articles controls = {controls} />

      {/* Announcements Section */}
      <Announcements controls = {controls} /> 
      {/* Footer */}
      <Footer />
      </div>
    </>
    
  )
}