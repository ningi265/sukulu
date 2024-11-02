import React, { useState } from 'react'
import { 
  BookOpen, 
  Video, 
  FileText, 
  Calendar, 
  BarChart, 
  Clock,
  Bell,
  User,
  Search,
  ChevronDown,
  LogOut
} from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration purposes
const courses = [
  { id: 1, title: 'Mathematics', progress: 75, nextLesson: 'Algebra II', nextLessonDate: '2024-03-15 14:00' },
  { id: 2, title: 'English', progress: 60, nextLesson: 'Literature Analysis', nextLessonDate: '2024-03-16 10:00' },
  { id: 3, title: 'Biology', progress: 90, nextLesson: 'Cell Structure', nextLessonDate: '2024-03-17 11:30' },
]

const assignments = [
  { id: 1, title: 'Math Homework', dueDate: '2024-03-15', status: 'Pending' },
  { id: 2, title: 'English Essay', dueDate: '2024-03-20', status: 'Submitted' },
  { id: 3, title: 'Biology Lab Report', dueDate: '2024-03-25', status: 'Graded', grade: 'A' },
]

const upcomingClasses = [
  { id: 1, title: 'Advanced Algebra', date: '2024-03-10 14:00', duration: '1 hour' },
  { id: 2, title: 'Literature Analysis', date: '2024-03-12 15:30', duration: '1.5 hours' },
]

const examSchedule = [
  { id: 1, subject: 'Mathematics', date: '2024-04-05 09:00', duration: '3 hours' },
  { id: 2, subject: 'English', date: '2024-04-07 09:00', duration: '3 hours' },
  { id: 3, subject: 'Biology', date: '2024-04-09 09:00', duration: '3 hours' },
]

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard title="Enrolled Courses" icon={<BookOpen className="w-6 h-6" />} value={courses.length} />
              <DashboardCard title="Upcoming Classes" icon={<Video className="w-6 h-6" />} value={upcomingClasses.length} />
              <DashboardCard title="Pending Assignments" icon={<FileText className="w-6 h-6" />} value={assignments.filter(a => a.status === 'Pending').length} />
              <DashboardCard title="Upcoming Exams" icon={<Calendar className="w-6 h-6" />} value={examSchedule.length} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Completed "Introduction to Calculus" lesson
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Submitted English Essay
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Joined "Biology Study Group" discussion
                </li>
              </ul>
            </div>
          </div>
        )
      case 'courses':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )
      case 'assignments':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Assignments</h2>
            <div className="bg-white overflow-hidden shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map(assignment => (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assignment.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          assignment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          assignment.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.grade || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'schedule':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Class Schedule</h2>
            <div className="bg-white overflow-hidden shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingClasses.map(classItem => (
                    <tr key={classItem.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{classItem.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'exams':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Exam Schedule</h2>
            <div className="bg-white overflow-hidden shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {examSchedule.map(exam => (
                    <tr key={exam.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="w-6 h-6" />
            </button>
            <div className="relative">
              <button 
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <User className="w-6 h-6" />
                <ChevronDown className="w-4 h-4" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut className="w-4 h-4 inline-block mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-4 mb-8">
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'courses' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'assignments' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('assignments')}
          >
            Assignments
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'schedule' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('schedule')}
          >
            Schedule
          </button>
          <button
            className={`px-3 py-2 rounded-md ${activeTab === 'exams' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('exams')}
          >
            Exams
          </button>
        </nav>
        {renderTabContent()}
      </main>
    </div>
  )
}

function DashboardCard({ title, icon, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600  mt-1">{course.progress}% Complete</p>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700">Next Lesson:</h4>
        <p className="text-sm text-gray-600">{course.nextLesson}</p>
        <p className="text-xs text-gray-500">{course.nextLessonDate}</p>
      </div>
      <Link 
        href={`/course/${course.id}`}
        className="text-blue-500 hover:text-blue-700 font-medium"
      >
        Go to Course
      </Link>
    </div>
  )
}