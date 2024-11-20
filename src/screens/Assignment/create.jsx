
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { FileText, ArrowLeft } from 'lucide-react'

export default function CreateAssignment() {
  const router = useRouter()
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    course: '',
    dueDate: '',
    maxScore: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAssignmentData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleCourseSelect = (value: string) => {
    setAssignmentData(prevData => ({
      ...prevData,
      course: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the assignmentData to your API
    console.log('Assignment data submitted:', assignmentData)
    // After successful submission, redirect back to the dashboard
    router.push('/teacher-dashboard')
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => router.push('/teacher-dashboard')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <FileText className="mr-2 h-6 w-6" />
            Create New Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title</Label>
              <Input
                id="title"
                name="title"
                value={assignmentData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Assignment Description</Label>
              <Textarea
                id="description"
                name="description"
                value={assignmentData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select onValueChange={handleCourseSelect} value={assignmentData.course}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course1">Course 1</SelectItem>
                  <SelectItem value="course2">Course 2</SelectItem>
                  <SelectItem value="course3">Course 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={assignmentData.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxScore">Maximum Score</Label>
              <Input
                id="maxScore"
                name="maxScore"
                type="number"
                value={assignmentData.maxScore}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push('/teacher-dashboard')}>
                Cancel
              </Button>
              <Button type="submit">Create Assignment</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}