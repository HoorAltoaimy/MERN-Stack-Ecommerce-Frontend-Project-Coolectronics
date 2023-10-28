import { useDispatch } from 'react-redux'
import './App.css'
import { AppDispatch } from './redux/store'
import Index from './routes/Index'
import { fetchProducts } from './redux/slices/products/productsSlice'
import { useEffect } from 'react'
import { fetchCategories } from './redux/slices/categories/categoriesSlice'
import { fetchUsers } from './redux/slices/users/userSlice'
import { fetchOrders } from './redux/slices/orders/ordersSlice'

function App() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchUsers())
    dispatch(fetchOrders())
  }, [])
  
  return (
    <div className="App">
      <Index />
    </div>
  )
}

export default App
