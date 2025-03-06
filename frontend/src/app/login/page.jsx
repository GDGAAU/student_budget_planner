'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const router = useRouter();

  const validateForm = () => {
    let newError = {};
    if (!email || !email.trim()) newError.email = 'Email is required';
    if (!password || !password.trim())
      newError.password = 'Password is required';

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    const login = async () => {
      try {
        const response = await fetch(
          'https://student-budget-planner.onrender.com/api/v1/user/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          },
        );
        const data = await response.json();
        if (!response.ok) {
          setError({ login: 'Invalid Credintials. Try again!' });
          return;
        }

        router.push('/');
      } catch (error) {}
    };
    login();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-2xl font-bold ">Hello, Welcome back!</h1>
        <p className=" text-sm mt-2">
          Please sign in to the app for tracking your daily bills
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-4 top-4 "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className=" text-sm underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-300 cursor-pointer"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className=" text-sm mt-4">
            Don’t have an account?{' '}
            <a href="/signup" className="underline font-semibold">
              Signup
            </a>
          </p>
        </form>
        {error.login && (
          <span className="block text-center text-sm text-red-500 mt-4">
            {error.login}
          </span>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
