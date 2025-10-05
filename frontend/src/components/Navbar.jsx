import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'min');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (document.body) document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'min' ? 'min-dark' : 'min'));
  }

  return (
    <header className='bg-base-300/70 backdrop-blur supports-[backdrop-filter]:bg-base-300/50 border-b border-base-content/10 sticky top-0 z-20'>
            <div className='mx-auto max-w-6xl p-3 md:p-4'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-2xl md:text-3xl font-bold text-primary font-mono tracking-tight'>Noto</h1>
                  <div className='flex items-center gap-2 md:gap-4'>
                    <button className='btn btn-ghost btn-sm md:btn-md' onClick={toggleTheme}>
                      {theme === 'min-dark' ? 'Light' : 'Dark'} mode
                    </button>
                    <Link to={"/create"} className='btn btn-primary'>
                      <PlusIcon className='size-5'/>
                      <span>New Note</span>
                    </Link>
                  </div>
                </div>
            </div>
    </header>

  )
}

export default Navbar