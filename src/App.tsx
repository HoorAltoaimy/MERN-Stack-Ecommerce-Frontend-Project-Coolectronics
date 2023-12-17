// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import Index from './routes/Index'
import { ToastContainer, toast } from 'react-toastify'

// import { fetchCategories } from './redux/slices/categories/categoriesSlice'
// import { fetchOrders } from './redux/slices/orders/ordersSlice'
// import { fetchProducts } from './redux/slices/products/productsSlice'
// import { fetchUsers } from './redux/slices/users/userSlice'
// import { AppDispatch } from './redux/store'

function App() {
  //const dispatch: AppDispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchProducts())
  //   dispatch(fetchCategories())
  //   dispatch(fetchUsers())
  //   dispatch(fetchOrders())
  // }, [])
  
  return (
    <div className="App">
      <Index />
      <ToastContainer limit={1} autoClose={3000} position={toast.POSITION.TOP_LEFT} />
    </div>
  )
}

export default App
