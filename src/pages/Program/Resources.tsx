import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from './Navbar'
import { ProgramContext } from '@/contexts/ProgramContext'

const resourceCategories = [
  {
    name: 'Curriculum',
    items: [
      { name: 'Curriculum Checklist 2018-2019', url: '#' },
      { name: 'Curriculum Checklist 2023-2024', url: '#' },
      { name: 'Curriculum Checklist 2024-2025', url: '#' },
    ],
  },
  {
    name: 'Forms',
    items: [
      { name: 'Enrollment Form', url: '#' },
      { name: 'Leave of Absence Form', url: '#' },
      { name: 'Internship Application', url: '#' },
    ],
  },
  {
    name: 'Student Handbook',
    items: [
      { name: 'Academic Policies', url: '#' },
      { name: 'Code of Conduct', url: '#' },
      { name: 'Grading System', url: '#' },
    ],
  },
  {
    name: 'Career Resources',
    items: [
      { name: 'Resume Template', url: '#' },
      { name: 'Interview Tips', url: '#' },
      { name: 'Job Search Guide', url: '#' },
    ],
  },
]

export default function ResourcesPage(props) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
  }
  const program = useContext(ProgramContext)

  return (

    <>
    
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
        >
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">{program.programAbbreviation} Resources</h1>
        <p className="text-center text-gray-600 mb-12">
            Access important documents and resources for your {program.programAbbreviation} journey.
        </p>
        {resourceCategories.map((category) => (
            <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
            >
            <Card>
                <CardHeader
                className="cursor-pointer"
                onClick={() => toggleCategory(category.name)}
                >
                <CardTitle className="flex justify-between items-center">
                    {category.name}
                    {expandedCategory === category.name ? (
                    <ChevronUp className="h-5 w-5" />
                    ) : (
                    <ChevronDown className="h-5 w-5" />
                    )}
                </CardTitle>
                </CardHeader>
                <motion.div
                initial="collapsed"
                animate={expandedCategory === category.name ? "expanded" : "collapsed"}
                variants={{
                    expanded: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                <CardContent>
                    <ul className="space-y-2">
                    {category.items.map((item) => (
                        <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        >
                        <a
                            href={item.url}
                            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        >
                            <span>{item.name}</span>
                            <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                            </Button>
                        </a>
                        </motion.li>
                    ))}
                    </ul>
                </CardContent>
                </motion.div>
            </Card>
            </motion.div>
        ))}
        </motion.div>
        </div>
    </>
   
  )
}