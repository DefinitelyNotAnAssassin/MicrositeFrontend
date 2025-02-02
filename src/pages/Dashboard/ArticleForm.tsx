'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'

const CATEGORY_CHOICES = ['Events', 'Announcements', 'Student Activities', 'General']
const DEPARTMENT_CHOICES = ['SCMCS', 'SNAHS', 'SMLS', 'SITHM', 'SASE']
const PROGRAM_CHOICES = [
    'BSIT', 'BMMA', 'BACOMM'
]

interface ArticleFormProps {
    onSubmit: (data: FormData, id?: number) => Promise<void>
    initialData?: {
        id: number
        title: string
        content: string
        category: string
        department: string
        program: string
        image?: string
    }
    isLoading: boolean
    users: Array<{ id: number; first_name: string; last_name: string }>
}

export default function ArticleForm({ onSubmit, initialData, isLoading, users }: ArticleFormProps) {
    const [title, setTitle] = useState(initialData?.title || '')
    const [content, setContent] = useState(initialData?.content || '')
    const [category, setCategory] = useState(initialData?.category || '')
    const [department, setDepartment] = useState(initialData?.department || '')
    const [program, setProgram] = useState(initialData?.program || '')
    const [image, setImage] = useState<File | null>(null)
    const [author, setAuthor] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('category', category)
        formData.append('department', department)
        formData.append('program', program)
        formData.append('author', author)
        if (image) {
            formData.append('image', image)
        }

        if (initialData?.id) {
            await onSubmit(formData, initialData.id)
        } else {
            await onSubmit(formData)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            
            <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORY_CHOICES.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                        {DEPARTMENT_CHOICES.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="program">Program</Label>
                <Select value={program} onValueChange={setProgram}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                        {PROGRAM_CHOICES.map(prog => (
                            <SelectItem key={prog} value={prog}>{prog}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="author">Author</Label>
                <Select value={author} onValueChange={setAuthor}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map(user => (
                            <SelectItem key={user.id} value={user.id.toString()}>
                                {`${user.first_name} ${user.last_name}`}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="image">Image</Label>
                <Input
                    id="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    accept="image/*"
                />
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? 'Update' : 'Create'} Article
            </Button>
        </form>
    )
}