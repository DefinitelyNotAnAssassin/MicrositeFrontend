'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react'

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

interface ArticleFormProps {
  onSubmit: (article: Omit<Article, 'id' | 'date'> | Article) => void
  initialData?: Article
  isLoading: boolean
}

export default function ArticleForm({ onSubmit, initialData, isLoading }: ArticleFormProps) {
  const [formData, setFormData] = useState<Omit<Article, 'id' | 'date'>>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    image: initialData?.image || '',
    author: initialData?.author || '',
    category: initialData?.category || CATEGORY_CHOICES[0],
    department: initialData?.department || DEPARTMENT_CHOICES[0],
    program: initialData?.program || PROGRAM_CHOICES[0],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(initialData ? { ...initialData, ...formData } : formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" value={formData.content} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" name="image" value={formData.image} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select name="category" value={formData.category} onValueChange={(value) => handleChange({ target: { name: 'category', value } } as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_CHOICES.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="department">Department</Label>
        <Select name="department" value={formData.department} onValueChange={(value) => handleChange({ target: { name: 'department', value } } as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {DEPARTMENT_CHOICES.map(department => (
              <SelectItem key={department} value={department}>{department}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="program">Program</Label>
        <Select name="program" value={formData.program} onValueChange={(value) => handleChange({ target: { name: 'program', value } } as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select program" />
          </SelectTrigger>
          <SelectContent>
            {PROGRAM_CHOICES.map(program => (
              <SelectItem key={program} value={program}>{program}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </form>
  )
}