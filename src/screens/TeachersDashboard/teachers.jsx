import './teachers-dashboard.css';
import React, { useEffect, useState } from 'react';
import { getDashboardStats, getCourses, getStudents, getAssignments } from './apiService';
import {Link} from 'react-router-dom';
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { BookOpen, Users,ChevronDown,User, Video, FileText, BarChart, Bell, Plus, Settings, LogOut } from 'lucide-react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Badge from '@mui/material/Badge'; 



export default function TeacherDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const sidebarLinks = [
    { href: "#dashboard", icon: BarChart, label: "Dashboard" },
    { href: "#courses", icon: BookOpen, label: "Subjects" },
    { href: "#students", icon: Users, label: "Students" },
    { href: "#live-classes", icon: Video, label: "Live Classes" },
    { href: "#assessments", icon: FileText, label: "Assessments" },
    { href: "#forums", icon: FileText, label: "forums" },
  ]

  const [stats, setStats] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, coursesRes, studentsRes, assignmentsRes] = await Promise.all([
          getDashboardStats(),
          getCourses(),
          getStudents(),
          getAssignments(),
        ]);
        setStats(statsRes.data);
        setCourses(coursesRes.data);
        setStudents(studentsRes.data);
        setAssignments(assignmentsRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchNotifications = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/enrollments/notification/teacher/count', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Notification count response:', response.data); // Log the API response
        setNotificationCount(response.data.count);
      } catch (error) {
        console.error('Error fetching notifications count:', error);
      }
    };
    fetchData();
    fetchNotifications();
  }, []);

  const getTeacherNotifications = async (token) => {
    try {
      const response = await axios.get('http://localhost:4000/api/enrollments/notification/teacher', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.notifications;
    } catch (error) {
      console.error('Error fetching teacher notifications:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      // Send a logout request to the server
      const response = await fetch('http://localhost:4000/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Use the correct key for the token
        },
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Logout failed'); // Handle unsuccessful logout
      }
      const currentToken = sessionStorage.getItem('token');
      console.log('Current session token before removal:', currentToken);
  
      sessionStorage.removeItem('token');

      const removedToken = sessionStorage.getItem('token');
    console.log('Session token after removal:', removedToken); // Should be null or undefined
      // Clear the authentication token from storage
      localStorage.removeItem('token'); // Ensure this matches the key used to store the token
  
      // Redirect to the home page
      navigate('/'); // Use navigate from react-router-dom v6 or later
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, you can show an error message to the user
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleClick = () => {
    navigate('/course'); // Navigate to the 'create-course' page
  };
  const handleClick1 = () => {
    navigate('/assignment');
  }
  const handleClick2 = () => {
    navigate('/course');
  }
  const handleBellClick = () => {
    navigate('/notification'); // Navigate to the notifications page
  };
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="aside">
  <div className="p-4">
    <Link to="/" className="flex items-center space-x-2 text-primary">
      <BookOpen className="h-8 w-8" />
      <span className="text-xl font-bold">MSCE PrepMaster</span>
    </Link>
  </div>
  <nav className="mt-8 px-4 space-y-2">
    {sidebarLinks.map((link) => (
      <Link
        key={link.href}
        to={link.href}
        className="flex items-center space-x-2 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors w-full"
      >
        <link.icon className="h-5 w-5" />
        <span>{link.label}</span>
      </Link>
    ))}
  </nav>
</aside>

      {/* Main Content */}
      <main className="maint">
        {/* Header */}
        <header className="headert">
    <div className="header-content flex items-center justify-between px-8 py-4">
      {/* Left-aligned Title */}
      <h1 className="header-title text-2xl font-semibold">Teachers Dashboard</h1>

      {/* Right-aligned Notifications and Dropdown */}
      <div className="header-right flex items-center space-x-4">
        {/* Notification Bell */}
        <button 
            className="text-gray-500 hover:text-gray-700 relative"
            onClick={handleBellClick}
          >
            <Badge badgeContent={notificationCount} color="primary">
              <Bell className="w-6 h-6" />
            </Badge>
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
                  <button 
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={handleLogout} // Add the onClick function here
    >
      <LogOut className="w-4 h-4 inline-block mr-2" />
      Logout
    </button>
                </div>
              )}
            </div>
      </div>
    </div>
  </header>

        {/* Dashboard Content */}
        <div className="dashboard">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Tabs defaultValue="courses">
              <TabsList>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="students">Recent Students</TabsTrigger>
                <TabsTrigger value="assignments">Recent Assignments</TabsTrigger>
              </TabsList>
              <TabsContent value="courses" className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <Input
                    className="max-w-sm"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                 <button
      onClick={handleClick} // Place the onClick here
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <Plus className="mr-2 h-4 w-4" /> {/* Icon */}
      Create Course
    </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {courses
                    .filter((course) =>
                      course.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((course) => (
                      <Card key={course.id}>
                        <CardHeader>
                          <CardTitle>{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">Students: {course.students}</p>
                          <p className="text-sm text-muted-foreground">Last updated: {course.lastUpdated}</p>
                          <Button className="mt-4 w-full" variant="outline">Manage Course</Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="students" className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <Input
                    className="max-w-sm"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students
                        .filter((student) =>
                          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((student) => (
                          <tr key={student.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <Avatar>
                                    <AvatarImage src={`/placeholder-avatar-${student.id}.jpg`} alt={student.name} />
                                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{student.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{student.course}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{student.progress}%</div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="assignments" className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <Input
                    className="max-w-sm"
                    placeholder="Search assignments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
      onClick={handleClick1} // Place the onClick here
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <Plus className="mr-2 h-4 w-4" /> {/* Icon */}
      Create Assignment
    </button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {assignments
                        .filter((assignment) =>
                          assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((assignment) => (
                          <tr key={assignment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{assignment.course}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{assignment.dueDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{assignment.submissions}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button variant="ghost">View</Button>
                              <Button variant="ghost">Edit</Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}