
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center p-6 bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg">
      <h1 className="text-4xl font-bold text-white tracking-wide">پیشنهاد غذای روز</h1>
      <p className="text-lg text-emerald-100 mt-2">هر روز یک ایده جدید برای آشپزی کشف کنید</p>
    </header>
  );
};

export default Header;
