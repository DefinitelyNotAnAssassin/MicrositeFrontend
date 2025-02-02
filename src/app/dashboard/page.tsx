'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { apiUrl } from '@/lib/utils'
import { ArticleActions } from '@/components/Articles/ArticleActions'

export default function DashboardPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/getProgramUsers`, {
          credentials: 'include'
        })
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    if (user) {
      fetchUsers()
    }
  }, [user])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ArticleActions users={users} />
      </div>
      {/* ...existing dashboard content... */}
    </div>
  )
}
