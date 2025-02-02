import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ArticleForm from "@/pages/Dashboard/ArticleForm"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { apiUrl } from "@/lib/utils"

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export function ArticleActions({ users }: { users: User[] }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${apiUrl}/articles`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to create article')
      }

      const data = await response.json()
      
      toast({
        title: "Success",
        description: "Article created successfully",
      })
      
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Article</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Article</DialogTitle>
          <DialogDescription>
            Create a new article for your program
          </DialogDescription>
        </DialogHeader>
        <ArticleForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          users={users}
        />
      </DialogContent>
    </Dialog>
  )
}
