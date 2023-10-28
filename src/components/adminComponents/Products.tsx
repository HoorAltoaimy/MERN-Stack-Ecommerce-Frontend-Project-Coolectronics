import { useDispatch } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch } from '../../redux/store'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import {
  Product,
  addProduct,
  fetchProducts,
  searchProduct,
  deleteProduct
} from '../../redux/slices/products/productsSlice'
import Search from '../Search'
import { v4 as uuidv4 } from 'uuid'
import useProductState from '../../hooks/useProductState'

const Products = () => {
  const { products, isLoading, error, searchInput } = useProductState()

  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price: 0
  })

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    // setNewProduct((prevProducts) => {
    //   return { ...prevProducts, [name]: value }
    // })

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setNewProduct({
        ...newProduct,
        [name]: value.split(',')
      })
      return
    }

    setNewProduct({
      ...newProduct,
      [name]: value
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    newProduct.id = uuidv4()

    dispatch(addProduct(newProduct))
    console.log(products) //1 issue in adding the new category to the categories array
    setNewProduct({
      id: '',
      name: '',
      image: '',
      description: '',
      categories: [],
      variants: [],
      sizes: [],
      price: 0
    })
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchProduct(searchItem))
  }

  const searchResult = searchInput
    ? products.filter((product) => product.name.toLowerCase().includes(searchInput.toLowerCase()))
    : products

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id))
  }
  
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <h3>Create New Product</h3>
          {/*add default static img*/}
          <label htmlFor="name">Product name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newProduct.name}
            onChange={handleChange}
          />
          <label htmlFor="image"> Image URL:</label>
          <input
            type="text"
            name="image"
            id="image"
            value={newProduct.image}
            onChange={handleChange}
          />
          <label htmlFor="description">Product descripton:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={newProduct.description}
            onChange={handleChange}
          />
          <label htmlFor="categories">Product categories:</label>
          <input
            type="text"
            name="categories"
            id="categories"
            value={newProduct.categories.join(',')}
            onChange={handleChange}
          />
          <label htmlFor="variants">Product variants:</label>
          <input
            type="text"
            name="variants"
            id="variants"
            value={newProduct.variants.join(',')}
            onChange={handleChange}
          />
          <label htmlFor="sizes">Product sizes:</label>
          <input
            type="text"
            name="sizes"
            id="sizes"
            value={newProduct.sizes.join(',')}
            onChange={handleChange}
          />
          <label htmlFor="price">Product price:</label>
          <input
            type="text"
            name="price"
            id="price"
            value={newProduct.price}
            onChange={handleChange}
          />

          <button type="submit">Create</button>
        </form>

        <h3>Products:</h3>
        <Search searchInput={searchInput} handleSearch={handleSearch} />
        <div className="admin-main-content">
          {searchResult.length > 0 &&
            searchResult.map((product: Product) => {
              const { id, name, image, description, categories, variants, sizes, price } = product
              return (
                <article key={id} className="admin-products">
                  <img src={image} alt={name} width={100} height={100} />
                  <p>{id}</p>
                  <p>{name}</p>
                  <p>{description}</p>
                  <p>{categories}</p>
                  <p>{variants}</p>
                  <p>{sizes}</p>
                  <p>{price}</p>
                  <button>Edit</button>
                  <button onClick={() => {handleDeleteProduct(id)}}>Delete</button>
                </article>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Products
