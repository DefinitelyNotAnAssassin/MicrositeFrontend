'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Navbar from  './Navbar'
import ArticleForm from './ArticleForm'
import { getJwt } from '@/utils/Cookies'
import { BASE_URL } from '@/constants/UrlConstants'
import axios from '@/utils/AuthAxios';
import { useAuth } from '@/contexts/AuthContext'

const CATEGORY_CHOICES = ['Events', 'Announcements', 'Student Activities', 'General']
const DEPARTMENT_CHOICES = ['SCMCS', 'SNAHS', 'SMLS', 'SITHM', 'SASE']
const PROGRAM_CHOICES = ['BSIT', 'BMMA', 'BACOMM']

interface Article {
  id: number
  title: string
  content: string
  image: string
  author: string
  category: string
  date: string
  department: string
  program: string
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export default function ManageArticles() {
  const { program, department } = useAuth();
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [filters, setFilters] = useState({ title: '', category: 'all', department: 'all', program: 'all' })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [articlesRes, usersRes] = await Promise.all([
        axios.get(`${BASE_URL}/API/getProgramArticles`),
        axios.get(`${BASE_URL}/API/getProgramUsers`)
      ]);
      setArticles(articlesRes.data);
      setUsers(usersRes.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = articles.filter(article => 
      article.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      (filters.category === 'all' || article.category === filters.category) &&
      (filters.department === 'all' || article.department === filters.department) &&
      (filters.program === 'all' || article.program === filters.program)
    )
    setFilteredArticles(filtered)
  }, [articles, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleAdd = async (newArticle: FormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/API/articles`, newArticle);
      setArticles(prev => [...prev, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding article:', error);
    }
    setIsLoading(false);
  };

  const handleEdit = async (editedArticle: FormData, id: number) => {
    setIsLoading(true);
    try {
      await axios.put(`${BASE_URL}/API/articles/${id}`, editedArticle);
      const response = await axios.get(`${BASE_URL}/API/getProgramArticles`);
      setArticles(response.data);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating article:', error);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${BASE_URL}/API/articles/${id}/delete`);
        setArticles(prev => prev.filter(article => article.id !== id));
      } catch (error) {
        console.error('Error deleting article:', error);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Article Management</h1>
        <div className="flex flex-wrap gap-4 mb-4">
          <Input
            placeholder="Filter by title"
            value={filters.title}
            onChange={(e) => handleFilterChange('title', e.target.value)}
            className="max-w-xs"
          />
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORY_CHOICES.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={(value) => handleFilterChange('department', value)} disabled>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={department}>{department}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={program} onValueChange={(value) => handleFilterChange('program', value)} disabled>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={program}>{program}</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Add Article</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Article</DialogTitle>
              </DialogHeader>
              <ArticleForm onSubmit={handleAdd} isLoading={isLoading} users={users} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.department}</TableCell>
                  <TableCell>{article.program}</TableCell>
                  <TableCell>{article.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setCurrentArticle(article)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Article</DialogTitle>
                          </DialogHeader>
                          {currentArticle && (
                            <ArticleForm 
                              onSubmit={handleEdit} 
                              initialData={currentArticle} 
                              isLoading={isLoading} 
                              users={users}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(article.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}