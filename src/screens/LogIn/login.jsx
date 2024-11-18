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
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false); // Track if there’s an error

  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setIsError(false);

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', { email, password });
      const { token, user } = response.data;

      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      // Store user role to handle redirection
      localStorage.setItem('userRole', user.role);

      // Navigate to the appropriate dashboard based on the user role
      if (user.role === 'teacher') {
        navigate('/teachers');
      } else {
        navigate('/students');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      setError(errorMessage);
      setIsError(true); // Trigger error styling
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    // Handle Google Sign-up here
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
              <span className="separator-text">Or sign in with email</span>
            </div>

            {/* Login Form */}
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

              {/* Remember Me and Forgot Password Links */}
              <div className="flex items-center justify-between mt-4">
                <div className="remember-me-container flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="remember-me-checkbox"
                  />
                  <Label htmlFor="remember-me" className="label ml-2">
                    Remember me
                  </Label>
                </div>

                <Link to="/forgot-password" className="label text-blue-600 hover:text-blue-800 transition duration-200">
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="button mt-6 w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Sign in'}
              </Button>
            </form>

            {/* Sign-Up Prompt */}
            <p className="signin-prompt text-center mt-4">
              Don’t have an account?{' '}
              <Link to="/signup" className="signin-link text-blue-600 hover:text-blue-800 transition duration-200">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
