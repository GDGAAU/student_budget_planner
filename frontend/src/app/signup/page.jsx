"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    const signUp = async () => {
      const response = await fetch(
        "https://student-budget-planner.onrender.com/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        // Handle successful response
        console.log("User registered successfully");
      } else {
        // Handle error response
        console.error("Failed to register user");
      }
    };

    signUp();
  };

  return (
    <div className="flex items-center justify-center h-screen w-[1500px] mx-auto">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-2xl font-bold ">Create Your Account</h1>
        <p className=" text-sm mt-2">
          Sign up to start tracking your daily bills
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-300 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              type={showPassword ? "text" : "password"}
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

          {/* Sign Up Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-300"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className=" text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="underline font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
