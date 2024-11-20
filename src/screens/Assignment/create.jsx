'use client'
import '../Courses/courses.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Calendar, ArrowLeft } from 'lucide-react';

export default function CreateAssignment() {
  const navigate = useNavigate();
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    dueDate: '',
    courseId: '',
  });
  const [courses, setCourses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/courses/teachers/courses', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data.courses || []);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { title, description, dueDate, courseId } = assignmentData;
    if (!title || !description || !dueDate || !courseId) {
      setError('All fields are required.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:4000/api/courses/courses/${assignmentData.courseId}/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: assignmentData.title,
          description: assignmentData.description,
          dueDate: assignmentData.dueDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create assignment');
      }

      const data = await response.json();
      console.log('Assignment created:', data);

      navigate('/teachers'); // Redirect after success
    } catch (err) {
      setError(err.message || 'Failed to create the assignment. Please try again later.');
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
            <Calendar className="mr-2 h-6 w-6" />
            Create New Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-600">{error}</div>}
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
              <Label htmlFor="courseId">Select Course</Label>
              {loadingCourses ? (
                <div>Loading courses...</div>
              ) : (
                <select
                  id="courseId"
                  name="courseId"
                  value={assignmentData.courseId}
                  onChange={handleInputChange}
                  required
                  className="block w-full border rounded p-2"
                >
                  <option value="">-- Select a Course --</option>
                  {courses.length === 0 ? (
                    <option disabled>No courses available</option>
                  ) : (
                    courses.map(course => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))
                  )}
                </select>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => navigate('/teachers')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Assignment...' : 'Create Assignment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
