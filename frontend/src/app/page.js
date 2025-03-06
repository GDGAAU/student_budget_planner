import Image from 'next/image';
import HomeSavingCard from '../../components/HomeSavingCard';
import SquareCategoryCard from '../../components/SquareCategoryCard';
import Header from '../../components/Header';
import CategoryBudget from '../../components/CategoryBudget';

export default function Home() {
  return (
    <>
      <HomeSavingCard />
      <Header title="Top Spending" />
      <SquareCategoryCard title="Food" />
      <CategoryBudget />
    </>
  );
}
