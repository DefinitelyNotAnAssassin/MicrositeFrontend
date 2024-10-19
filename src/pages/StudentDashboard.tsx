'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from 'lucide-react'
import Navbar from './Navbar'

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

type Student = {
  id: string
  name: string
  student_number: string
  course_status: Record<string, string>
  curriculum_year: CurriculumYear
}

type CurriculumYear = '2018-2019' | '2023-2024' | '2024-2025'

const curriculumData: Record<CurriculumYear, YearLevel[]> = {

    '2018-2019': [
      {
        name: "FIRST YEAR",
        semesters: [
          {
            name: "1st Semester",
            courses: [
              { code: "IT100", name: "Computer Concepts and Fundamentals", units: 3 },
              { code: "IT101", name: "Fundamentals of Problem Solving and Programming 1", units: 3 },
              { code: "GE101", name: "Mathematics in the Modern World", units: 3 },
              { code: "GEE101", name: "Komunikasyon sa Akademikong Filipino", units: 3 },
              { code: "GE107", name: "Art Appreciation", units: 3 },
              { code: "GE108", name: "Ethics", units: 3 },
              { code: "GNSTP101", name: "National Service Training Program 1 (CWTS)", units: 3 },
              { code: "GPE101", name: "Physical Fitness", units: 2 },
              { code: "GEU101", name: "Euthenics 1: Accountability", units: 1 },
            ],
          },
          {
            name: "2nd Semester",
            courses: [
              { code: "IT102", name: "Discrete Mathematics", units: 3 },
              { code: "IT103", name: "Fundamentals of Problem Solving And Programming 2", units: 3 },
              { code: "GE102", name: "Purposive Communication", units: 3 },
              { code: "GE103", name: "Science, Technology and Society", units: 3 },
              { code: "GE104", name: "Understanding the Self", units: 3 },
              { code: "GE105", name: "Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas", units: 3 },
              { code: "GNSTP102", name: "National Service Training Program 2 (CWTS)", units: 3 },
              { code: "GPE102", name: "Rythmic Activities with Swimming", units: 2 },
            ],
          },
        ],
      },
      {
        name: "SECOND YEAR",
        semesters: [
          {
            name: "1st Semester",
            courses: [
              { code: "IT200", name: "Object-Oriented Programming", units: 3 },
              { code: "IT201", name: "Data Structures and Algorithms", units: 3 },
              { code: "IT202", name: "Human Computer Interaction", units: 3 },
              { code: "IT203", name: "Computer Systems Servicing (TESDA NCII)", units: 3 },
              { code: "ITM01", name: "Calculus", units: 3 },
              { code: "GEE200", name: "Foreign Language 1", units: 3 },
              { code: "GPE103", name: "Individual/Dual Sports", units: 2 },
              { code: "GEU102", name: "Euthenics 2: Service", units: 1 },
              { code: "ITPE01", name: "Platform Technologies", units: 3 },
            ],
          },
          {
            name: "2nd Semester",
            courses: [
              { code: "IT204", name: "Systems Integration and Architecture 1", units: 3 },
              { code: "IT205", name: "Network Management 1 (Network Fundamentals)", units: 3 },
              { code: "IT206", name: "Information Management 1", units: 3 },
              { code: "IT207", name: "Methods of Research for IT w/ SPSS", units: 3 },
              { code: "GEE201", name: "Foreign Language 2", units: 3 },
              { code: "GEE102", name: "Pagbasa at Pagsulat Tungo sa Pananaliksik", units: 3 },
              { code: "GPE104", name: "Team Sports", units: 2 },
              { code: "ITPE02", name: "Mobile Applications Development and Programming", units: 3 },
            ],
          },
        ],
      },
      {
        name: "THIRD YEAR",
        semesters: [
          {
            name: "1st Semester",
            courses: [
              { code: "IT300", name: "Advance Database Systems", units: 3 },
              { code: "IT207", name: "Network Management 2 (Basic Routing Technologies)", units: 3 },
              { code: "IT301", name: "Information Assurance and Security 1", units: 3 },
              { code: "IT302", name: "Social and Professional Issues", units: 3 },
              { code: "IT303", name: "Project Management", units: 3 },
              { code: "GE106", name: "The Contemporary World", units: 3 },
              { code: "GEU103", name: "Euthenics 3: Dynamism", units: 1 },
              { code: "ITPE03", name: "Event Driven Programming", units: 3 },
              { code: "IT310", name: "Web Systems and Technologies", units: 3 },
            ],
          },
          {
            name: "2nd Semester",
            courses: [
              { code: "IT305", name: "Quantitative Methods", units: 3 },
              { code: "IT306", name: "Information Assurance and Security 2", units: 3 },
              { code: "IT307", name: "Application Development and Emerging Technologies", units: 3 },
              { code: "ITC100", name: "Capstone Project 1", units: 3 },
              { code: "GEE104", name: "Philippine Popular Culture with ASEAN", units: 3 },
              { code: "GEE109", name: "Life and Works of Rizal", units: 3 },
              { code: "IT309", name: "Integrative Programming and Technologies", units: 3 },
            ],
          },
        ],
      },
      {
        name: "FOURTH YEAR",
        semesters: [
          {
            name: "1st Semester",
            courses: [
              { code: "ITC200", name: "Capstone Project 2", units: 3 },
              { code: "IT500", name: "On-the-job Training (OJT) 500 hrs", units: 6 },
              { code: "GEU104", name: "Euthenics 4: Competency", units: 1 },
            ],
          },
          {
            name: "2nd Semester",
            courses: [
              { code: "ITPE04", name: "Internet of Everything", units: 3 },
              { code: "ITP400", name: "Systems Integration and Architecture 2", units: 3 },
              { code: "IT308", name: "System Administration and Maintenance", units: 3 },
            ],
          },
        ],
      },
    ],
    '2023-2024': [
      {
        name: "FIRST YEAR",
        semesters: [
          {
            name: "1st Semester",
            courses: [
              { code: "GE101", name: "Mathematics in the Modern World", units: 3 },
              { code: "GEMS", name: "Ethics", units: 3 },
              { code: "GE107", name: "Art Appreciation", units: 3 },
              { code: "IT100", name: "Computer Concepts and Fundamentals", units: 3 },
              { code: "IT101", name: "Fundamentals of Problem Solving and Programming 1", units: 3 },
              { code: "NSTP101", name: "NSTP I", units: 3 },
              { code: "GPE101", name: "Physical Fitness", units: 2 },
              { code: "GEU101", name: "Euthenics I", units: 1 },
            ],
          },
          {
            name: "2nd Semester",
            courses: [
              { code: "GE102", name: "Purposive Communication", units: 3 },
              { code: "GE103", name: "Science, Technology and Society", units: 3 },
              { code: "GE104", name: "Understanding the Self", units: 3 },
              { code: "GE105", name: "Mga Babasahin Hinggil sa Kasaysayan", units: 3 },
              { code: "IT102", name: "Discrete Mathematics", units: 3 },
              { code: "IT103", name: "Fundamentals of Problem Solving and Programming 2", units: 3 },
              { code: "NSTP102", name: "NSTP 2", units: 3 },
              { code: "GPE102", name: "Rhythmic Activities", units: 2 },
            ],
          },
        ],
      },
      {
        name: "SECOND YEAR",
        semesters: [
          {
            name: "1st Semester",
            courses: [
              { code: "IT202", name: "Human-Computer Interaction", units: 3 },
              { code: "IT201", name: "Data Structures and Algorithm", units: 3 },
              { code: "IT204", name: "Information Management", units: 3 },
              { code: "IT205", name: "Quantitative Methods", units: 3 },
              { code: "IT-ELEC1", name: "Platform Technologies", units: 3 },
              { code: "IT200", name: "Object-Oriented Programming", units: 3 },
              { code: "GEE200", name: "Foreign Language 1", units: 3 },
              { code: "GPE103", name: "Individual/Dual Sports", units: 2 },
              { code: "GEU102", name: "Euthenics 2", units: 1 },
            ],
          },
          {
            name: "2nd Semester",
            courses: [
              { code: "GEE101", name: "Philippine Popular Culture with ASEAN", units: 3 },
              { code: "GE109", name: "Life and Works of Rizal", units: 3 },
              { code: "IT206", name: "Advance Database Management System", units: 3 },
              { code: "IT207", name: "Integrative Programming and Technologies", units: 3 },
              { code: "IT-ELEC2", name: "Web Systems and Technologies", units: 3 },
              { code: "IT208", name: "IT Project Management", units: 3 },
              { code: "IT203", name: "Data Communication and Networking", units: 3 },
              { code: "GPE104", name: "Team Sports", units: 2 },
            ],
          },
        ],
      },
      {
        name: "THIRD YEAR",
        semesters: [
          {
            name: "1st Semester",
            courses: [
              { code: "IT303", name: "System Integration and Architecture 1", units: 3 },
              { code: "IT-ELEC3", name: "Computer Systems Servicing", units: 3 },
              { code: "IT302", name: "Information Assurance and Security 1", units: 3 },
              { code: "IT-ELEC4", name: "Mobile Application Dev't and Programming", units: 3 },
              { code: "GE106", name: "The Contemporary World", units: 3 },
              { code: "IT304", name: "Methods of Research", units: 3 },
              { code: "IT305", name: "Application Development and Emerging Technologies", units: 3 },
              { code: "GEE201", name: "Foreign Language 2", units: 3 },
              { code: "GEU103", name: "Euthenics 3", units: 1 },
            ],
          },
          {
            name: "2nd Semester",
            courses: [
              { code: "IT307", name: "System Administration and Maintenance", units: 3 },
              { code: "IT301", name: "Advance Data Communication and Networking", units: 3 },
              { code: "IT308", name: "Event Driven Programming", units: 3 },
              { code: "ITC100", name: "Capstone Project 1", units: 3 },
              { code: "ITP400", name: "System Integration and Architecture 2", units: 3 },
              { code: "IT306", name: "Information Assurance and Security 2", units: 3 },
              { code: "ITPE04", name: "Internet of Things", units: 3 },
              { code: "GEE102", name: "Environmental Science", units: 3 },
            ],
          },
        ],
      },
      {
        name: "FOURTH YEAR",
        semesters: [
          {
            name: "1st Semester",
            courses: [
              { code: "IT401", name: "Social/Professional Issues and Practice", units: 3 },
              { code: "ITC200", name: "Capstone Project 2", units: 3 },
              { code: "GEU104", name: "Euthenics 4", units: 1 },
              { code: "GEE103", name: "The Entrepreneurial Mind", units: 3 },
            ],
          },
          {
            name: "2nd Semester",
            courses: [
              { code: "IT500", name: "OJT/Practicum (500)", units: 6 },
            ],
          },
        ],
      }
      ],
      '2024-2025': [
      {
        name: "FIRST YEAR",
        semesters: [
        {
          name: "1st Semester",
          courses: [
          { code: "GE101", name: "Mathematics in the Modern World", units: 3 },
          { code: "GE102", name: "Purposive Communication", units: 3 },
          { code: "GE103", name: "Science, Technology and Society", units: 3 },
          { code: "GE104", name: "Understanding the Self", units: 3 },
          { code: "IT100", name: "Introduction to Computing", units: 3 },
          { code: "IT101", name: "Fundamentals of Problem Solving and Programming 1", units: 3 },
          { code: "NSTP101", name: "National Service Training Program 1", units: 3 },
          { code: "PATHFit1", name: "Movement and Competency Training", units: 2 },
          { code: "GEU101", name: "Accountability", units: 1 },
          ]
        },
        {
          name: "2nd Semester",
          courses: [
          { code: "GE105", name: "Mga Babasahin Hinggil sa Kasaysayan", units: 3 },
          { code: "GE106", name: "The Contemporary World", units: 3 },
          { code: "GE107", name: "Art Appreciation", units: 3 },
          { code: "GEE101", name: "Environmental Science", units: 3 },
          { code: "GE108", name: "Ethics", units: 3 },
          { code: "IT102", name: "Discrete Mathematics", units: 3 },
          { code: "IT103", name: "Fundamentals of Problem Solving and Programming 2", units: 3 },
          { code: "NSTP102", name: "National Service Training Program 2", units: 3 },
          { code: "PATHFit2", name: "Exercise-Based Fitness", units: 2 },
          ]
        }
        ]
      },
      {
        name: "SECOND YEAR",
        semesters: [
        {
          name: "1st Semester",
          courses: [
          { code: "IT202", name: "Human-Computer Interaction", units: 3 },
          { code: "IT201", name: "Data Structures and Algorithm", units: 3 },
          { code: "IT204", name: "Information Management", units: 3 },
          { code: "IT203", name: "Networking 1", units: 3 },
          { code: "IT-ELEC1", name: "Platform Technologies", units: 3 },
          { code: "IT200", name: "Object-Oriented Programming", units: 3 },
          { code: "GEE200", name: "Foreign Language 1", units: 3 },
          { code: "PATHFit3", name: "Social Dances", units: 2 },
          { code: "GEU102", name: "Service", units: 1 },
          ]
        },
        {
          name: "2nd Semester",
          courses: [
          { code: "GEE102", name: "Philippine Popular Culture with ASEAN", units: 3 },
          { code: "GE109", name: "Life and Works of Rizal", units: 3 },
          { code: "IT206", name: "Advance Database Management System", units: 3 },
          { code: "IT207", name: "Integrative Programming and Technologies", units: 3 },
          { code: "IT-ELEC2", name: "Web Systems and Technologies", units: 3 },
          { code: "IT208", name: "IT Project Management", units: 3 },
          { code: "IT205", name: "Quantitative Methods", units: 3 },
          { code: "PATHFit4", name: "Team Sports", units: 2 },
          ]
        }
        ]
      },
      {
        name: "THIRD YEAR",
        semesters: [
        {
          name: "1st Semester",
          courses: [
          { code: "IT303", name: "Systems Integration and Architecture 1", units: 3 },
          { code: "IT-ELEC3", name: "Computer Systems Servicing", units: 3 },
          { code: "IT302", name: "Information Assurance and Security 1", units: 3 },
          { code: "IT-ELEC4", name: "Mobile Application Dev't and Programming", units: 3 },
          { code: "IT304", name: "Information Technology Research Methods", units: 3 },
          { code: "IT305", name: "Application Development and Emerging Technologies", units: 3 },
          { code: "GEE201", name: "Foreign Language 2", units: 3 },
          { code: "IT301", name: "Networking 2", units: 3 },
          { code: "GEU103", name: "Dynamism", units: 1 },
          ]
        },
        {
          name: "2nd Semester",
          courses: [
          { code: "IT307", name: "Systems Administration and Maintenance", units: 3 },
          { code: "IT-ELEC5", name: "Cloud Computing", units: 3 },
          { code: "IT308", name: "Event Driven Programming", units: 3 },
          { code: "ITC100", name: "Capstone Project 1", units: 3 },
          { code: "IT309", name: "Systems Integration and Architecture 2", units: 3 },
          { code: "IT306", name: "Information Assurance and Security 2", units: 3 },
          { code: "IT-ELEC6", name: "Project Innovation and Utilization", units: 3 },
          { code: "IT310", name: "Internet of Things", units: 3 },
          ]
        }
        ]
      },
      {
        name: "FOURTH YEAR",
        semesters: [
        {
          name: "1st Semester",
          courses: [
          { code: "IT401", name: "Social/Professional Issues and Practice", units: 3 },
          { code: "ITC200", name: "Capstone Project 2", units: 3 },
          { code: "GEU104", name: "Competence", units: 1 },
          { code: "IT-ELEC7", name: "Innovation and Technology Management", units: 3 },
          { code: "GEE103", name: "The Entrepreneurial Mind", units: 3 },
          ]
        },
        {
          name: "2nd Semester",
          courses: [
          { code: "IT500", name: "OJT/Practicum (500)", units: 6 },
          ]
        }
        ]
      }
      ]
     
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

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentNumber = localStorage.getItem('studentNumber')
        if (!studentNumber) {
         
            window.location.href = '/student_portal'
        }

        const response = await fetch(`http://127.0.0.1:8000/API/students/${studentNumber}`)
        if (!response.ok) {
          throw new Error('Failed to fetch student data')
        }

        const data = await response.json()
        setStudent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStudentData()
  }, [])

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

  const curriculum = curriculumData[student.curriculum_year]

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