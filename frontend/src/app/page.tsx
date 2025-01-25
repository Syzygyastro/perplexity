import React from 'react';
import Sidebar from '../components/Sidebar';
import MainInput from '../components/MainInput';
import SuggestionsGrid from '../components/SuggestionsGrid';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="w-4/5 p-10">
        <MainInput />
        <SuggestionsGrid />
        <Footer />
      </main>
    </div>
  );
}
