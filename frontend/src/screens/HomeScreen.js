import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeTop from '../components/HomeTop';
import FeaturedCollege from '../components/FeaturedCollege';
import RecentlyVisitedCollege from '../components/RecentlyVisitedCollege';
import SearchBoxMobile from '../components/SearchBoxMobile';
import Testimonials from '../components/Testimonials';


const HomeScreen = () => {
  const [colleges, setColleges] = useState([]);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(`/api/colleges`);
        setColleges(response.data);
      } catch (error) {
        console.error('Error fetching colleges:', error.message);
        seterror(error.message)
      }
    };

    fetchColleges();
  }, []);

  return (
    <>
      <HomeTop />
      <FeaturedCollege colleges={colleges} error={error} />
      <RecentlyVisitedCollege colleges={colleges} error={error} />
      <Testimonials />
    </>
  );
};

export default HomeScreen;
