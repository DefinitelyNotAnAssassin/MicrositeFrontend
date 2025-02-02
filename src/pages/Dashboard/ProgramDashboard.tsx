"use client"

import React, { useState, useEffect, useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Navbar from  './Navbar'
import { getJwt } from '@/utils/Cookies'
import { BASE_URL } from '@/constants/UrlConstants'
import axios from '@/utils/AuthAxios'
import { ProgramContext } from '@/contexts/ProgramContext'



type ProgramStats = {
  enrolled: number
  graduated: number
  failed: number
  incomplete: number
  number_of_students: number
  total_students: number  
}

type YearlyData = {
  year: string
  total_students: number
  pass_rate: number
  fail_rate: number
  incomplete_rate: number
  enrolled_rate: number
}

type Account = { 
    username: string
    firstname: string
    lastname: string
    password: string
    role: string 
    program: string
    department: string
    email: string
}

export default function ProgramDashboard() {
  const [programStats, setProgramStats] = useState<ProgramStats | null>(null)
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [account, setAccount] = useState<Account | null>(null)

  const program = useContext(ProgramContext)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programResponse, yearlyResponse] = await Promise.all([
          axios.get(`${BASE_URL}/API/getProgramData`),
          axios.get(`${BASE_URL}/API/getYearlyPerformance`),
        ])

        const programData = programResponse.data
        const yearlyData = yearlyResponse.data

        setProgramStats(programData)
        setYearlyData(yearlyData)
        setSelectedYear(yearlyData[yearlyData.length - 1].year)

        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setAccount(user.account)

        setLoading(false)
      } catch (err) {
        setLoading(false)
        window.location.href = "/program_chair_login"
      }
    }

    fetchData()
 
  }, [])

  useEffect(() => {

    console.log(programStats, yearlyData, selectedYear, account)
  }, [programStats, yearlyData, selectedYear, account])


  const handleYearChange = (year: string) => {
    setSelectedYear(year)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error || !programStats) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
}

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Program Dashboard</h1>
        
        {account && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Name:</p>
                  <p>{account.lastname + ', ' + account.firstname}</p>
                </div>
                <div>
                  <p className="font-semibold">Role:</p>
                  <p>{account.role}</p>
                </div>
                <div>
                  <p className="font-semibold">Program:</p>
                  <p>{account.program}</p>
                </div>
                <div>
                  <p className="font-semibold">Department:</p>
                  <p>{account.department}</p>
                </div>
                <div>
                  <p className="font-semibold">Email:</p>
                  <p>{account.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{programStats.total_students}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Students with Failed Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{programStats.failed}</p>
              <p className="text-sm text-muted-foreground">
                ({((programStats.failed / programStats.number_of_students) * 100).toFixed(1)}%)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{programStats.enrolled}</p>
              <p className="text-sm text-muted-foreground">
                ({((programStats.enrolled / programStats.number_of_students) * 100).toFixed(1)}%)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Graduated Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{programStats.graduated}</p>
              <p className="text-sm text-muted-foreground">
                ({((programStats.graduated / programStats.number_of_students) * 100).toFixed(1)}%)
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList>
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Performance</CardTitle>
                <Select onValueChange={handleYearChange} value={selectedYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearlyData.map((data) => (
                      <SelectItem key={data.year} value={data.year}>
                        {data.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    pass_rate: {
                      label: "Pass Rate",
                      color: "rgb(54, 162, 235)",
                    },
                    fail_rate: {
                      label: "Fail Rate",
                      color: "rgb(255, 99, 132)",
                    },
                    incomplete_rate: {
                      label: "Incomplete Rate",
                      color: "rgb(255, 206, 86)",
                    },
                    enrolled_rate: {
                      label: "Enrolled Rate",
                      color: "rgb(75, 192, 192)",
                    },
                  }}
                  className="h-[400px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yearlyData.filter(data => data.year === selectedYear)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="pass_rate" fill="var(--color-pass_rate)" name="Pass Rate" />
                      <Bar dataKey="fail_rate" fill="var(--color-fail_rate)" name="Fail Rate" />
                      <Bar dataKey="incomplete_rate" fill="var(--color-incomplete_rate)" name="Incomplete Rate" />
                      <Bar dataKey="enrolled_rate" fill="var(--color-enrolled_rate)" name="Enrolled Rate" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="table">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Total Students</TableHead>
                      <TableHead>Pass Rate (%)</TableHead>
                      <TableHead>Fail Rate (%)</TableHead>
                      <TableHead>Incomplete Rate (%)</TableHead>
                      <TableHead>Enrolled Rate (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yearlyData.map((data) => (
                      <TableRow key={data.year}>
                        <TableCell>{data.year}</TableCell>
                        <TableCell>{data.total_students}</TableCell>
                        <TableCell>{data.pass_rate.toFixed(2)}</TableCell>
                        <TableCell>{data.fail_rate.toFixed(2)}</TableCell>
                        <TableCell>{data.incomplete_rate.toFixed(2)}</TableCell>
                        <TableCell>{data.enrolled_rate.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}