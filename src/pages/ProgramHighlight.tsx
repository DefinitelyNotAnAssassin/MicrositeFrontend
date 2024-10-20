

import React from 'react'; 
import { motion } from 'framer-motion'; 
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";




export default function ProgramHighlight (props) { 



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
          <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto"
        plugins={[
          Autoplay({
            delay: 7000,
          }),
        ]} 
       
        >
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


    )



}