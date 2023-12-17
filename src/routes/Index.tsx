import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Categories from '../components/adminComponents/Categories'
import Orders from '../components/adminComponents/Orders'
import Products from '../components/adminComponents/Products'
import Users from '../components/adminComponents/Users'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import Cart from '../components/userComponents/Cart'

import AdminDashboard from '../pages/admin/AdminDashboard'
import Error from '../pages/Error'
import Home from '../pages/home/Home'
import LoginPage from '../pages/login/LoginPage'
import ProductDetails from '../pages/home/ProductDetails'
import Register from '../pages/login/Register'
import UserProfile from '../pages/user/UserProfile'

import AdminProtectedRoutes from './AdminProtectedRout'
import UserProtectedRoutes from './UserProtectedRoutes'
import Activate from '../pages/user/Activate'

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDetails/:idNumber" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/activate/:token" element={<Activate />} />

        {/* <Route path="/admin" element={<AdminProtectedRoutes />}> */}
        <Route path="/admin">
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="adminDashboard/categories" element={<Categories />} />
          <Route path="adminDashboard/products" element={<Products />} />
          <Route path="adminDashboard/users" element={<Users />} />
          <Route path="adminDashboard/orders" element={<Orders />} />
        </Route>

        {/* <Route path="/user" element={<UserProtectedRoutes />}> */}
        <Route path="userProfile" element={<UserProfile />} />
        {/* </Route> */}

        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
