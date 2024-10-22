import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Navbar from './Navbar'
import { BASE_URL } from '@/constants/UrlConstants'

type Article = {
  title: string
  content: string
  image: string
  date: string
  author: string 
  category: string
}

const categories = ['All',  'Events', 'Announcements', 'Student Activities', 'General']
const ITEMS_PER_PAGE = 6

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    fetch(`${BASE_URL}/API/getProgramArticles?program=BSIT&category=all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data: Article[]) => {
        console.log('Fetched data:', data)
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

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === activeCategory)

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          BSIT Articles
        </motion.h1>

        <Tabs defaultValue="All" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory + currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginatedArticles.map((article, index) => (
              <motion.div
                key={article.title + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-none shadow-lg flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#cc0000]">{article.title}</CardTitle>
                    <CardDescription>{article.author || 'BSIT Faculty'}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {article.image && (
                      <img 
                        src={`http://127.0.0.1:8000${article.image}`} 
                        alt={article.title} 
                        className="w-full h-48 object-cover mb-4 rounded-md"
                      />
                    )}
                    <p className="text-gray-600 line-clamp-3">{article.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center mt-auto">
                    <Button variant="outline">Read More</Button>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-400">{article.category}</span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  )
}