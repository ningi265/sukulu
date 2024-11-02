import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Component from './screens/homepage';
import LoginPage from './screens/login';
import SignUpPage from './screens/signup';
import TeacherDashboard from './screens/teachers';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/teachers" element={<TeacherDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;
