
import { motion, useAnimation } from 'framer-motion'; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"    
import { Button } from "@/components/ui/button"


export default function Announcements (props) { 


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
            {['Upcoming Webinar', 'Scholarship Opportunities', 'New Course Offerings'].map((announcement, index) => (
              <motion.div
                key={announcement}
                initial={{ opacity: 0, x: -20 }}
                animate={props.controls}
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



    )
}