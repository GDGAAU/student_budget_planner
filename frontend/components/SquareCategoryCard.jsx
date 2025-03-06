import Image from 'next/image';
import FoodIcon from '../public/icons/food_icon.png';

const SquareCategoryCard = ({ title }) => {
  return (
    <div className="p-0 flex justify-center items-center gap-2 flex-col w-32 h-32 shadow-md">
      <Image
        className="bg-yellow-100 p-2 w-[50%] rounded-lg"
        src={FoodIcon}
        alt={title}
      />
      <p>{title}</p>
    </div>
  );
};

export default SquareCategoryCard;
