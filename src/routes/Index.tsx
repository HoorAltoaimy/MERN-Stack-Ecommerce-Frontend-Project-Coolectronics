import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import AdminDashboard from '../pages/AdminDashboard'
import Categories from '../components/adminComponents/Categories'
import Products from '../components/adminComponents/Products'
import Users from '../components/adminComponents/Users'
import Orders from '../components/adminComponents/Orders'
// import Cart from '../components/userComponents/Cart'
import Error from '../pages/Error'
import LoginPage from '../pages/LoginPage'
import AdminProtectedRoutes from './AdminProtectedRout'
import Register from '../pages/Register'
import UserProfile from '../pages/UserProfile'
import UserProtectedRoutes from './UserProtectedRoutes'
import EditCategory from '../components/adminComponents/EditCategory'

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDetails/:idNumber" element={<ProductDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminProtectedRoutes />}>
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="adminDashboard/categories" element={<Categories />} />
          <Route path="adminDashboard/categories/editCategory" element={<EditCategory />}></Route>
          <Route path="adminDashboard/products" element={<Products />} />
          <Route path="adminDashboard/users" element={<Users />} />
          <Route path="adminDashboard/orders" element={<Orders />} />
        </Route>

        <Route path="/user" element={<UserProtectedRoutes />}>
          <Route path="userProfile" element={<UserProfile />} />
          {/* <Route path="cart" element={<Cart />} />  */}
        </Route>

        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
