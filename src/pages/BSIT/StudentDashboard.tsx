'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from 'lucide-react'
import Navbar from './Navbar'
import { BASE_URL } from '@/constants/UrlConstants'

type Course = {
  code: string
  name: string
  units: number
}

type Semester = {
  name: string
  courses: Course[]
}

type YearLevel = {
  name: string
  semesters: Semester[]
}

type CurriculumData = {
  year: string
  data: {
    data: YearLevel[]
  }
}

type Student = {
  id: string
  name: string
  student_number: string
  course_status: Record<string, string>
  curriculum_year: string
}

const statusColors: Record<string, string> = {
  'passed': 'bg-green-500',
  'not-taken': 'bg-gray-300',
  'failed': 'bg-red-500',
  'incomplete': 'bg-yellow-500',
  'repeat': 'bg-orange-500'
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analytics, setAnalytics] = useState({
    completionPercentage: 0,
    totalPassed: 0,
    totalFailed: 0,
    totalNotTaken: 0
  })
  const [curriculumData, setCurriculumData] = useState<CurriculumData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentNumber = localStorage.getItem('studentNumber')
        if (!studentNumber) {
          window.location.href = '/student_portal'
          return
        }

        const [studentResponse, curriculumResponse] = await Promise.all([
          fetch(`${BASE_URL}/API/students/${studentNumber}`),
          fetch(`${BASE_URL}/API/getCurriculum`)
        ])

        if (!studentResponse.ok) {
          throw new Error('No student data found, check your student number and try again')
        }

        const studentData = await studentResponse.json()
        const curriculumData = await curriculumResponse.json()

        setStudent(studentData)
        setCurriculumData(curriculumData)
        calculateAnalytics(studentData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const calculateAnalytics = (studentData: Student) => {
    const courseStatuses = Object.values(studentData.course_status)
    const totalCourses = courseStatuses.length
    const passed = courseStatuses.filter(status => status === 'passed').length
    const failed = courseStatuses.filter(status => status === 'failed').length
    const notTaken = courseStatuses.filter(status => status === 'not-taken').length

    setAnalytics({
      completionPercentage: Math.round((passed / totalCourses) * 100),
      totalPassed: passed,
      totalFailed: failed,
      totalNotTaken: notTaken
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || 'Failed to load student data'}</p>
      </div>
    )
  }

  const curriculum = curriculumData.find(c => c.year === student.curriculum_year)?.data.data || []

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Student Dashboard</h1>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Student Number:</strong> {student.student_number}</p>
              <p><strong>Curriculum Year:</strong> {student.curriculum_year}</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Completion</h3>
                  <p className="text-3xl font-bold text-blue-600">{analytics.completionPercentage}%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Passed Subjects</h3>
                  <p className="text-3xl font-bold text-green-600">{analytics.totalPassed}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Failed Subjects</h3>
                  <p className="text-3xl font-bold text-red-600">{analytics.totalFailed}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Not Taken</h3>
                  <p className="text-3xl font-bold text-gray-600">{analytics.totalNotTaken}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculum.map((year, yearIndex) => (
              <Card key={year.name} className="w-full">
                <CardHeader>
                  <CardTitle>{year.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {year.semesters.map((semester, semesterIndex) => (
                    <div key={semester.name} className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">{semester.name}</h3>
                      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.3 * (yearIndex * 2 + semesterIndex)
                              }
                            }
                          }}
                        >
                          {semester.courses.map((course) => (
                            <motion.div
                              key={course.code}
                              className="flex justify-between items-center mb-2 p-2 rounded-md bg-white shadow-sm"
                              variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: { y: 0, opacity: 1 }
                              }}
                            >
                              <div>
                                <span className="font-medium">{course.code}</span>
                                <span className="ml-2 text-sm text-gray-600">{course.name}</span>
                              </div>
                              <Badge className={`${statusColors[student.course_status[course.code] || 'not-taken']} text-white`}>
                                {student.course_status[course.code] || 'Not Taken'}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                      </ScrollArea>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}