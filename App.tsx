
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FoodCard from './components/FoodCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { getDailyFoodSuggestions } from './services/geminiService';
import type { Food } from './types';

const App: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const foodList = await getDailyFoodSuggestions();
      // Sort suggestions by a predefined order
      const mealOrder: Food['type'][] = ['صبحانه', 'ناهار', 'شام', 'دسر', 'نوشیدنی'];
      const sortedFoodList = foodList.sort((a, b) => {
          return mealOrder.indexOf(a.type) - mealOrder.indexOf(b.type);
      });
      setSuggestions(sortedFoodList);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("یک خطای ناشناخته رخ داده است.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (suggestions.length === 0) {
      return (
        <div className="text-center my-10">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            امروز پیشنهادی یافت نشد. لطفاً دوباره تلاش کنید!
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-8">
        {suggestions.map((food, index) => (
          <FoodCard key={`${food.name}-${index}`} food={food} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <button
            onClick={fetchSuggestions}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? "کمی صبر کنید..." : "دریافت پیشنهاد جدید"}
          </button>
        </div>
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-gray-500 dark:text-gray-400 text-sm">
        <p>ساخته شده با ❤️ و زعفران</p>
      </footer>
    </div>
  );
};

export default App;
