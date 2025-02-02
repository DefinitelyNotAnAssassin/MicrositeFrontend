
import { motion, useAnimation } from 'framer-motion'; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"    
import { Button } from "@/components/ui/button"
import { useState, useEffect, useContext } from 'react'
import { truncateText } from '@/utils/StringUtils';
import { BASE_URL } from '@/constants/UrlConstants';
import Link from '@/components/ui/link';
import { ProgramContext } from '@/contexts/ProgramContext';
import { set } from 'react-hook-form';


type Announcement = { 
    id: number
    title: string
    date: string
    content: string
} 

export default function Announcements (props) { 

   
    const announcements = props.articles


    return ( 


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
            {announcements.map((announcement, index) => (
              <motion.div
                key={index}
            
                animate={props.controls}
                custom={index}
                whileHover={{ x: 5 }}
              >
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#cc0000]">{announcement.title}</CardTitle>
                    <CardDescription>Posted on {new Date().toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{truncateText(announcement.content, 64)}</p>
                  </CardContent>
                  <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                      <Link href={`/view_article?id=${announcement.id}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



    )
}