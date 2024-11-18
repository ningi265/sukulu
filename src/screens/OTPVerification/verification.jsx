import { useState, useRef, useEffect } from 'react';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import useToast from "../../components/ui/useToast";
import axios from 'axios';

export default function OTPVerification({ userId }) {  // Assuming `userId` is passed as a prop
  const [otp, setOTP] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const { toast, ToastContainer } = useToast();

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      if (value !== '' && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      toast({
        title: "Error",
        description: "Please enter a 4-digit OTP",
        variant: "error",
      });
      return;
    }

    try {
      // Send OTP verification request to the backend
      const result = await axios.post('http://localhost:4000/api/users/verify', { userId, otp: otpString });
      if (result.data.success) {
        toast({
          title: "Success",
          description: "OTP verified successfully!",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: result.data.message,
          variant: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">OTP Verification</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter the 4-digit code sent to your email
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
                className="w-14 h-14 text-center text-2xl"
              />
            ))}
          </div>
          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
