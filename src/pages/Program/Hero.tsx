import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { motion, useTransform } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import { useState, useEffect, useContext } from 'react';
import { GetProgramName, GetProgramDescription } from '@/utils/ProgramHelper';
import { ProgramContext } from '@/contexts/ProgramContext';




export default function Hero(props) {
  const carouselImages = [
    'https://placehold.co/1600x900',
    'https://placehold.co/1600x900',
    'https://placehold.co/1600x900',
  ];

  const program = useContext(ProgramContext);




  const opacity = useTransform(props.scroll, [0, 0.5], [1, 0]);
  const scale = useTransform(props.scroll, [0, 0.5], [1, 0.8]);

  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      <Carousel
        className="flex-1 w-full h-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="relative w-full h-full">
              <div className="absolute inset-0 z-10 bg-black opacity-70"></div>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-screen object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0  flex items-center justify-center">
        <motion.div
          className="text-center text-white"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {program.programName}
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              {program.programDescription}
            </p>
            <Button
              size="lg"
              className="bg-white text-[#cc0000] hover:bg-gray-100 font-semibold"
            >
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
  );
}