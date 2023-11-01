import { useDispatch } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch } from '../../redux/store'
import { ChangeEvent, FormEvent, useState } from 'react'
import {
  Product,
  addProduct,
  searchProduct,
  deleteProduct,
  editProduct
} from '../../redux/slices/products/productsSlice'
import Search from '../Search'
import { v4 as uuidv4 } from 'uuid'
import useProductsState from '../../hooks/useProductsState'

const Products = () => {
  const { products, isLoading, error, searchInput } = useProductsState()

  const [productInfo, setProductInfo] = useState({
    name: '',
    image: '',
    description: '',
    categories: [0],
    variants: [''],
    sizes: [''],
    price: 0
  })
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(0)

  const dispatch: AppDispatch = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProductInfo({
        ...productInfo,
        [name]: value.split(',')
      })
      return
    }

    setProductInfo({
      ...productInfo,
      [name]: value
    })
  }

  const handleEditProduct = (
    id: number,
    name: string,
    image: string,
    description: string,
    categories: number[],
    variants: string[],
    sizes: string[],
    price: number
  ) => {
    setEditId(id)
    setIsEdit(!isEdit)

    if (!isEdit) {
      setProductInfo({
        name,
        image,
        description,
        categories,
        variants,
        sizes,
        price
      })
    } else {
      setProductInfo({
        name: '',
        image: '',
        description: '',
        categories: [],
        variants: [],
        sizes: [],
        price: 0
      })
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (isEdit) {
      const editProductData = { id: editId, ...productInfo }
      dispatch(editProduct(editProductData))
    } else {
      const newProductt = { id: uuidv4(), ...productInfo }
      dispatch(addProduct(newProductt))
    }

    setProductInfo({
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
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main-content">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Create New Product</h4>
          <label htmlFor="name">Product name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={productInfo.name}
            onChange={handleChange}
          />
          <label htmlFor="image"> Image URL:</label>
          <input
            type="text"
            name="image"
            id="image"
            value={productInfo.image}
            onChange={handleChange}
          />
          <label htmlFor="description">Product descripton:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={productInfo.description}
            onChange={handleChange}
          />
          <label htmlFor="categories">Product categories:</label>
          <input
            type="text"
            name="categories"
            id="categories"
            value={productInfo.categories.join(',')}
            onChange={handleChange}
          />
          <label htmlFor="variants">Product variants:</label>
          <input
            type="text"
            name="variants"
            id="variants"
            value={productInfo.variants.join(',')}
            onChange={handleChange}
          />
          <label htmlFor="sizes">Product sizes:</label>
          <input
            type="text"
            name="sizes"
            id="sizes"
            value={productInfo.sizes.join(',')}
            onChange={handleChange}
          />
          <label htmlFor="price">Product price:</label>
          <input
            type="text"
            name="price"
            id="price"
            value={productInfo.price}
            onChange={handleChange}
          />

          <button type="submit" className="btn">
            {isEdit ? 'Save' : 'Create'}
          </button>
        </form>

        <h3 className="title">PRODUCTS</h3>
        <Search searchInput={searchInput} handleSearch={handleSearch} />
        <div className="products-container">
          {searchResult.length > 0 &&
            searchResult.map((product: Product) => {
              const { id, name, image, description, categories, variants, sizes, price } = product
              return (
                <article className="product-card" key={id}>
                  <img src={image} alt={name} width={100} height={100} />
                  <p>{id}</p>
                  <p>{name}</p>
                  <p>{description}</p>
                  <p>{categories}</p>
                  <p>{variants}</p>
                  <p>{sizes}</p>
                  <p>${price}</p>
                  <button
                    className="btn"
                    onClick={() => {
                      handleEditProduct(
                        id,
                        name,
                        image,
                        description,
                        categories,
                        variants,
                        sizes,
                        price
                      )
                    }}>
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      handleDeleteProduct(id)
                    }}>
                    Delete
                  </button>
                </article>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Products
