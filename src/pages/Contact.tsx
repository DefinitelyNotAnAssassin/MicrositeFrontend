'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from '@/hooks/use-toast'
import { Laptop, Mail, Phone, User } from 'lucide-react'
import Navbar from './Navbar'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    concernType: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, concernType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(formData)
    toast({
      title: "Concern submitted!",
      description: "We'll address your concern as soon as possible.",
    })
    setFormData({
      name: '',
      email: '',
      studentId: '',
      concernType: '',
      message: ''
    })
    setIsSubmitting(false)
  }

  return (
    <>

    <Navbar />
<div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">BSIT Student Concerns</CardTitle>
            <CardDescription className="text-center">
              Have a concern about the BS in Information Technology program? Let us know!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <motion.div
                  className="relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="name" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Name
                  </Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="studentId" className="flex items-center">
                    <Laptop className="w-4 h-4 mr-2" />
                    Student ID
                  </Label>
                  <Input id="studentId" name="studentId" value={formData.studentId} onChange={handleInputChange} required />
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="concernType" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Type of Concern
                  </Label>
                  <Select onValueChange={handleSelectChange} value={formData.concernType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select concern type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic Issues</SelectItem>
                      <SelectItem value="technical">Technical Problems</SelectItem>
                      <SelectItem value="curriculum">Curriculum Inquiries</SelectItem>
                      <SelectItem value="internship">Internship Opportunities</SelectItem>
                      <SelectItem value="career">Career Guidance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="message">Describe Your Concern</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} required />
                </motion.div>
              </div>
              <CardFooter className="flex justify-end mt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    "Submit Concern"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
    </>
    
  )
}