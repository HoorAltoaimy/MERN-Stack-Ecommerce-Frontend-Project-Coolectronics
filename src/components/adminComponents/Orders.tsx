import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store'
import { ChangeEvent, useEffect } from 'react'
import { Order, fetchOrders, searchOrder } from '../../redux/slices/orders/ordersSlice'
import Search from '../Search'

const Orders = () => {

  const { orders, isLoading, error, searchInput } = useSelector(
    (state: RootState) => state.ordersReducer
  )
  
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders());
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchOrder(searchItem))
  }

  const searchResult = searchInput
    ? orders.filter((order) => order.id === Number(searchInput))
    : orders
  
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
        <Search searchInput={searchInput} handleSearch={handleSearch} />
        <div className="admin-main-content">
          {searchResult.length > 0 &&
            searchResult.map((order: Order) => {
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
