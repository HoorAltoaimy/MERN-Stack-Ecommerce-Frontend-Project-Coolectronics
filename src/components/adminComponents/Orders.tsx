import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect } from 'react'
import { Order, fetchOrders } from '../../redux/slices/orders/ordersSlice'

const Orders = () => {

  const { orders, isLoading, error } = useSelector((state: RootState) => state.ordersReducer)
  
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders());
  }, [])
  
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{ error}</p>
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h3>Orders</h3>
        <div className="admin-main-content">
          {orders.length > 0 &&
            orders.map((order: Order) => {
              const { id, productId, userId, purchasedAt } = order
              return (
                <article key={id}>
                  <p>Order ID: {id} </p>
                  <p>Product ID: {productId} </p>
                  <p>User ID: {userId} </p>
                  <p>Purchased at: {purchasedAt} </p>
                </article>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Orders
