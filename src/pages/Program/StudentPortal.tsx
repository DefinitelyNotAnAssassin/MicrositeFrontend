'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from './Navbar'

export default function StudentLogin() {
  const [studentNumber, setStudentNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {

        localStorage.setItem('studentNumber', studentNumber) 
        window.location.href = `/student_dashboard` 

        
       

        
    } catch (err) {
      setError('Invalid student number. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className = "min-h-screen flex flex-col">
    <Navbar />
    <div className="flex flex-1 items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Student Portal</CardTitle>
            <CardDescription className="text-center">Enter your student number to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="studentNumber">Student Number</Label>
                  <div className="relative">
                    <Input
                      id="studentNumber"
                      placeholder="Enter your student number"
                      value={studentNumber}
                      onChange={(e) => setStudentNumber(e.target.value)}
                      disabled={isLoading}
                      autoComplete='off'
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isLoading}
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
      </motion.div>
    </div>
    </div>
    
  )
}