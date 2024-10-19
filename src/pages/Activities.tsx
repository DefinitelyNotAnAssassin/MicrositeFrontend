import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function Activities(props){ 


    


    return( 

        <section id="activities" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Student Activities
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Hackathons', 'Tech Workshops', 'Industry Visits'].map((activity, index) => (
              <motion.div
                key={activity}
                initial={{ opacity: 0, y: 20 }}
                animate={props.controls}
                custom={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#cc0000]">{activity}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={`https://placeholder.co/400x300`}
                      alt={activity}
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <p className="text-gray-600">Engage in exciting {activity.toLowerCase()} to enhance your skills and broaden your horizons.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    )

}