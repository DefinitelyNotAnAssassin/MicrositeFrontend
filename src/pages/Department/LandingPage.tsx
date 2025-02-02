import React, { useState, useEffect, useContext } from 'react'
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
import Navbar from '@/pages/Department/Navbar'
import Activities from '@/pages/Program/Activities'
import Autoplay from "embla-carousel-autoplay"
import Hero from '@/pages/Program/Hero'
import ProgramHighlight from '@/pages/Program/ProgramHighlight'
import Articles from '@/pages/Program/Articles'
import Announcements from '@/pages/Program/Announcements'
import Footer from '@/pages/Program/Footer'
import { BASE_URL } from '@/constants/UrlConstants'
import { ProgramContext } from '@/contexts/ProgramContext'

type Article = { 
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  category: string;
  date: string;
}


// TODO: Department Articles Page 
export default function BSITLandingPage(props) {
  const controls = useAnimation()
  const { scrollYProgress } = useScroll()
  const [articles, setArticles] = useState<Article[]>([])

  const program = useContext(ProgramContext)
  useEffect(() => {
    fetch(`${BASE_URL}/API/getProgramArticles?department=${program.programAbbreviation}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setArticles(data)
      }
      )
  }
  , [])

  const activites = articles.filter(article => article.category === 'Student Activities')
  const announcements = articles.filter(article => article.category === 'Announcements') 
  const latestArticles = articles.filter(article => article.category !== 'Student Activities' && article.category !== 'Announcements') 



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
       
      {/* Activities Section */}

      <Activities controls = {controls} articles = {activites}/>
     
      {/* Articles Section */}

      <Articles controls = {controls} articles = {latestArticles.splice(0,3)}/>

      {/* Announcements Section */}
      <Announcements controls = {controls} articles = {announcements}/> 
      {/* Footer */}
      <Footer />
      </div>
    </>
    
  )
}