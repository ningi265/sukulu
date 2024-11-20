import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Label } from "../../components/ui/label";
import { BookOpen, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setIsError(false);

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', { email, password });
      const { token, user } = response.data;

      // Store token in sessionStorage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userRole', user.role);

      // Navigate to the appropriate dashboard based on the user role
      if (user.role === 'teacher') {
        navigate('/teachers');
      } else {
        navigate('/students');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      setError(errorMessage);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    // Handle Google Sign-up logic
  };

  return (
    <div className="login-page">
      <div className="containerl">
        <div className="cardl">
          <div className="headerl">
            <Link to="/" className="titlel">
              <BookOpen className="h-10 w-10 mr-2" />
              <span className="text-3xl font-bold">MSCE PrepMaster</span>
            </Link>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back</h2>
            <p className="label">Sign in to continue your MSCE preparation journey</p>
          </div>

          <div className="login-buttons">
            <Button
              variant="outline"
              className="google-button"
              onClick={handleGoogleSignUp}
            >
              {/* Google Icon and Text */}
              <svg className="google-icon" viewBox="0 0 24 24">
                {/* Google SVG paths */}
              </svg>
              Sign up with Google
            </Button>

            <div className="divider">
              <Separator className="separator" />
              <span className="separator-text">Or sign in with email</span>
            </div>

            <form className="form" onSubmit={handleEmailLogin}>
              <div>
                <Label htmlFor="email" className="label">Email address</Label>
                <div className="input-group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`input ${isError ? 'error-border' : ''}`}
                    placeholder="Enter your email"
                  />
                  <Mail className="input-icon" />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="password" className="label">Password</Label>
                <div className="input-group">
                  <Lock className="input-icon" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`input ${isError ? 'error-border' : ''}`}
                    placeholder="Enter your password"
                  />
                </div>
                {isError && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              <Button type="submit" className="button mt-6 w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Sign in'}
              </Button>
            </form>

            <p className="signin-prompt text-center mt-4">
              Don’t have an account?{' '}
              <Link to="/signup" className="signin-link text-blue-600 hover:text-blue-800">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
