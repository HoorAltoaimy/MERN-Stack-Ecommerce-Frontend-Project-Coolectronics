import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { Order, deleteOrder, fetchOrders, searchOrder } from '../../redux/slices/orders/ordersSlice'
import { AppDispatch, RootState } from '../../redux/store'
import Search from '../products/Search'
import AdminSidebar from './AdminSidebar'
import showToast from '../../utils/toastUtils'


const Orders = () => {
  const { orders, searchInput, error } = useSelector(
    (state: RootState) => state.ordersReducer
  )

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (error) {
      showToast('error', error)
    }
  }, [error])

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchOrder(searchItem))
  }

  const searchResult = searchInput
    ? orders.filter((order) => order._id === searchInput)
    : orders

  const handleDeleteOrder = async (id: string) => {
    if (id) {
      try {
        const response = await dispatch(deleteOrder(id))

        if (response.meta.requestStatus === 'fulfilled') {
          showToast('success', 'Order deleted successfully')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast('error', error?.response?.data.message)
        }
      }
    }
  }

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
  // if (error) {
  //   return <p>{error}</p>
  // }

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
              const { _id, products, buyer, createdAt } = order
              return (
                <tr key={_id}>
                  <td>{_id} </td>
                  <td>{products[0]} </td>
                  <td>{buyer} </td>
                  <td>{createdAt} </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        handleDeleteOrder(_id)
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
