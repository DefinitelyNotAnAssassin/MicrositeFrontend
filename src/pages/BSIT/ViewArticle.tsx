import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from './Navbar';

type Article = {
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
};

export default function ViewArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const [article, setArticle] = React.useState<Article | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`http://127.0.0.1:8000/API/getArticle?id=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: Article) => {
          setArticle(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching article:', error);
          setError('Failed to load article. Please try again later.');
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/3 mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (error) {
    return (
    <>
    <Navbar />
    <div className="min-h-screen w-full flex justify-center items-center text-5xl font-thin">Article not found.</div>;
    </>
    )
  }

  if (!article) {
    return <div className="text-center py-20">Article not found</div>;
  }

  return (

    <>
    <Navbar />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full mx-auto px-4 py-8"
    >
      
      <Card className=" overflow-hidden">
        <CardHeader className="relative">
          <motion.img
            src={`http://127.0.0.1:8000${article.image}`}
            alt={article.title}
            className="w-full h-64 object-cover rounded-t-lg"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <CardTitle className="text-4xl font-bold mt-4">{article.title}</CardTitle>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-2">
            <span className="flex items-center mr-4">
              <Calendar className="mr-1 h-4 w-4" />
              {new Date(article.date).toLocaleDateString()}
            </span>
            <span className="flex items-center mr-4">
              <User className="mr-1 h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center">
              <Tag className="mr-1 h-4 w-4" />
              {article.category}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
    </>
 
  );
}