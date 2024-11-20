import { useState } from 'react'
import { Bell, UserPlus, FileText, Calendar, Mail } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Notification = {
  id: string
  type: 'request' | 'submission' | 'event' | 'announcement'
  title: string
  description: string
  date: string
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'request', title: 'John Doe requested to join Structural Engineering', description: 'New student request', date: '2023-05-15' },
    { id: '2', type: 'submission', title: 'Sarah Smith submitted Assignment 3', description: 'Fluid Mechanics - Week 3', date: '2023-05-14' },
    { id: '3', type: 'event', title: 'Upcoming Webinar', description: 'Latest Trends in Sustainable Construction', date: '2023-05-20' },
    { id: '4', type: 'announcement', title: 'New Course Available', description: 'Introduction to BIM for Civil Engineers', date: '2023-05-13' },
    { id: '5', type: 'request', title: 'Emily Johnson requested to join Geotechnical Engineering', description: 'New student request', date: '2023-05-12' },
    { id: '6', type: 'submission', title: 'Michael Brown submitted Final Project', description: 'Transportation Systems Design', date: '2023-05-11' },
  ])

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'request': return <UserPlus className="h-4 w-4" />
      case 'submission': return <FileText className="h-4 w-4" />
      case 'event': return <Calendar className="h-4 w-4" />
      case 'announcement': return <Mail className="h-4 w-4" />
    }
  }

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'request': return 'bg-blue-500'
      case 'submission': return 'bg-green-500'
      case 'event': return 'bg-yellow-500'
      case 'announcement': return 'bg-purple-500'
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notification Center
        </CardTitle>
        <CardDescription>
          Stay updated with student requests, submissions, and important announcements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>
          {['all', 'requests', 'submissions', 'events', 'announcements'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="space-y-4">
                {notifications
                  .filter(n => tab === 'all' || n.type === tab.slice(0, -1))
                  .map(notification => (
                    <div key={notification.id} className="flex items-start space-x-4 p-4 rounded-lg bg-secondary">
                      <div className={`${getColor(notification.type)} p-2 rounded-full`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground">{notification.date}</p>
                      </div>
                      <Badge variant="outline">{notification.type}</Badge>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}