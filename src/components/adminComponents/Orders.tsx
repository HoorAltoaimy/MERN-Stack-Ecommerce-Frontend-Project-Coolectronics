import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Order, deleteOrder, fetchOrders, searchOrder } from '../../redux/slices/orders/ordersSlice'
import { AppDispatch, RootState } from '../../redux/store'

import Search from '../products/Search'
import AdminSidebar from './AdminSidebar'

const Orders = () => {
  const { orders, isLoading, error, searchInput } = useSelector(
    (state: RootState) => state.ordersReducer
  )

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchOrder(searchItem))
  }

  const searchResult = searchInput
    ? orders.filter((order) => order.id === Number(searchInput))
    : orders

  const handleDeleteOrder = (id: number) => {
    dispatch(deleteOrder(id))
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main-content">
        <h3 className="title">Orders</h3>
        <Search
          searchInput={searchInput}
          handleSearch={handleSearch}
          searchLabel="Search by order ID: "
        />

        <table>
          <thead>
            <td>Order ID</td>
            <td>Product ID</td>
            <td>User ID</td>
            <td>Purchased at</td>
            <td>Cancel Order</td>
          </thead>
          {searchResult.length > 0 &&
            searchResult.map((order: Order) => {
              const { id, productId, userId, purchasedAt } = order
              return (
                <tr key={id}>
                  <td>{id} </td>
                  <td>{productId} </td>
                  <td>{userId} </td>
                  <td>{purchasedAt} </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        handleDeleteOrder(id)
                      }}>
                      Cancel
                    </button>
                  </td>
                </tr>
              )
            })}
        </table>
      </div>
    </div>
  )
}

export default Orders
