import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import useProductsState from '../../hooks/useProductsState'
import {
  Product,
  addProduct,
  deleteProduct,
  editProduct,
  searchProduct
} from '../../redux/slices/products/productsSlice'
import { AppDispatch } from '../../redux/store'

import Search from '../products/Search'
import AdminSidebar from './AdminSidebar'

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

  const [validation, setValidation] = useState('')

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

    if (
      productInfo.name.length < 2 ||
      productInfo.description.length < 5 ||
      productInfo.categories.length < 1 ||
      productInfo.image.length < 15 ||
      productInfo.price === 0
    ) {
      setValidation('Please fill the form')
      return
    }
    if (isEdit) {
      const editProductData = { id: editId, ...productInfo }
      dispatch(editProduct(editProductData))
    } else {
      const newProduct = { id: uuidv4(), ...productInfo }
      dispatch(addProduct(newProduct))
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

    setValidation('')
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
        <h4 className="title">Create New Product</h4>
        <div className="admin-forms">
          <form onSubmit={handleSubmit}>
            <div className="admin-form-line">
              <label htmlFor="name">Product name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={productInfo.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admin-form-line">
              <label htmlFor="image"> Image URL:</label>
              <input
                type="text"
                name="image"
                id="image"
                value={productInfo.image}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admin-form-line">
              <label htmlFor="description">Product descripton:</label>
              <input
                type="text"
                name="description"
                id="description"
                value={productInfo.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admin-form-line">
              <label htmlFor="categories">Product categories:</label>
              <input
                type="text"
                name="categories"
                id="categories"
                value={productInfo.categories.join(',')}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admin-form-line">
              <label htmlFor="variants">Product variants:</label>
              <input
                type="text"
                name="variants"
                id="variants"
                value={productInfo.variants.join(',')}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-line">
              <label htmlFor="sizes">Product sizes:</label>
              <input
                type="text"
                name="sizes"
                id="sizes"
                value={productInfo.sizes.join(',')}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-line">
              <label htmlFor="price">Product price:</label>
              <input
                type="text"
                name="price"
                id="price"
                value={productInfo.price}
                onChange={handleChange}
                required
              />
            </div>

            <p className="form-validation">{validation}</p>
            <button type="submit" className="btn">
              {isEdit ? 'Save' : 'Create'}
            </button>
          </form>
        </div>

        <h3 className="title">PRODUCTS</h3>
        <Search
          searchInput={searchInput}
          handleSearch={handleSearch}
          searchLabel="Search product by name: "
        />
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
