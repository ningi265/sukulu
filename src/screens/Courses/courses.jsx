'use client'
import './courses.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { BookOpen, ArrowLeft } from 'lucide-react'

export default function CreateCourse() {
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    duration: '',
    content: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourseData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const validateForm = () => {
    // Simple form validation
    const { title, description, duration, content } = courseData
    if (!title || !description || !duration || !content) {
      setError('All fields are required.')
      return false
    }
    setError(null)
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch('http://localhost:4000/api/courses/', { // Adjust the endpoint as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Assuming JWT authentication
        },
        body: JSON.stringify(courseData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create course');
      }
  
      const data = await response.json();
      console.log('Course created:', data);
  
      // Navigate to teacher dashboard
      navigate('/teachers');
    } catch (err) {
      setError(err.message || 'Failed to create the course. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => navigate('/teachers')} className="mb-4">
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
            {error && <div className="text-red-600">{error}</div>} {/* Display error message */}
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
              <Label htmlFor="maxStudents">Resource</Label>
              <Textarea
                id="content"
                name="content"
                value={courseData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => navigate('/teachers')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Course...' : 'Create Course'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
