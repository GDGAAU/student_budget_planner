"use client";

import { useState, useCallback, useEffect, use } from "react";
import classes from "./page.module.css";
import { getAllCategories } from "../script/category.controller";
import { createExpense } from "../script/expense.controller";
import ExampleChart from "../../../components/Graph";
import LineChartComponent from "../../../components/WeekGraph";
function CategoryPage() {
  const [selectedSection, setSelectedSection] = useState("Expenses");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryPlans, setCategoryPlans] = useState({});
  const [income, setIncome] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("");
  // const categories = [
  //   { name: "Food", img: "/icons/food_icon.png" },
  //   { name: "Clothes", img: "/icons/clothes_icon.png" },
  //   { name: "Transportation", img: "/icons/transport_icon.png" },
  //   { name: "Books", img: "/icons/books_icon.png" },
  // ];
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const c = await getAllCategories();
      setCategory(c);
    };
    fetchData();
  }, []);
  console.log("category", categories);

  // Handle category click
  const handleCategoryClick = useCallback(
    (category) => {
      setSelectedCategory(category);
      setCurrentPlan(categoryPlans[category] || "");
      setIsModalOpen(true);
    },
    [categoryPlans]
  );

  // Submit Plan
  // const handlePlanSubmit = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     setCategoryPlans((prev) => ({
  //       ...prev,
  //       [selectedCategory]: currentPlan,
  //     }));
  //     setIsModalOpen(false);
  //   },
  //   [selectedCategory, currentPlan]
  // );

  const handlePlanSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Saved Plan:", currentPlan); // Log the current input value
      setCategoryPlans((prev) => ({
        ...prev,
        [selectedCategory]: currentPlan,
      }));
      setIsModalOpen(false);
    },
    [selectedCategory, currentPlan]
  );

  // Submit Income
  const handleIncomeSubmit = useCallback(
    (e) => {
      e.preventDefault();
      alert(`Income added: $${income}`);
      setIncome("");
    },
    [income]
  );

  const addExpense = async () => {
    console.log(selectedCategory);
    console.log(currentPlan);
    await createExpense(1, selectedCategory, parseFloat(currentPlan));
  };
  const addBudget = async () => {
    console.log(income);
  };

  return (
    <div className=" p-4 sm:p-6">
      {/* Section Toggle Buttons */}
      <div className="flex justify-center">
        {["Expenses", "Income"].map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`px-6 py-2 rounded-lg transition-all duration-300 shadow-md ${
              selectedSection === section
                ? section === "Expenses"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Expenses Section */}
      {selectedSection === "Expenses" && (
        <div className="mx-auto bg-white p-6 rounded-lg ">
          <h2 className="text-xl font-semibold ">Expenses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(({ id, name, icon }) => (
              <CategoryCard
                key={id}
                name={name}
                img={`/icons/${icon}`}
                onClick={() => handleCategoryClick(id, name)}
                plan={categoryPlans[name]}
              />
            ))}
          </div>
        </div>
      )}

      {/* Income Section */}
      {selectedSection === "Income" && (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Income</h2>
          <form onSubmit={handleIncomeSubmit} className="space-y-4">
            <input
              type="number"
              placeholder="Enter income amount"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
            <button
              type="submit"
              onClick={() => addBudget()}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all shadow-md"
            >
              Add Income
            </button>
          </form>
        </div>
      )}

      {/* Modal for Category Plan */}
      {isModalOpen && selectedCategory && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold ">
            Plan for {selectedCategory}
          </h3>
          <form onSubmit={handlePlanSubmit} className="space-y-4">
            <input
              type="number"
              placeholder="Enter planned amount"
              value={currentPlan}
              onChange={(e) => setCurrentPlan(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-all shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(id) => addExpense()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all shadow-md"
              >
                Save Plan
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Reusable Card Component
function CategoryCard({ id, name, img, onClick, plan }) {
  return (
    <div
      key={id}
      onClick={onClick}
      className="cursor-pointer border rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-50 transition-all duration-300"
    >
      <img src={img} alt={name} className="w-20 h-20 mx-auto rounded-lg" />
      <h3 className="text-center font-semibold">{name}</h3>
      {plan && (
        <p className="text-sm text-center text-gray-600">Plan: ${plan}</p>
      )}
    </div>
  );
}

// Reusable Modal Component
function Modal({ children, onClose }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${classes.modal}`}
    >
      <div
        className={` rounded-2xl p-6 w-11/12 sm:w-96 shadow-2xl relative border-2 border-white`}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute flex justify-center items-center w-8 h-8 top-3 right-3 text-white bg-black bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full transition-all"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function CatGraph() {
  return (
    <div>
      <CategoryPage />
      <ExampleChart />
      <LineChartComponent />
    </div>
  );
}
