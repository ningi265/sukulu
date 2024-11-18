import '../LogIn/LogInPage.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { BookOpen, Mail, Lock, User, ArrowRight, Calendar } from "lucide-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',  // Added dateOfBirth state
    role: '',  // Added role state
    terms: false,
  });

  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', formData);
      if (response.data.success) {
        setUserId(response.data.data.userId);  // Assuming userId is in data.userId
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed. Please try again.');
    }
  };
  
  const handleOTPVerification = async () => {
    if (!userId) {
      console.error('User ID is missing!');
      alert('Please complete registration first.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/users/verify', { userId, otp });
      if (response.data.success) {
        alert('Account verified successfully!');
        navigate('/login');
        
      }
    } catch (error) {
      console.error('OTP verification failed', error);
      alert('OTP verification failed. Please try again.');
    }
  };

  const handleGoogleSignUp = async () => {
    
  };
  

  return (
    <div className="containerl">
      <div className="cardl">
        <div className="headerl">
          <Link to="/" className="titlel">
            <BookOpen className="logo-icon" />
            <span className="titlel">MSCE PrepMaster</span>
          </Link>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create your account</h2>
          <p className="label">Join MSCE PrepMaster and start your journey to success</p>
        </div>

        <div className="login-buttons">
        <Button
            variant="outline"
            className="google-button"
            onClick={handleGoogleSignUp}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Sign up with Google
          </Button>

          <div className="divider">
            <Separator className="separator" />
            <span className="separator-text">Or sign up with email</span>
          </div>

          {!isOtpSent ? (
            <form className="form" onSubmit={handleEmailSignUp}>
              <div className="input-group">
                <Label htmlFor="name" className="label">Full Name</Label>
                <div className='input-group'>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                />
                <User className='input-icon'/>
                </div>
                
              </div>
              <div className="input-group">
                <Label htmlFor="email" className="label">Email address</Label>
                <div className='input-group'>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                <Mail className='input-icon'/>
                </div>
              </div>
              <div className="input-group">
                <Label htmlFor="password" className="label">Password</Label>
                <div className="input-group">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input"
                  placeholder="Create a password"
                  onChange={handleChange}
                />
                <Lock className='input-icon'/>
                </div>
               
              </div>
              
              {/* Added Date of Birth input */}
              <div className="input-group">
                <Label htmlFor="dateOfBirth" className="label">Date of Birth</Label>
                <div className="input-group">
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  className="input"
                  onChange={handleChange}
                />
                <Calendar className='input-icon'/>
                </div>
                
              </div>
              
              {/* Added Role input */}
              <div className="input-group">
                <Label htmlFor="role" className="label">Role</Label>
                <div className='input-group'>
                <select
                  id="role"
                  name="role"
                  className="input"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="teacher">teacher</option>
                  <option value="student">student</option>
                </select>
                 <User className='input-icon'/>
                </div>
               
              </div>

              <div className="terms-checkbox">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="checkbox-input"
                  onChange={handleChange}
                />
                <Label htmlFor="terms" className="label">
                  I agree to the {' '} <Link to="/terms" className="terms-link">Terms of Service</Link> {' '} and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </Label>
              </div>
              <Button type="submit" className="button">
                Create Account
                <ArrowRight className="arrow-icon" />
              </Button>
            </form>
          ) : (
            <div className="otp-verification">
              <Label htmlFor="otp" className="label">Enter OTP</Label>
              <div className="input-group">
              <Input
                id="otp"
                name="otp"
                type="text"
                required
                className="input"
                placeholder="Enter OTP sent to your email"
                onChange={(e) => setOtp(e.target.value)}
              />
               <Lock className='input-icon'/>
              </div>
           
              <Button onClick={handleOTPVerification} className="button">
                Verify OTP
              </Button>
            </div>
          )}

          <p className="signin-prompt">
            Already have an account?{' '}
            <Link to="/login" className="signin-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
