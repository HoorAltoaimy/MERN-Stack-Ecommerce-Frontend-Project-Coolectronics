import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { sortProducts } from '../../redux/slices/products/productsSlice'
import { AppDispatch } from '../../redux/store'

const SortProducts = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortItem = event.target.value
    dispatch(sortProducts(sortItem))
  }

  return (
    <div>
      <label htmlFor="sort">Sort by price:</label>
      <select name="sort" id="sort" onChange={handleOptionChange}>
        <option value="none" defaultValue="none">
          none
        </option>
        <option value="lowerPrice">lower to hieghr</option>
        <option value="hieghrPrice">hieghr to lower</option>
      </select>
    </div>
  )
}

export default SortProducts
