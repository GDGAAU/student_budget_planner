"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");

  const challenges = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary mb-4" />,
      title: "Financial Literacy Gap",
      description:
        "Many students lack basic financial education and understanding of money management.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary mb-4" />,
      title: "Budgeting Struggles",
      description:
        "Difficulty in creating and sticking to a realistic budget while managing expenses.",
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-primary mb-4" />,
      title: "Unexpected Expenses",
      description:
        "Handling surprise costs and emergency situations without proper financial planning.",
    },
  ];

  const resources = [
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Budgeting Basics",
      description:
        "Learn the fundamentals of creating and maintaining a student budget.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=300",
    },
    {
      icon: <PiggyBank className="w-6 h-6" />,
      title: "Saving Strategies",
      description: "Discover effective ways to save money while studying.",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=300",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Credit Management",
      description:
        "Understanding student credit and managing debt responsibly.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=300",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription
    console.log("Email submitted:", email);
    setEmail("");
    alert("Thanks for subscribing!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master Your Student Budget with Confidence!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Take control of your finances with our comprehensive resources,
            expert tips, and practical tools.
          </p>
        </div>
      </header>

      {/* Key Challenges Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Financial Challenges
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-background shadow-lg text-center"
              >
                <div className="flex justify-center">{challenge.icon}</div>
                <h3 className="text-xl font-semibold mb-3">
                  {challenge.title}
                </h3>
                <p className="text-muted-foreground">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Essential Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg bg-card"
              >
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {resource.icon}
                    <h3 className="text-xl font-semibold ml-2">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips & Tutorials Section */}
      <section className="py-16 px-4 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Financial Tips & Tutorials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-card shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  Budgeting Basics
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Track your monthly income and expenses</li>
                  <li>• Set realistic financial goals</li>
                  <li>• Use budgeting apps and tools</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-card shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Saving Strategies
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Create an emergency fund</li>
                  <li>• Find student discounts and deals</li>
                  <li>• Reduce unnecessary expenses</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-card shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <School className="w-6 h-6 mr-2" />
                  Student Loan Management
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Understand different loan types</li>
                  <li>• Plan for repayment early</li>
                  <li>• Explore forgiveness programs</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-card shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <PiggyBank className="w-6 h-6 mr-2" />
                  Smart Investing
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Start with small investments</li>
                  <li>• Learn about compound interest</li>
                  <li>• Research investment options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl mb-8">
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
              className="h-12 px-4 rounded-md text-foreground w-full md:w-96"
              required
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-md bg-background text-foreground hover:bg-background/90 font-medium"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
