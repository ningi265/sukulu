import './homepage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Video, FileText, CreditCard, Award, BarChart, Settings, ArrowRight, Clock, Lightbulb, Menu } from "lucide-react";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="body">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
            <span className="font-bold text-xl">MSCE PrepMaster</span>
          </Link>
          <nav className="nav-links">
            <Link to="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link to="/teachers" className="text-sm font-medium hover:text-blue-600 transition-colors">
              For Teachers
            </Link>
            <Link to="/students" className="text-sm font-medium hover:text-blue-600 transition-colors">
              For Students
            </Link>
            <div className="auth-buttons">
            <Link to="/login" className='hero-btn1'>
              Log In
            </Link>
            <Link to="/signup" className='hero-btn1'>
              Sign Up
            </Link>
            </div>
          </nav>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {isMenuOpen && (
          <div className="mobile-menu">
            <nav className="flex flex-col space-y-4 p-4">
              <Link to="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link to="/teachers" className="text-sm font-medium hover:text-blue-600 transition-colors">
                For Teachers
              </Link>
              <Link to="/students" className="text-sm font-medium hover:text-blue-600 transition-colors">
                For Students
              </Link>
              <Link to="/login" className="text-sm font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-center">
                Log In
              </Link>
              <Link to="/signup" className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center">
                Sign Up
              </Link>
            </nav>
          </div>
        )}
      </header>
      <main className="page">
        <section className="hero">
            <div className="hero-content">
              <h1 className="text-3rem font-bold mb-4">
                Master Your MSCE Exams with PrepMaster
              </h1>
              <p className="text-1.125rem max-w-2xl mx-auto mb-8">
                Comprehensive online preparation platform for students and teachers. Excel in your MSCE exams with expert-led courses, live classes, and interactive assessments.
              </p>
              <div className="hero-buttons">
                <a href="#" className="hero-btn">
                  Get Started
                </a>
                <a href="#" className="hero-btn1">
                  Learn More
                </a>
              </div>
            </div>
        </section>

        <section className="feature-grid">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="section-title mb-12">
              Why Choose MSCE PrepMaster?
            </h2>
            <div className="feature-grid">
              {[
                { icon: BookOpen, title: "Comprehensive Coverage", description: "In-depth content for all MSCE subjects, aligned with the latest curriculum." },
                { icon: Clock, title: "Flexible Learning", description: "Study at your own pace with 24/7 access to lessons and practice materials." },
                { icon: Lightbulb, title: "Interactive Practice", description: "Engage with quizzes, mock exams, and problem-solving exercises for better retention." }
              ].map((feature, index) => (
                <div key={index} className="feature-card">
                  <feature.icon className="feature-icon" />
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dashboard">
          <div className="container">
            <h2 className="section-title mb-12">Your MSCE Prep Dashboard</h2>
            <div className="dashboard-grid">
              {[
                { icon: Users, title: "User Roles", value: "3 Types", description: "Student, Teacher, Admin" },
                { icon: BookOpen, title: "Subjects", value: "20+", description: "MSCE Subjects Covered" },
                { icon: Video, title: "Live Classes", value: "24/7", description: "Interactive Sessions" },
                { icon: FileText, title: "Assessments", value: "1000+", description: "Quizzes and Mock Exams" },
                { icon: CreditCard, title: "Payment System", value: "Secure", description: "Paychangu API Integration" },
                { icon: Award, title: "MSCE Registration", value: "Official", description: "Exam Registration Support" }
              ].map((feature, index) => (
                <div key={index} className="dashboard-card">
                  <div className="dashboard-card-header">
                    <h3 className="dashboard-card-title">{feature.title}</h3>
                    <feature.icon className="dashboard-card-icon" />
                  </div>
                  <div className="dashboard-card-value">{feature.value}</div>
                  <p className="dashboard-card-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tools">
          <div className="container mx-auto px-4 md:px-6">
            <div className="tools-content">
            <div className="tools-image">
  <img
    className="aspect-video rounded-xl"
    src="/assets/istockphoto-1347520142-1024x1024.webp"
    alt="MSCE PrepMaster Dashboard"
  />
</div>

              <div className="tools-text">
                <h2 className="tools-title">Powerful Tools for Success</h2>
                <p className="tools-description">
                  MSCE PrepMaster provides a comprehensive suite of tools designed to enhance your learning experience and boost your exam performance.
                </p>
                <ul className="tools-list">
                  {[
                    { icon: BarChart, text: "Advanced Analytics to Track Your Progress" },
                    { icon: Settings, text: "Customizable Study Plans" },
                    { icon: Users, text: "Collaborative Learning Forums" },
                    { icon: FileText, text: "Comprehensive Study Materials" }
                  ].map((item, index) => (
                    <li key={index} className="tools-list-item">
                      <item.icon className="tools-list-icon" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" className="hero-btn1">
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="community-section" className="community">
  <div className="community-container container mx-auto px-4 md:px-6">
    <h2 className="community-title text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
      Join Our Community
    </h2>
    <div className="community-grid">
      {[
        {
          title: "Connect with Peers",
          features: [
            "Engage in group discussions",
            "Share study resources",
            "Collaborate on projects"
          ]
        },
        {
          title: "Expert Guidance",
          features: [
            "Access to experienced tutors",
            "Receive personalized feedback",
            "Participate in Q&A sessions"
          ]
        },
        {
          title: "Stay Updated",
          features: [
            "Get notifications about new resources",
            "Participate in webinars",
            "Join events and activities"
          ]
        }
      ].map((communityItem, index) => (
        <div key={index} className="community-card">
          <h3 className="community-card-title">{communityItem.title}</h3>
          <ul className="community-card-list">
            {communityItem.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="community-card-list-item">
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="cta">
      <div className="cta-text space-y-2">
        <h2 className="cta-title">Ready to Excel in Your MSCE Exams?</h2>
        <p className="cta-description">
          Join MSCE PrepMaster today and take the first step towards achieving your academic goals. Start your journey to success now!
        </p>
      </div>
      <a href="#" className="hero-btn1">
        Get Started Now 
      </a>
</section>


      </main>
      <footer className="footer">
  <nav className="footer-nav">
  <div className="footer-links">
      <Link to="#">Terms of Service</Link>
      <Link to="#">Privacy Policy</Link>
      <Link to="#">Contact Us</Link>
    </div>
    <p className="footer-text">© 2024 NyaSATech. All rights reserved.</p>
  </nav>
</footer>

    </div>
  );
}
