import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Component from './screens/Homepage/homepage';
import LoginPage from './screens/LogIn/login';
import SignUpPage from './screens/signup';
import TeacherDashboard from './screens/teachers';
import StudentDashboard from './screens/StudentsDashboard/students';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/teachers" element={<TeacherDashboard />} />
          <Route path="/students" element={<StudentDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;
