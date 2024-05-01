import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NavbarComp from './components/Navbar';
import Container from "react-bootstrap/Container";
import HomeScreen from './screens/HomeScreen';
import './App.css'
import './index.css'
import Footer from './components/Footer';
import CounsellingScreen from './screens/CounsellingScreen';
import BlogScreen from './screens/BlogScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import ServiceScreen from './screens/ServiceScreen';
import AdmissionScreen from './screens/AdmissionScreen';
import CollegeScreen from './screens/CollegeScreen';
import ComingSoon from './screens/ComingSoon';
import CollegeNotFound from './screens/CollegeNotFound';
import SearchScreen from './screens/SearchScreen';
import CollegeScreenSearch from './screens/CollegeScreenSearch';




const App = () => {
  return (
    <BrowserRouter>
      <>
      <div className="d-flex flex-column site-container">
        <NavbarComp/>
        <main>
          <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/blog' element={<ComingSoon/>}/>
            <Route path='/about' element={<ComingSoon/>}/>
            <Route path='/contact' element={<ComingSoon/>}/>
            <Route path='/service' element={<ComingSoon/>}/>
            <Route path='/admission' element={<AdmissionScreen/>}/>
            <Route path='/counselling' element={<CounsellingScreen/>}/>
            <Route path='college/:slug' element={<CollegeScreen/>}/>
            <Route path='comingsoon' element={<ComingSoon/>}/>
            <Route path='founder' element={<ComingSoon/>}/>
            <Route path='testimonials' element={<ComingSoon/>}/>
            <Route path='history' element={<ComingSoon/>}/>
            <Route path='futureplans' element={<ComingSoon/>}/>
            <Route path='services' element={<ComingSoon/>}/>
            <Route path="/search" element={<SearchScreen />} />
          </Routes>
        </main>
       
        <Footer/>
        </div>
      </>
    </BrowserRouter>
  )
}

export default App