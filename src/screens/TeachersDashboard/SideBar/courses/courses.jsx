import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from 'lucide-react'

export default function CoursesPage() {
  const courses = [
    { id: 1, name: "Mathematics", students: 120 },
    { id: 2, name: "Physics", students: 90 },
    { id: 3, name: "Chemistry", students: 85 },
    { id: 4, name: "Biology", students: 100 },
    { id: 5, name: "Computer Science", students: 150 },
  ]

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Subjects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {course.name}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{course.students}</div>
              <p className="text-xs text-muted-foreground">
                Students enrolled
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}