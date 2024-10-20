'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from './Navbar'

export default function MissionPage() {
  const [activeSection, setActiveSection] = useState('philosophy')
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }


  const sections = {
    philosophy: {
      title: 'SCMCS EDUCATIONAL PHILOSOPHY',
      content: 'Nurture a student-centered and holistic learning environment that cultivates innovative, socially responsible, and technologically adept leaders who serve as catalysts for better quality of life'
    },
    vision: {
      title: 'SCMCS VISION',
      content: 'SCMCS envisions itself as a center of innovative and creative learning, producing socially responsible and technologically competent decision-makers.'
    },
    mission: {
      title: 'SCMCS MISSION',
      content: 'Build and sustain leading edge programs, international collaboration, and a student-centric environment that address the boundaries of knowledge through research-driven culture across disciplines.'
    },
    goals: {
      title: 'SCMCS GOALS',
      content: [
        'Encourage, support, and maintain a student-centric environment.',
        'Develop 21st-century skills among students.',
        'Innovate student learning through continuous curriculum and instructional enhancement.',
        'Provide holistic and inclusive educational experience and work environment.',
        'Foster values-based, spiritual, and ethical principles.'
      ]
    },
    peo: {
      title: 'PROGRAM EDUCATIONAL OBJECTIVES (PEO) FOR BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY (BSIT)',
      content: [
        'Be well-versed on application, installation, operation, development, maintenance and administration of computers.',
        'Conduct relevant research and development activities in the field of information technology.',
        'Implement effective training and outreach programs that would contribute to the attainment of a better quality of life; and',
        'Function effectively as an individual and as a member or a leader in a diverse team and in multidisciplinary settings.'
      ]
    },
    plo: {
      title: 'PROGRAM LEARNING OUTCOMES (PLO) FOR BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY (BSIT)',
      content: [

    
        'Apply knowledge of computing science and mathematics appropriate to the discipline.',
        'Understand best practices and standards and their applications.',
        'Analyze complex problems and identify and define the computing requirements appropriate to its solutions.',
        'Identify and analyze use needs and take them into account in the selection, creation, evaluation and administration of computer-based systems.',
        'Design, implement and evaluate computer-based systems, processes, components or programs to meet desired needs and requirements under various constraints.',
        'Integrate IT-based solutions into the user environment effectively.',
        'Apply knowledge through the use of various techniques, skills, tools and practices necessary for the IT profession.',
        'Function effectively as a member or leader of a development team, recognizing the different roles within a team to accomplish a common goal.',
        'Assist in the creation of an effective IT Project Plan.',
        'Communicate effectively with the computing community and with society at large about complex computing activities through logical writing, presentation and clear instructions.',
        'Analyze the glo\u200Bbal impact of computing information technology on individuals, organization and society.',
        'Understand professional, ethical, legal, security and social issues and responsibilities in the utilization of information technology.',
        'Recognize the need for and engage in planning, self-learning and improving performance as a foundation for continuing professional development.'
        
      
    ]
    },
  }


  

  return (

    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-semibold text-center text-gray-900 mb-12"
      >
        SCHOOL OF COMMUNICATION, MULTIMEDIA, AND COMPUTER STUDIES
      </motion.h1>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(sections).map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-full ${
                activeSection === section
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section.toUpperCase()}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeSection}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white shadow-xl rounded-lg p-6 "
        >
          <h2 className="text-2xl font-semibold mb-4">{sections[activeSection].title}</h2>
          {Array.isArray(sections[activeSection].content) ? (
            <ol className="list-decimal list-inside space-y-2">
              {sections[activeSection].content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          ) : (
            <p>{sections[activeSection].content}</p>
          )}
        </motion.div>
      </div>
    </div>
    </>
  
  )
}