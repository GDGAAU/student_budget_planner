"use client";

import { useState } from "react";
import Image from "next/image";

import {
  FaUtensils,
  FaTshirt,
  FaBus,
  FaBook,
  FaFilm,
  FaShoppingBasket,
  FaFirstAid,
  FaPiggyBank,
} from "react-icons/fa";

import FoodIcon from "../../../public/icons/food_icon.png";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function CategoryPage() {
  const [selectedSection, setSelectedSection] = useState("Expenses");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryPlans, setCategoryPlans] = useState({});
  const [income, setIncome] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("");

  const categories = [
    {
      name: "Food",
      icon: (
        <Image
          src={FoodIcon}
          alt="Food Icon"
          className="bg-yellow-100 p-2 w-[50%] rounded-lg"
        />
      ),
    },
    { name: "Clothes", icon: <FaTshirt /> },
    { name: "Transportation", icon: <FaBus /> },
    { name: "Books", icon: <FaBook /> },
    { name: "Entertainment", icon: <FaFilm /> },
    { name: "Grocery", icon: <FaShoppingBasket /> },
    { name: "Emergency", icon: <FaFirstAid /> },
    { name: "Saving", icon: <FaPiggyBank /> },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPlan(categoryPlans[category] || "");
    setIsModalOpen(true);
  };

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    setCategoryPlans((prev) => ({
      ...prev,
      [selectedCategory]: currentPlan,
    }));
    setIsModalOpen(false);
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    alert(`Income added: $${income}`);
    setIncome("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-red-50 p-4 sm:p-6">
      {/* Section Toggle Buttons */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={() => setSelectedSection("Expenses")}
          variant={selectedSection === "Expenses" ? "contained" : "outlined"}
          color={selectedSection === "Expenses" ? "error" : "inherit"}
          className="rounded-l-lg"
        >
          Expenses
        </Button>
        <Button
          onClick={() => setSelectedSection("Income")}
          variant={selectedSection === "Income" ? "contained" : "outlined"}
          color={selectedSection === "Income" ? "success" : "inherit"}
          className="rounded-r-lg"
        >
          Income
        </Button>
      </div>

      {/* Left Section - Expenses */}
      {selectedSection === "Expenses" && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <Typography variant="h5" gutterBottom>
            Expenses
          </Typography>
          <Grid container spacing={3}>
            {categories.map(({ name, icon }) => (
              <Grid item xs={12} sm={6} md={4} key={name}>
                <Card
                  onClick={() => handleCategoryClick(name)}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardHeader
                    avatar={<div className="text-red-500">{icon}</div>}
                    title={name}
                    titleTypographyProps={{ variant: "h6" }}
                  />
                  <CardContent>
                    {categoryPlans[name] && (
                      <Typography variant="body2" color="textSecondary">
                        Plan: ${categoryPlans[name]}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {/* Right Section - Income */}
      {selectedSection === "Income" && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <Typography variant="h5" gutterBottom>
            Income
          </Typography>
          <form onSubmit={handleIncomeSubmit} className="space-y-4">
            <TextField
              label="Income Amount"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="success" fullWidth>
              Add Income
            </Button>
          </form>
        </div>
      )}

      {/* Modal for Category Plan */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>
          <div className="flex items-center space-x-2">
            {categories.find((cat) => cat.name === selectedCategory)?.icon}
            <Typography variant="h6">Plan for {selectedCategory}</Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handlePlanSubmit} className="space-y-4">
            <TextField
              label="Planned Amount"
              type="number"
              value={currentPlan}
              onChange={(e) => setCurrentPlan(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Enter planned amount"
            />
            <DialogActions>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Plan
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
