"use client";
import HomeSavingCard from "../../../components/HomeSavingCard";
import SquareCategoryCard from "../../../components/SquareCategoryCard";
import Header from "../../../components/Header";
import CategoryBudget from "../../../components/CategoryBudget";
import ExampleChart from "../../../components/Graph";
import Example from "../../../components/WeekGraph";
import NameImagePage from "../../../components/CategoryCard";
import AddNewBudget from "../../../components/AddNewBudget";
import BudgetPage from "../../../components/BudgetCard";
import Expense from "../../../components/AddExpense";

const Home = () => {
  return (
    <div>
      {" "}
      {/* <NameImagePage /> */}
      <div className="flex  items-center ">
        <img
          className=""
          src="https://img.icons8.com/?size=100&id=kZYJCScZSxUH&format=png&color=000000"
        />
        <p className="text-[3vw]  font-semibold">Budget Planner</p>
      </div>
      <div className="flex justify-between">
        <HomeSavingCard />
        <AddNewBudget />
        <Expense />
      </div>
      <BudgetPage />
      <ExampleChart />
      {/* <Header title="Top Spending" /> */}
      {/* <SquareCategoryCard title="Food" /> */}
      {/* <CategoryBudget /> */}
    </div>
  );
};

export default Home;
