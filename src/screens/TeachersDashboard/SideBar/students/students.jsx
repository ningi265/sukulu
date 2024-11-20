import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudentsPage() {
  const students = [
    { id: 1, name: "Alice Johnson", grade: "A", course: "Mathematics" },
    { id: 2, name: "Bob Smith", grade: "B", course: "Physics" },
    { id: 3, name: "Charlie Brown", grade: "A-", course: "Chemistry" },
    { id: 4, name: "Diana Ross", grade: "B+", course: "Biology" },
    { id: 5, name: "Ethan Hunt", grade: "A+", course: "Computer Science" },
  ]

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Students</h1>
      <div className="grid gap-6">
        {students.map((student) => (
          <Card key={student.id}>
            <CardHeader className="flex flex-row items-center space-y-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${student.name}`} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="ml-4 text-lg font-medium">
                {student.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <p>Course: {student.course}</p>
                <p>Grade: {student.grade}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}