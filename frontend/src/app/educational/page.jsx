"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  DollarSign,
  PiggyBank,
  Target,
  TrendingUp,
  School,
  CreditCard,
  Calculator,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState({});
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        setIsVisible((prev) => ({ ...prev, [section.id]: isVisible }));
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAiPromptSubmit = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      // Simulate sending the prompt to an AI API
      const response = await fetch(
        "https://student-budget-planner.onrender.com/api/v1/user/ask-gemini",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: aiPrompt }),
        }
      );

      const data = await response.json();
      console.log(typeof data);
      console.log(data);
      //   setAiResponse(data || "No response from AI"); // Set the AI response
      //   console.log("Update aiResponse:", aiResponse);
      if (data && typeof data === "string") {
        setAiResponse(data);
      } else {
        setAiResponse("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error sending prompt to AI:", error);
      setAiResponse("Failed to get a response from the AI.");
    }
  };

  const challenges = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600 mb-4" />,
      title: "Financial Literacy Gap",
      description:
        "Many students lack basic financial education and understanding of money management.",
      color: "bg-blue-100",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600 mb-4" />,
      title: "Budgeting Struggles",
      description:
        "Difficulty in creating and sticking to a realistic budget while managing expenses.",
      color: "bg-green-100",
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-red-600 mb-4" />,
      title: "Unexpected Expenses",
      description:
        "Handling surprise costs and emergency situations without proper financial planning.",
      color: "bg-red-100",
    },
  ];

  const resources = [
    {
      icon: <Calculator className="w-6 h-6 text-purple-600" />,
      title: "Budgeting Basics",
      description:
        "Learn the fundamentals of creating and maintaining a student budget.",
      image: "/images/planning.jpg",
      color: "bg-purple-100",
    },
    {
      icon: <PiggyBank className="w-6 h-6 text-yellow-600" />,
      title: "Saving Strategies",
      description: "Discover effective ways to save money while studying.",
      image: "/images/happy-student.jpg",
      color: "bg-yellow-100",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-pink-600" />,
      title: "Credit Management",
      description:
        "Understanding student credit and managing debt responsibly.",
      image: "/images/graduating.jpg",
      color: "bg-pink-100",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
    alert("Thanks for subscribing!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r  from-pink-950 via-bg-pink-300 to-purple-700 text-white min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[url('/images/writing.jpg')] opacity-10 bg-cover bg-center" />
        <div className="max-w-6xl mx-auto text-center px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
            Master Your Student Budget
            <span className="block text-3xl md:text-4xl mt-4 font-normal">
              with Confidence!
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Take control of your finances with our comprehensive resources,
            expert tips, and practical tools.
          </p>
          <a
            href="#resources"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Explore Resources
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Key Challenges Section */}
      <section
        id="challenges"
        className={`py-24 px-4 bg-white transition-all duration-1000 ${
          isVisible.challenges
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Common Financial Challenges
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl ${challenge.color} shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <div className="flex justify-center w-16 h-16 rounded-full items-center mx-auto mb-6">
                  {challenge.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section
        id="resources"
        className={`py-24 px-4 bg-gray-50 transition-all duration-1000 ${
          isVisible.resources
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Essential Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className={`group rounded-2xl overflow-hidden shadow-lg ${resource.color} transform transition-all duration-300 hover:scale-105`}
              >
                <div className="relative">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-white p-3 rounded-full">
                      {resource.icon}
                    </div>
                    <h3 className="text-2xl font-semibold ml-4">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {resource.description}
                  </p>
                  <button
                    onClick={() =>
                      window.open(
                        "https://youtu.be/AhP_-BsI31Q?si=08U9wDODv2ztuAGq",
                        "_blank"
                      )
                    }
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-12 px-6 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Tutorials Section */}
      <section
        id="tips"
        className={`py-24 px-4 bg-white transition-all duration-1000 ${
          isVisible.tips
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Financial Tips & Tutorials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-blue-100 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <div className="bg-blue-200 p-3 rounded-full mr-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  Budgeting Basics
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    Track your monthly income and expenses
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    Set realistic financial goals
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    Use budgeting apps and tools
                  </li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl bg-green-100 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <div className="bg-green-200 p-3 rounded-full mr-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  Saving Strategies
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                    Create an emergency fund
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                    Find student discounts and deals
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                    Reduce unnecessary expenses
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-purple-100 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <div className="bg-purple-200 p-3 rounded-full mr-4">
                    <School className="w-6 h-6 text-purple-600" />
                  </div>
                  Student Loan Management
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                    Understand different loan types
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                    Plan for repayment early
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                    Explore forgiveness programs
                  </li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl bg-yellow-100 shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <div className="bg-yellow-200 p-3 rounded-full mr-4">
                    <PiggyBank className="w-6 h-6 text-yellow-600" />
                  </div>
                  Smart Investing
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3" />
                    Start with small investments
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3" />
                    Learn about compound interest
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3" />
                    Research investment options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Prompt Section */}
      <section
        id="ai-prompt"
        className={`py-24 px-4 bg-gradient-to-br from-gray-200 via-purple-600 to-gray-300 text-black transition-all duration-1000 rounded-2xl ${
          isVisible["ai-prompt"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ask the AI for Help</h2>
          <p className="text-xl mb-12 opacity-90">
            Enter your financial question or prompt below, and our AI will
            assist you.
          </p>
          <form
            onSubmit={handleAiPromptSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Enter your financial question..."
              className="h-14 px-8 rounded-full text-black text-2xl w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <button
              type="submit"
              className="h-14 px-8 rounded-full bg-white text-black text-2xl hover:bg-opacity-90 font-bold transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Send
            </button>
          </form>
          {aiResponse && (
            <div className="mt-8 p-6 bg-white/10 rounded-lg text-left">
              <h3 className="text-2xl font-semibold mb-4">AI Response:</h3>
              <p className="text-black">{aiResponse}</p>
            </div>
          )}
        </div>
      </section>

      {/* Call-to-Action Section */}
      {/* <section
        id="cta"
        className={`py-24 px-4 bg-gradient-to-br from-blue-700 to-purple-700 text-white relative overflow-hidden transition-all duration-1000 ${
          isVisible.cta
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-950 via-bg-pink-300 to-purple-700 opacity-60 bg-cover bg-center" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Subscribe to receive expert financial tips and updates!
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-14 px-6 rounded-full text-gray-800 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <button
              type="submit"
              className="h-14 px-8 rounded-full bg-white text-blue-700 hover:bg-opacity-90 font-semibold transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section> */}
    </div>
  );
}
