import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { truncateText } from '@/utils/StringUtils';
import { BASE_URL } from '@/constants/UrlConstants';

type Activity = { 
    title: string
    image: string
    content: string 
    author: string
}


export default function Activities(props){ 


  const [activities, setActivities] = useState<Activity[]>([]) 

  useEffect(() => {
      fetch(`${BASE_URL}/API/getProgramArticles?program=BSIT&category=Student Activities`).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }).then((data: Activity[]) => {
        console.log('Fetched data:', data) // Log the fetched data
        if (Array.isArray(data)) {
          setActivities(data)
        } else {
          console.error('Fetched data is not an array:', data)
        }
      }).catch((error) => {
        console.error('Error fetching program articles:', error)
      })


  }, [])

    


    return( 

        <section id="activities" className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Student Activities
          </motion.h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                animate={props.controls}
                custom={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="border"
              >
                <Card className="h-full border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#cc0000]">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={BASE_URL + activity.image}
                      alt={activity.title + ' image'}
                      className="w-full h-auto rounded-lg shadow-md mb-4"
                    />
                    <p className="text-gray-600">{truncateText(activity.content, 64)}</p>
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