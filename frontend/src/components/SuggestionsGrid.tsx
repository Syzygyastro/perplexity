import React from 'react';

const suggestions: string[] = [
  'What is a ROTH IRA?',
  'Health benefits of dark chocolate',
  "Latest women's fashion trends summer 2025",
  'Latest findings on global fertility rates',
];

const SuggestionsGrid: React.FC = () => {
  return (
    <section className="grid grid-cols-2 gap-4 mt-10 w-full">
      {suggestions.map((text, index) => (
        <div
          key={index}
          className="p-4 rounded shadow-md cursor-pointer bg-gray-800 text-white hover:bg-gray-200 hover:text-black transition"
        >
          {text}
        </div>
      ))}
    </section>
  );
};

export default SuggestionsGrid;
