import React from 'react'
import { Link } from 'react-router-dom';
import { BookOpen, Users, Video, FileText, CreditCard, Award, BarChart, Settings, ArrowRight, Clock, Lightbulb, Menu } from "lucide-react"


<Link to="/features">Features</Link>
export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
            <span className="font-bold text-xl">MSCE PrepMaster</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#for-teachers" className="text-sm font-medium hover:text-blue-600 transition-colors">
              For Teachers
            </Link>
            <Link href="#for-students" className="text-sm font-medium hover:text-blue-600 transition-colors">
              For Students
            </Link>
            <Link href="/login" className="text-sm font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Sign Up
            </Link>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col space-y-4 p-4">
              <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="#for-teachers" className="text-sm font-medium hover:text-blue-600 transition-colors">
                For Teachers
              </Link>
              <Link href="#for-students" className="text-sm font-medium hover:text-blue-600 transition-colors">
                For Students
              </Link>
              <Link href="/login" className="text-sm font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-center">
                Log In
              </Link>
              <Link href="/signup" className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center">
                Sign Up
              </Link>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Master Your MSCE Exams with PrepMaster
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                Comprehensive online preparation platform for students and teachers. Excel in your MSCE exams with expert-led courses, live classes, and interactive assessments.
              </p>
              <div className="space-x-4">
                <a href="#" className="inline-block px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors">Get Started</a>
                <a href="#" className="inline-block px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white/20 transition-colors">Learn More</a>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose MSCE PrepMaster?</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                { icon: BookOpen, title: "Comprehensive Coverage", description: "In-depth content for all MSCE subjects, aligned with the latest curriculum." },
                { icon: Clock, title: "Flexible Learning", description: "Study at your own pace with 24/7 access to lessons and practice materials." },
                { icon: Lightbulb, title: "Interactive Practice", description: "Engage with quizzes, mock exams, and problem-solving exercises for better retention." }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
                  <feature.icon className="h-12 w-12 text-blue-600" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Your MSCE Prep Dashboard</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                { icon: Users, title: "User Roles", value: "3 Types", description: "Student, Teacher, Admin" },
                { icon: BookOpen, title: "Courses", value: "50+", description: "MSCE Subjects Covered" },
                { icon: Video, title: "Live Classes", value: "24/7", description: "Interactive Sessions" },
                { icon: FileText, title: "Assessments", value: "1000+", description: "Quizzes and Mock Exams" },
                { icon: CreditCard, title: "Payment System", value: "Secure", description: "Paychangu API Integration" },
                { icon: Award, title: "MSCE Registration", value: "Official", description: "Exam Registration Support" }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">{feature.title}</h3>
                    <feature.icon className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold">{feature.value}</div>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Tools for Success</h2>
                <p className="text-gray-600 text-lg">
                  MSCE PrepMaster provides a comprehensive suite of tools designed to enhance your learning experience and boost your exam performance.
                </p>
                <ul className="space-y-2">
                  {[
                    { icon: BarChart, text: "Advanced Analytics to Track Your Progress" },
                    { icon: Settings, text: "Customizable Study Plans" },
                    { icon: Users, text: "Collaborative Learning Forums" },
                    { icon: FileText, text: "Comprehensive Study Materials" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5 text-blue-600" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">Explore Features</a>
              </div>
              <div className="lg:order-first">
                <img
                  alt="MSCE PrepMaster Dashboard"
                  className="mx-auto aspect-video rounded-xl object-cover object-center"
                  height="300"
                  src="/placeholder.svg"
                  width="400"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="for-students" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Join Our Learning Community</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "For Students",
                  features: [
                    "Access comprehensive MSCE prep materials",
                    "Engage in live classes and discussions",
                    "Track your progress and identify areas for improvement"
                  ],
                  cta: "Sign Up as Student"
                },
                {
                  title: "For Teachers",
                  features: [
                    "Create and manage courses effortlessly",
                    "Conduct live classes and engage with students",
                    "Design custom assessments and track student performance"
                  ],
                  cta: "Join as Teacher"
                },
                {
                  title: "For Admins",
                  features: [
                    "Manage user roles and permissions",
                    "Monitor platform usage and performance",
                    "Generate reports and analytics"
                  ],
                  cta: "Admin Access"
                }
              ].map((role, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">{role.title}</h3>
                  <ul className="space-y-2 mb-4">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <ArrowRight className="mr-2 h-4 w-4 text-blue-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">{role.cta}</a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Excel in Your MSCE Exams?</h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                  Join MSCE PrepMaster today and take the first step towards achieving your academic goals. Start your journey to success now!
                </p>
              </div>
              <a href="#" className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-white border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-600">© 2024 MSCE PrepMaster. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs hover:underline underline-offset-4">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}