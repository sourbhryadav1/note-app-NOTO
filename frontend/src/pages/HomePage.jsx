import React, { use, useEffect } from 'react'
import Navbar from "../components/Navbar.jsx";
import RateLimitedUi from '../components/RateLimitedUi.jsx';
import { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [israteLimited, setisRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.post("http://localhost:5001/api/notes")
        // const data = await res.json();    // if we use fetch instead of axios, if axios is used, we can use res.data
        console.log(res.data)
      } catch (error) {
        console.log("Error fetching notes: ", error);
      }
    }
  });

  return (
    <div className='min-h-screen'>
      <Navbar />

      {israteLimited && <RateLimitedUi />}
    </div>
  )
};

export default HomePage;