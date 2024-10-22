'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export default function CurriculumForm() {
  const [courseStatus, setCourseStatus] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [curriculumYear, setCurriculumYear] = useState<string>('')
  const [expandedYears, setExpandedYears] = useState<string[]>([])
  const [curriculumData, setCurriculumData] = useState<CurriculumData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    fetch(`${BASE_URL}/API/getCurriculum`)
      .then((res) => res.json())
      .then((data: CurriculumData[]) => {
        setCurriculumData(data)
        setCurriculumYear(data[0].year)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching curriculum data:", error)
        setError("Failed to load curriculum data. Please try again later.")
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch("https://sdcamicrosite.pythonanywhere.com/API/students")
      .then((res) => res.json())
      .then(setStudents)
      .catch((error) => {
        console.error("Error fetching student data:", error)
        setError("Failed to load student data. Please try again later.")
      })
  }, [])

  const curriculum = useMemo(() => {
    const selectedCurriculum = curriculumData.find(c => c.year === curriculumYear)
    return selectedCurriculum ? selectedCurriculum.data.data : []
  }, [curriculumData, curriculumYear])

  const generateDefaultCourseStatus = (curriculum: YearLevel[]) => {
    const status: Record<string, string> = {}
    curriculum.forEach(year => {
      year.semesters.forEach(semester => {
        semester.courses.forEach(course => {
          status[course.code] = 'not-taken'
        })
      })
    })
    return status
  }

  useEffect(() => {
    if (selectedStudent) {
      if (selectedStudent.course_status) {
        setCourseStatus(selectedStudent.course_status)
      } else {
        setCourseStatus(generateDefaultCourseStatus(curriculum))
      }
    }
  }, [selectedStudent, curriculum])

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return [];
    const lowercasedTerm = searchTerm.toLowerCase();
    return students.filter(student => 
      student.name.toLowerCase().includes(lowercasedTerm) || 
      student.student_number.includes(lowercasedTerm)
    )
  }, [students, searchTerm]);

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student)
    if (student.curriculum_year){ 
      setCurriculumYear(student.curriculum_year)
    }
    setSearchTerm(student.name)
  }

  const handleStatusChange = (courseCode: string, status: string) => {
    setCourseStatus(prev => ({ ...prev, [courseCode]: status }))
  }

  const handleSubmit = () => {
    if (!selectedStudent) {
      alert('Please select a student before submitting.')
      return
    }

    const url = "https://sdcamicrosite.pythonanywhere.com/API/setCurriculumStatus"
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        student_id: selectedStudent.id,
        status: courseStatus, 
        curriculum_year: curriculumYear
      })
    })
    .then(response => response.json())
    .then(data => {
      setSelectedStudent(null)
      setSearchTerm("")
      setCourseStatus(generateDefaultCourseStatus(curriculum))
      alert('Successfully submitted curriculum form.')
      return fetch("https://sdcamicrosite.pythonanywhere.com/API/students")
    })
    .then(res => res.json())
    .then(setStudents)
    .catch(error => {
      console.error('Error:', error)
      alert('An error occurred while submitting the form.')
    })
  }

  const toggleYearExpansion = (yearName: string) => {
    setExpandedYears(prev => 
      prev.includes(yearName)
        ? prev.filter(y => y !== yearName)
        : [...prev, yearName]
    )
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">BSIT Curriculum Form</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Student Search and Curriculum Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 items-center mb-4">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="Enter student ID or name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <Select value={curriculumYear} onValueChange={setCurriculumYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {curriculumData.map(c => (
                      <SelectItem key={c.year} value={c.year}>{c.year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {filteredStudents.length > 0 && searchTerm && (
                <ul className="mt-2 border rounded-md shadow-sm">
                  {filteredStudents.map(student => (
                    <li 
                      key={student.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleStudentSelect(student)}
                    >
                      {student.name} (ID: {student.student_number})
                    </li>
                  ))}
                </ul>
              )}
              {selectedStudent && (
                <div className="mt-4">
                  <p><strong>Selected Student:</strong> {selectedStudent.name} (ID: {selectedStudent.student_number})</p>
                  <p><strong>Curriculum Year:</strong> {curriculumYear}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {curriculum.map((year) => (
            <Card key={year.name} className="mb-6">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleYearExpansion(year.name)}
              >
                <CardTitle className="flex justify-between items-center">
                  {year.name}
                  {expandedYears.includes(year.name) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
              <AnimatePresence>
                {expandedYears.includes(year.name) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent>
                      {year.semesters.map((semester) => (
                        <div key={semester.name} className="mb-4">
                          <h3 className="text-xl font-semibold mb-2">{semester.name}</h3>
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="p-2 text-left">Course Code</th>
                                <th className="p-2 text-left">Course Name</th>
                                <th className="p-2 text-center">Units</th>
                                <th className="p-2 text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {semester.courses.map((course) => (
                                <tr key={course.code} className="border-b">
                                  <td className="p-2">{course.code}</td>
                                  <td className="p-2">{course.name}</td>
                                  <td className="p-2 text-center">{course.units}</td>
                                  <td className="p-2">
                                    <Select
                                      value={courseStatus[course.code] || 'not-taken'}
                                      onValueChange={(value) => handleStatusChange(course.code, value)}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="not-taken">Not Taken</SelectItem>
                                        <SelectItem value="passed">Passed</SelectItem>
                                        <SelectItem value="incomplete">Incomplete</SelectItem>
                                        <SelectItem value="failed">Failed</SelectItem>
                                        <SelectItem value="repeat">Repeat</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
          <div className="mt-8 text-center">
            <Button onClick={handleSubmit}>Submit Form</Button>
          </div>
        </motion.div>
      </div>
    </>
  )
}