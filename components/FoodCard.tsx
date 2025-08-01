
import React from 'react';
import type { Food } from '../types';

interface FoodCardProps {
  food: Food;
}

const mealTypeColors: Record<Food['type'], string> = {
    'صبحانه': 'bg-blue-100 text-blue-800',
    'ناهار': 'bg-orange-100 text-orange-800',
    'شام': 'bg-indigo-100 text-indigo-800',
    'دسر': 'bg-pink-100 text-pink-800',
    'نوشیدنی': 'bg-green-100 text-green-800'
};

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(food.name)}/400/200`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={`تصویر ${food.name}`} />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{food.name}</h3>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${mealTypeColors[food.type]}`}>
                {food.type}
            </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 flex-grow">{food.description}</p>
      </div>
    </div>
  );
};

export default FoodCard;
