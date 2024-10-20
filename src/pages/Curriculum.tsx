'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export default function CurriculumForm() {
  const [courseStatus, setCourseStatus] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [curriculumYear, setCurriculumYear] = useState<CurriculumYear>('2024-2025')
  const [expandedYears, setExpandedYears] = useState<string[]>([])

  useEffect(() => {
    fetch("https://sdcamicrosite.pythonanywhere.com/API/students")
      .then((res) => res.json())
      .then(setStudents)
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  const curriculum = curriculumData[curriculumYear]

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
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(lowercasedTerm) || 
      student.student_number.includes(lowercasedTerm)
    ) 
    return filtered 
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
    console.log(courseStatus)
    const url = "https://sdcamicrosite.pythonanywhere.com/API/setCurriculumStatus"
    fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        student_id: selectedStudent?.id,
        status: courseStatus, 
        curriculum_year: curriculumYear
      })
    }).then(
      (response) => response.json()
    ).then((data) => {
        // clear the form 
        setSelectedStudent(null)
        setSearchTerm("")
        setCourseStatus(generateDefaultCourseStatus(curriculum))
        alert('Successfully submitted curriculum form.')
        // get the updated list of students 
        fetch("https://sdcamicrosite.pythonanywhere.com/API/students")
        .then((res) => res.json())
        .then((students) =>{
          setStudents(students)
        }

        )
        window.scrollTo(0, 0)
    }).catch((error) => {
      console.error('Error:', error)
    }
    )
  }



  const toggleYearExpansion = (yearName: string) => {
    setExpandedYears(prev => 
      prev.includes(yearName)
        ? prev.filter(y => y !== yearName)
        : [...prev, yearName]
    )
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
              <Select value={curriculumYear} onValueChange={(value: CurriculumYear) => setCurriculumYear(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2018-2019">2018-2019</SelectItem>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
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