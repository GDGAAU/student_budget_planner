import Image from "next/image";
import HomeSavingCard from "../../components/HomeSavingCard";
import SquareCategoryCard from "../../components/SquareCategoryCard";
import Header from "../../components/Header";
import CategoryBudget from "../../components/CategoryBudget";
import ExampleChart from "../../components/Graph";
import Example from "../../components/WeekGraph";
import NameImagePage from "../../components/CategoryCard";

export default function Home() {
  return (
    <>
      <NameImagePage />
      <HomeSavingCard />
      <ExampleChart />
      <Example />
      <HomeSavingCard budget="100" />
      <Header title="Top Spending" />
      <SquareCategoryCard title="Food" />
      <CategoryBudget />
    </>
  );
}
