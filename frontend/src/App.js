import React, { useEffect } from 'react'
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
import SigninScreen from './screens/SigninScreen';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import Article from './components/blogSection/BlogArticle';
import AdminRoute from './components/AdminRoute';
import DashboardScreen from './screens/DashboardScreen';
import CollegeUpload from './screens/CollegeUpload';
import CollegeUploadTest from './screens/CollegeUploadTest';
import BlogUpload from './screens/BlogUpload';
import Contact from './screens/Contact';
import ArticleComments from './screens/ArticleComments';
import CollegeListScreen from './screens/CollegeListScreen';
import CollegeEdit from './screens/CollegeEdit';
import BlogListScreen from './screens/BlogListScreen';
import BlogEdit from './screens/BlogEdit';
import ProtectedRoute from './components/ProtectedRoute';
import ReviewUpload from './screens/ReviewUpload';
import ReviewListScreen from './screens/ReviewListScreen';
import UserListScreen from './screens/UserListScreen';
import ArticleListScreen from './screens/ArticleListScreen';
import PdfUpload from './components/test/PdfUpload';
import CounsellorRoute from './components/CounsellorRoute';
import CounsellorsPage from './screens/CounsellorsPage';
import BookingDetailsScreen from './screens/BookingDetailsScreen';
import AppointmentsHistoryScreen from './screens/AppointmentsHistoryScreen';
import AppointmentsListScreen from './screens/AppointmentsListScreen';
import AppointmentsListScreenCounsellor from './screens/AppointmentsListScreenCounsellor';
import { Card } from 'react-bootstrap';






const App = () => {
  
  
  return (
    <BrowserRouter>
      <>
      <div className="d-flex flex-column site-container min-vh-100">
      <ToastContainer position="top-center" limit={1} />
        <NavbarComp/>
        <main >
          <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/blog' element={<BlogScreen/>}/>
            <Route path='/article/:slug' element={<Article/>}/>
            <Route path='/signin' element={<SigninScreen/>}/>
            <Route path="/signup" element={<SignupScreen />} />
            <Route path='/about' element={<AboutScreen/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/services' element={<ServiceScreen/>}/>
            <Route path='/admission' element={<AdmissionScreen/>}/>
            <Route path='/counselling/free' element={<CounsellingScreen/>}/>
            <Route path='/counselling/paid' element={<CounsellorsPage/>}/>
            <Route path='college/:slug' element={<CollegeScreen/>}/>
            <Route path='comingsoon' element={<ComingSoon/>}/>
            <Route path='founder' element={<ComingSoon/>}/>
            <Route path='testimonials' element={<ComingSoon/>}/>
            <Route path='history' element={<ComingSoon/>}/>
            <Route path='futureplans' element={<ComingSoon/>}/>
            <Route path='services' element={<ComingSoon/>}/>
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/bookings/:id" element={<BookingDetailsScreen />} />
            <Route path="/test" element={<ComingSoon/>} />

            {/* protected routes starts here */}
            <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    {" "}
                    <ProfileScreen />{" "}
                  </ProtectedRoute>
                }
              />
            <Route
                path="/appointments"
                element={
                  <ProtectedRoute>
                    {" "}
                    <AppointmentsHistoryScreen />{" "}
                  </ProtectedRoute>
                }
              />
            <Route
                path="/college/:slug/write-review"
                element={
                  <ProtectedRoute>
                    {" "}
                    <ReviewUpload />{" "}
                  </ProtectedRoute>
                }
              />
            {/* protected routes ends here */}


            <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    {" "}
                    <DashboardScreen />{" "}
                  </AdminRoute>
                }
              />
            <Route
                path="/counsellor/dashboard"
                element={
                  <CounsellorRoute>
                    {" "}
                    <DashboardScreen />{" "}
                  </CounsellorRoute>
                }
              />
              <Route
                path="/admin/college-edit/:id"
                element={
                  <AdminRoute>
                    {" "}
                    <CollegeEdit />{" "}
                  </AdminRoute>
                }
              />
              <Route
                path="/Counsellor/college-edit/:id"
                element={
                    <CounsellorRoute>
                    {" "}
                    <CollegeEdit />{" "}
                    </CounsellorRoute>
                }
              />
            <Route
                path="/admin/college-upload"
                element={
                  <AdminRoute>
                    {" "}
                    <CollegeUpload />{" "}
                  </AdminRoute>
                }
              />
            <Route
                path="/counsellor/college-upload"
                element={
                  <CounsellorRoute>
                    {" "}
                    <CollegeUpload />{" "}
                  </CounsellorRoute>
                }
              />
            <Route
                path="/admin/article-upload"
                element={
                  <AdminRoute>
                    {" "}
                    <BlogUpload />{" "}
                  </AdminRoute>
                }
              />
            <Route
                path="/admin/collegelist"
                element={
                  <AdminRoute>
                    {" "}
                    <CollegeListScreen />{" "}
                  </AdminRoute>
                }
              />
            <Route
                path="/counsellor/collegelist"
                element={
                  <CounsellorRoute>
                    {" "}
                    <CollegeListScreen />{" "}
                  </CounsellorRoute>
                }
              />
            <Route
                path="/admin/articlelist"
                element={
                  <AdminRoute>
                    {" "}
                    <ArticleListScreen />{" "}
                  </AdminRoute>
                }
              />
            <Route
                path="/admin/reviewlist"
                element={
                  <AdminRoute>
                    {" "}
                    <ReviewListScreen />{" "}
                  </AdminRoute>
                }
              />
            <Route
                path="/admin/userlist"
                element={
                  <AdminRoute>
                    {" "}
                    <UserListScreen />{" "}
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/appointmentslist"
                element={
                  <AdminRoute>
                    
                    <AppointmentsListScreen/>
                  </AdminRoute>
                }
              />
              <Route
                path="/counsellor/appointmentslist"
                element={
                  <CounsellorRoute>
                    
                    <AppointmentsListScreenCounsellor/>
                  </CounsellorRoute>
                }
              />
            

            <Route
                path="/admin/dashboard/blog-update"
                element={
                  <AdminRoute>
                    {" "}
                    <BlogListScreen />{" "}
                  </AdminRoute>
                }
              />

            <Route
                path="/admin/article-edit/:slug"
                element={
                  <AdminRoute>
                    {" "}
                    <BlogEdit />{" "}
                  </AdminRoute>
                }
              />
            
          </Routes>
        </main>
       
        <Footer/>
        </div>
      </>
    </BrowserRouter>
  )
}

export default App