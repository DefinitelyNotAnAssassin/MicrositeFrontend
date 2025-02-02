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


const CATEGORY_CHOICES = ['Events', 'Announcements', 'Student Activities', 'General']
const DEPARTMENT_CHOICES = ['SCMCS', 'SNAHS', 'SMLS', 'SITHM', 'SASE']
const PROGRAM_CHOICES = [
  'ABCOM', 'ABMMA', 'AHM', 'BACOMM', 'BARNCII', 'BEED', 'BMMA', 'BPP NCII', 'BSA', 'BSAIS', 'BSAT', 'BSB', 'BSBA', 'BSC', 'BSCS', 'BSE', 'BSED', 'BSHM', 'BSHRM', 'BSIT', 'BSIT(TEST)', 'BSMLS', 'BSMT', 'BSN', 'BSN (YIBU)', 'BSNED', 'BSOT', 'BSP', 'BSPSY', 'BSPT', 'BSPT (YIBU)', 'BSRT', 'BSRT (YIBU)', 'BSTM', 'BSTRM', 'CCNCII', 'CCPIII-TAFE', 'CGNCII', 'CGNCII (T)', 'CHSNCII', 'CTP', 'DB', 'DBM-KENT', 'DM', 'DMM-KENT', 'EIMNCII', 'FBSNCII', 'FL', 'HSKNCII', 'MAP', 'MAP (YIBU)', 'MBA', 'MBA (YIBU)', 'MD', 'MD(TEST)', 'MISICT', 'MSN', 'PNCIV', 'PRE-DENT', 'SMAWNCI', 'SMAWNCII', 'VACOMLIT', 'WSA'
]

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

export default function ManageArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [filters, setFilters] = useState({ title: '', category: 'all', department: 'all', program: 'all' })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const access = getJwt(); 
    const header = { 
      headers: { 
        Authorization: `Bearer ${access}`
      }
    }
    fetch(`${BASE_URL}/API/getProgramArticles`, header).then(response => response.json()).then(data => {
      console.log(data)
      setArticles(data)
    })

  }, [])

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

  const handleAdd = async (newArticle: Omit<Article, 'id' | 'date'>) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const date = new Date().toISOString().split('T')[0]
    const id = Math.max(...articles.map(a => a.id)) + 1
    const addedArticle = { ...newArticle, id, date }
    setArticles(prev => [...prev, addedArticle])
    setIsLoading(false)
    setIsAddModalOpen(false)
  }

  const handleEdit = async (editedArticle: Article) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setArticles(prev => prev.map(article => article.id === editedArticle.id ? editedArticle : article))
    setIsLoading(false)
    setIsEditModalOpen(false)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setArticles(prev => prev.filter(article => article.id !== id))
      setIsLoading(false)
    }
  }

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
          <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All  Departments</SelectItem>
              {DEPARTMENT_CHOICES.map(department => (
                <SelectItem key={department} value={department}>{department}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.program} onValueChange={(value) => handleFilterChange('program', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              {PROGRAM_CHOICES.map(program => (
                <SelectItem key={program} value={program}>{program}</SelectItem>
              ))}
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
              <ArticleForm onSubmit={handleAdd} isLoading={isLoading} />
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
                            <ArticleForm onSubmit={handleEdit} initialData={currentArticle} isLoading={isLoading} />
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