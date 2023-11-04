import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchCategories } from './redux/slices/categories/categoriesSlice'
import { fetchOrders } from './redux/slices/orders/ordersSlice'
import { fetchProducts } from './redux/slices/products/productsSlice'
import { fetchUsers } from './redux/slices/users/userSlice'
import { AppDispatch } from './redux/store'

import Index from './routes/Index'

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
