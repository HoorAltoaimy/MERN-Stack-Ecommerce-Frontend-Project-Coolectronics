import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Home from '../pages/Home'
import ProductDetailes from '../pages/ProductDetailes'
import AdminDashboard from '../pages/AdminDashboard'
import Categories from '../components/adminComponents/Categories'
import Products from '../components/adminComponents/Products'
import Users from '../components/adminComponents/Users'
import Orders from '../components/adminComponents/Orders'
// import Cart from '../components/userComponents/Cart'
import Error from '../pages/Error'
import LoginPage from '../pages/LoginPage'
import VisitorProfile from '../pages/VisitorProfile'
import VisitorProtectedRoutes from './VisitorProtectedRoutes'
import AdminProtectedRoutes from './AdminProtectedRout'
import Register from '../pages/Register'

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDetailes" element={<ProductDetailes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/admin" element={<AdminProtectedRoutes />}>
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="adminDashboard/categories" element={<Categories />} />
          <Route path="adminDashboard/products" element={<Products />} />
          <Route path="adminDashboard/users" element={<Users />} />
          <Route path="adminDashboard/orders" element={<Orders />} />
        </Route>

        <Route path="/visitor" element={<VisitorProtectedRoutes />}>
          <Route path="visitorProfile" element={<VisitorProfile />} />
          {/* <Route path="cart" element={<Cart />} />  */}
        </Route>

        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
