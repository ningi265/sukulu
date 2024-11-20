import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Component from './screens/Homepage/homepage';
import LoginPage from './screens/LogIn/login';
import SignUpPage from './screens/SignUp/signup';
import StudentDashboard from './screens/StudentsDashboard/students';
import TeacherDashboard from './screens/TeachersDashboard/teachers';
import CreateCourse from './screens/Courses/courses';
import CreateAssignment from './screens/Assignment/create';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/students" element={<StudentDashboard />} />
          <Route path="/teachers" element={<TeacherDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/course" element={<CreateCourse />} />
          <Route path="/assignment" element={<CreateAssignment />} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;
