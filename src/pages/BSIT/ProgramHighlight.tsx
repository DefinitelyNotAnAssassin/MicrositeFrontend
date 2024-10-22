import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {BASE_URL} from '@/constants/UrlConstants'

type ProgramHighlight = {
  title: string
  content: string
  image: string
}

export default function ProgramHighlight() {
  const [highlights, setHighlights] = useState<ProgramHighlight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${BASE_URL}/API/getProgramHighlights?program=BSIT`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data: ProgramHighlight[]) => {
        console.log(data)
        setHighlights(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching program highlights:', error)
        setError('Failed to load program highlights. Please try again later.')
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>
  }

  return (
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
        <Carousel 
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto"
          plugins={[
            Autoplay({
              delay: 7000,
            }),
          ]}
        >
          <CarouselContent>
            {highlights.map((highlight, index) => (
              <CarouselItem key={index}>
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-[#cc0000]">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={`${BASE_URL}/media/${highlight.image}`}
                      alt={highlight.title}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </CardContent>
                  <CardFooter>
                    <p className="text-gray-600">{highlight.content}</p>
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
  )
}