import React from 'react'
import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import toast from "react-hot-toast";

const App = () => {
  const isAuthed = Boolean(localStorage.getItem('token'));
  return (
    <div className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,hsl(var(--b2))_40%,transparent_100%)]' />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={isAuthed ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/create" element={isAuthed ? <CreatePage /> : <Navigate to="/login" replace />} />
        <Route path="/note/:id" element={isAuthed ? <NoteDetailPage /> : <Navigate to="/login" replace />} />
      </Routes>

    </div>
  );
};

export default App;