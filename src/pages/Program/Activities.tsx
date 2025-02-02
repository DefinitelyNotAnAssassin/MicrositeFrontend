import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from 'react';
import { truncateText } from '@/utils/StringUtils';
import { BASE_URL } from '@/constants/UrlConstants';
import { ProgramContext } from '@/contexts/ProgramContext';
import Link from '@/components/ui/link';

type Activity = { 
  id: number
  title: string
  image: string
  content: string 
  author: string
}

type ActivitiesProps = {
  articles: Activity[];
  controls: any;
}

export default function Activities({ articles, controls }: ActivitiesProps){ 

  const program = useContext(ProgramContext) 
  const [activities, setActivities] = useState<Activity[]>(articles) 

  useEffect(() => {
  setActivities(articles);
  }, [articles]);

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
    <div className="flex flex-wrap justify-center gap-8">
      {activities.map((activity, index) => (
      <motion.div
        key={index}
        animate={controls}
        custom={index}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="max-w-md"
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
          <Button asChild variant="outline" className="w-full">
          <Link href={`/view_article?id=${activity.id}`}>Read More</Link>
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
