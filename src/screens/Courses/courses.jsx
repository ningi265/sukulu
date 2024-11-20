'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { BookOpen, ArrowLeft } from 'lucide-react'

export default function CreateCourse() {
  const router = useRouter()
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '',
    maxStudents: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCourseData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the courseData to your API
    console.log('Course data submitted:', courseData)
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
            <BookOpen className="mr-2 h-6 w-6" />
            Create New Course
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (in weeks)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={courseData.duration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxStudents">Maximum Number of Students</Label>
              <Input
                id="maxStudents"
                name="maxStudents"
                type="number"
                value={courseData.maxStudents}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push('/teacher-dashboard')}>
                Cancel
              </Button>
              <Button type="submit">Create Course</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}