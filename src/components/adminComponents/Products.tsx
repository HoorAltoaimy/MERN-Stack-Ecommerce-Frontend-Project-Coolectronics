import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import useProductsState from '../../hooks/useProductsState'
import {
  Product,
  createProduct,
  deleteProduct,
  fetchProducts,
  searchProduct,
  updateProduct
} from '../../redux/slices/products/productsSlice'
import { AppDispatch } from '../../redux/store'

import Search from '../products/Search'
import AdminSidebar from './AdminSidebar'
import showToast from '../../utils/toastUtils'
import { fetchCategories } from '../../redux/slices/categories/categoriesSlice'
import useCategoriesState from '../../hooks/useCategoriesState'

export type ProductEditType = {
  title: string
  price: string
  category: string 
  image: File | undefined | string
  description: string
  quantity: string
  sold?: string
  shipping: string
}

const initialProductData = {
  title: '',
  image: undefined,
  description: '',
  category: '',
  price: '0',
  quantity: '0',
  shipping: '0'
}

const Products = () => {
  const { products, searchInput, isLoading, error } = useProductsState()

  const { categories } = useCategoriesState()

  // ! handle pagination (create page and limit states)
  //console.log(pagination)

  const [productInfo, setProductInfo] = useState<ProductEditType>({ ...initialProductData })
  
  const [isEdit, setIsEdit] = useState(false)

  const [editId, setEditId] = useState('')

  const [validation, setValidation] = useState('')

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts()) //! pass limit and page for pagination
  }, []) //dispatch as dependincies //! page and limit as dependincies

  useEffect(() => {
    dispatch(fetchCategories()) 
    if (categories.length > 0) {
      setProductInfo((prevProduct) => {
        return { ...prevProduct, ['category']: categories[0]._id }
      })
    }
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
    const { name, type, value } = event.target

    if (type === 'file') {
      const fileInput = (event.target as HTMLInputElement)
      const filePath = fileInput.files?.[0]
      setProductInfo((prevProduct) => {
        return { ...prevProduct, [name]: filePath }
      })
    } else {
      setProductInfo((prevProduct) => {
        return { ...prevProduct, [name]: value }
      })
    }
  }

  const handleEditProduct = (
    _id: string,
    title: string,
    image: File | undefined | string,
    description: string,
    category: string,
    price: string,
    quantity: string,
    shipping: string
  ) => {
    setEditId(_id)
    setIsEdit(!isEdit)

    if (!isEdit) {
      setProductInfo({
        title,
        image,
        description,
        category,
        quantity: quantity,
        shipping: shipping,
        price: price
      })
    } else {
      setProductInfo({ ...initialProductData })
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (isEdit) {
      const editProductData = new FormData()
      editProductData.append('title', productInfo.title)
      editProductData.append('description', productInfo.description)
      editProductData.append('category', productInfo.category)
      editProductData.append('image', productInfo.image as Blob)
      editProductData.append('price', productInfo.price)
      editProductData.append('quantity', productInfo.quantity)
      editProductData.append('shipping', productInfo.shipping)

      dispatch(updateProduct({ updatedProduct: editProductData, id: editId }))
      showToast('success', 'Updated successfully')
    } else {
      const newProduct = new FormData()
      newProduct.append('title', productInfo.title)
      newProduct.append('description', productInfo.description)
      newProduct.append('category', productInfo.category)
      newProduct.append('image', productInfo.image as Blob)
      newProduct.append('price', productInfo.price)
      newProduct.append('quantity', productInfo.quantity)
      newProduct.append('shipping', productInfo.shipping)

      dispatch(createProduct(newProduct))
      showToast('success', 'Created successfully')
      // for (const [key, value] of newProduct) {
      //   console.log(key, value)
      // }
    }

    setProductInfo({ ...initialProductData })
    setValidation('')
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchProduct(searchItem))
  }

  const searchResult = searchInput
    ? products.filter((product) => product.title.toLowerCase().includes(searchInput.toLowerCase()))
    : products

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await dispatch(deleteProduct(id))

      if (response.meta.requestStatus === 'fulfilled') {
        showToast('success', 'Product deleted successfully')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast('error', error?.response?.data.message)
      }
    }
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
              <label htmlFor="title">Product title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={productInfo.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admin-form-line">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleChange}
                required
              />
              {productInfo.image && (
                <div>
                  {productInfo.image instanceof File ? (
                    <img
                      src={URL.createObjectURL(productInfo.image)}
                      alt="preview"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <img src={productInfo.image as string} alt="preview" width={50} height={50} />
                  )}
                </div>
              )}
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
              <label htmlFor="category">Product category:</label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                value={productInfo.category}>
                {categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="admin-form-line">
              <label htmlFor="quantity">Product Quantity:</label>
              <input
                type="text"
                name="quantity"
                id="quantity"
                value={productInfo.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="admin-form-line">
              <label htmlFor="shipping">Shipping:</label>
              <input
                type="text"
                name="shipping"
                id="shipping"
                value={productInfo.shipping}
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
              const { _id, title, image, description, category, price, quantity, sold, shipping } =
                product
              return (
                <article className="product-card" key={_id}>
                  <img src={image as string} alt={title} width={100} height={100} />
                  <p>ID: {_id}</p>
                  <p>Title: {title}</p>
                  <p>Description: {description}</p>
                  {/* <p>Category: {category}</p> */}
                  <p>Price: ${price}</p>
                  <p>Shipping: ${shipping}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Sold: {sold}</p>
                  <button
                    className="btn"
                    onClick={() => {
                      handleEditProduct(
                        _id,
                        title,
                        image,
                        description,
                        category,
                        quantity,
                        shipping,
                        price
                      )
                    }}>
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      handleDeleteProduct(_id)
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
