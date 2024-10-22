import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button" 
  import { motion } from "framer-motion" 
  import { useState, useEffect } from "react"
import { truncateText } from "@/utils/StringUtils"
import { BASE_URL } from "@/constants/UrlConstants"
import { Skeleton } from "@/components/ui/skeleton"
  
  type Article = {
    title: string
    content: string
    image: string
    date: string
    author: string 
    category: string
  }
  
  export default function Articles(props) {
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      setIsLoading(true)
      fetch(`${BASE_URL}/API/getProgramArticles?program=BSIT`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data: Article[]) => {
          console.log('Fetched data:', data) // Log the fetched data
          if (Array.isArray(data)) {
            setArticles(data)
          } else {
            console.error('Fetched data is not an array:', data)
            setError('Received invalid data format')
          }
        })
        .catch((error) => {
          console.error('Error fetching program articles:', error)
          setError('Failed to load articles. Please try again later.')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, [])
  
    useEffect(() => {
      console.log('Updated articles state:', articles) // Log the updated articles state
    }, [articles])
  
    if (isLoading) {
      <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    }
  
    if (error) {
      return <div className="text-center py-20 text-red-500">{error}</div>
    }
  
    return (
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
          <div className="flex flex-wrap justify-center gap-8">
            {articles.map((article, index) => (
              <motion.div
              key={article.title + index}
              animate={props.controls}
              custom={index}
              whileHover={{ y: -5 }}
              
            >
              <Card className="h-full border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#cc0000]">{article.title}</CardTitle>
                  <CardDescription>{article.author || 'BSIT Faculty'}</CardDescription>
                </CardHeader>
                <CardContent>
                    {article.image && (
                    <img 
                      src={`${BASE_URL}/${article.image}`} 
                      alt={article.title} 
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                    )}
                    <p className="text-gray-600">
                      {truncateText(article.content, 64)}
                    </p>

                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="outline">Read More</Button>
                  <span className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
                </CardFooter>
              </Card>
            </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }