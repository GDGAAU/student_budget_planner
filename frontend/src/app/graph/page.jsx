"use client";

import { useState } from "react";
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
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

export default function CategoryPage() {
  const [selectedSection, setSelectedSection] = useState("Expenses");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryPlans, setCategoryPlans] = useState({});
  const [income, setIncome] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("");

  const categories = [
    { name: "Food", icon: <FaUtensils className="w-6 h-6" /> },
    { name: "Clothes", icon: <FaTshirt className="w-6 h-6" /> },
    { name: "Transportation", icon: <FaBus className="w-6 h-6" /> },
    { name: "Books", icon: <FaBook className="w-6 h-6" /> },
    { name: "Entertainment", icon: <FaFilm className="w-6 h-6" /> },
    { name: "Grocery", icon: <FaShoppingBasket className="w-6 h-6" /> },
    { name: "Emergency", icon: <FaFirstAid className="w-6 h-6" /> },
    { name: "Saving", icon: <FaPiggyBank className="w-6 h-6" /> },
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
          className="px-6 py-2 rounded-l-lg transition-all"
        >
          Expenses
        </Button>
        <Button
          onClick={() => setSelectedSection("Income")}
          variant={selectedSection === "Income" ? "contained" : "outlined"}
          className="px-6 py-2 rounded-r-lg transition-all"
        >
          Income
        </Button>
      </div>

      {/* Left Section - Expenses */}
      {selectedSection === "Expenses" && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <Typography variant="h5" className="mb-6">
            Expenses
          </Typography>
          <Grid container spacing={4}>
            {categories.map(({ name, icon }) => (
              <Grid item xs={12} sm={6} md={4} key={name}>
                <Card
                  onClick={() => handleCategoryClick(name)}
                  className="cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center space-x-3">
                        <div className="text-red-500">{icon}</div>
                        <Typography variant="h6">{name}</Typography>
                      </div>
                    </CardTitle>
                  </CardHeader>
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
          <Typography variant="h5" className="mb-6">
            Income
          </Typography>
          <form onSubmit={handleIncomeSubmit} className="space-y-6">
            <TextField
              label="Income Amount"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Income
            </Button>
          </form>
        </div>
      )}

      {/* Modal for Category Plan */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center space-x-3">
                {categories.find((cat) => cat.name === selectedCategory)?.icon}
                <Typography variant="h6">
                  {selectedCategory} Planning
                </Typography>
              </div>
            </DialogTitle>
            <DialogDescription>
              Enter the planned amount for {selectedCategory}
            </DialogDescription>
          </DialogHeader>
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
            <DialogFooter>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
