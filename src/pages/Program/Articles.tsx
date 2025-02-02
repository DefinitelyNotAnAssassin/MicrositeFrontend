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
import Link from "@/components/ui/link"

type Article = {
  id: number
  title: string
  content: string
  image: string
  date: string
  author: string 
  category: string
}

type ArticlesProps = {
  articles: Article[]
  controls: any
}

export default function Articles({ articles, controls }: ArticlesProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  



  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
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
              animate={controls}
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
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/view_article?id=${article.id}`}>Read More</Link>
                  </Button>
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
