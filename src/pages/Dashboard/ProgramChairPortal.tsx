'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import { BASE_URL } from '@/constants/UrlConstants'
import Navbar from  './Navbar'
import axios from '@/utils/AuthAxios'
import { useAuth } from '@/contexts/AuthContext'

export default function ProgramChairLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()
  const auth = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    setIsLoading(true)
    auth.login(username, password)
      .then((res) => {
        setIsLoading(false)
        if (res) {

            if (window.location.search) {
              window.location.href = window.location.search.split('=')[1]
            }

            else {
              window.location.href = '/'
            }
        } else {
          setError('Invalid username or password')
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setError('Something went wrong')
      })




  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <form onSubmit={handleSubmit}>
          <Card className="w-[350px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Program Chair Portal</CardTitle>
              <CardDescription className="text-center">Enter your username and password to login</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                        autoComplete='off'
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        autoComplete='off'
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                className="w-full" 
                onClick={handleSubmit}
                disabled={isLoading}
                type = "submit"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full"
                  />
                ) : (
                  'Login'
                )}
              </Button>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 mt-2 text-sm"
                >
                  {error}
                </motion.p>
              )}
            </CardFooter>
          </Card>
          </form>
        </motion.div>
      </div>
    </div>
  )
}