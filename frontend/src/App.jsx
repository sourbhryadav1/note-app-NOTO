import React from 'react'
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import toast from "react-hot-toast";

const App = () => {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,hsl(var(--b2))_40%,transparent_100%)]' />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>

    </div>
  );
};

export default App;