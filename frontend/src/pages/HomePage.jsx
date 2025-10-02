import React, { use, useEffect } from 'react'
import Navbar from "../components/Navbar.jsx";
import RateLimitedUi from '../components/RateLimitedUi.jsx';
import { useState } from 'react';
import api from '../lib/axios.js';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [israteLimited, setisRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        // const data = await res.json();    // if we use fetch instead of axios, if axios is used, we can use res.data

        console.log(res.data);
        setNotes(res.data);
        setisRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes: ", error);
        if (error.response.status === 429){
          setisRateLimited(true);
        }else{
          toast.error("Failed to load notes.")
        }
      } finally{
        setLoading(false);
      }
    };

    fetchNotes();
  } , []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {israteLimited && <RateLimitedUi />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

        {notes.length === 0 && !israteLimited && <NotesNotFound />} 

        {notes.length > 0 && !israteLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}

      </div>
    </div>
  )
};

export default HomePage;