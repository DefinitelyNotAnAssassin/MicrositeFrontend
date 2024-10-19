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
 

export default function BSITLandingPage() {
  const controls = useAnimation()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }))
  }, [controls])

  const carouselImages = [
   
    'https://placehold.co/1600x900',
    'https://placehold.co/1600x900',
    'https://placehold.co/1600x900',
    
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section with Full-screen Carousel */}
        <section className="relative h-screen overflow-hidden">
          <Carousel className="w-full h-full" plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index} className="w-full h-full">
                  <div className="h-full w-full absolute z-10 bg-black opacity-70"></div>
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            
          </Carousel>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
              className="text-center text-white"
              style={{ opacity, scale }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Bachelor of Science in <br />Information Technology</h1>
                <p className="text-xl md:text-2xl mb-8 font-light">Shaping the Future of Information Technology</p>
                <Button size="lg" className="bg-white text-[#cc0000] hover:bg-gray-100 font-semibold">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="text-white h-8 w-8" />
          </motion.div>
        </section>

      {/* Carousel Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Program Highlights
          </motion.h2>
          <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto"
        plugins={[
          Autoplay({
            delay: 7000,
          }),
        ]}>
            <CarouselContent>
              {[1, 2, 3].map((item) => (
                <CarouselItem key={item}>
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-[#cc0000]">BSIT Highlight {item}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={`https://placehold.co/600x400`}
                        alt={`BSIT Highlight ${item}`}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </CardContent>
                    <CardFooter>
                      <p className="text-gray-600">Discover our cutting-edge curriculum and state-of-the-art facilities.</p>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Activities Section */}

      <Activities controls = {controls} />
     
      {/* Articles Section */}
      <section id="articles" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest Articles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['The Future of AI', 'Cybersecurity Trends', 'Cloud Computing Advancements'].map((article, index) => (
              <motion.div
                key={article}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#cc0000]">{article}</CardTitle>
                    <CardDescription>By BSIT Faculty</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Explore the latest developments in {article.toLowerCase()} and their impact on the IT industry.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Read More</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section id="announcements" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Announcements
          </motion.h2>
          <div className="space-y-6">
            {['Upcoming Webinar', 'Scholarship Opportunities', 'New Course Offerings'].map((announcement, index) => (
              <motion.div
                key={announcement}
                initial={{ opacity: 0, x: -20 }}
                animate={controls}
                custom={index}
                whileHover={{ x: 5 }}
              >
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#cc0000]">{announcement}</CardTitle>
                    <CardDescription>Posted on {new Date().toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Important announcement regarding {announcement.toLowerCase()}. Stay tuned for more information.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-[#cc0000] hover:text-[#ff3333]">Learn More</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#cc0000] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">BSIT Program</h3>
              <p className="text-gray-200">Shaping the future of IT education</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Programs</a></li>
                <li><a href="#" className="hover:underline">Admissions</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors">Facebook</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Twitter</a>
                <a href="#" className="hover:text-gray-300 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p>&copy; {new Date().getFullYear()} BSIT Program. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
    
  )
}