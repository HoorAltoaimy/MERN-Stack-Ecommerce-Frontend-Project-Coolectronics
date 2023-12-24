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

const initialProductData = {
  title: '',
  image: '',
  description: '',
  category: '',
  price: '0',
  quantity: '0',
  shipping: '0'
}

const Products = () => {
  const { products, searchInput } = useProductsState()

  const { categories } = useCategoriesState()

  // ! handle pagination (create page and limit states)
  //console.log(pagination)

  const [productInfo, setProductInfo] = useState({... initialProductData})
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
    image: string,
    description: string,
    category: string,
    price: number,
    quantity: number,
    shipping: number
  ) => {
    setEditId(_id)
    setIsEdit(!isEdit)

    if (!isEdit) {
      setProductInfo({
        title,
        image,
        description,
        category,
        quantity: String(quantity),
        shipping: String(shipping),
        price: String(price)
      })
    } else {
      setProductInfo({... initialProductData})
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (
      productInfo.title.length < 2 ||
      productInfo.description.length < 5 ||
      productInfo.category.length < 1 ||
      productInfo.image.length < 15 ||
      productInfo.price === '0' ||
      productInfo.quantity === '0' ||
      productInfo.shipping === '0'
    ) {
      setValidation('Please fill the form')
      return
    }

    // const formData = new FormData()
    // formData.append('title', productInfo.title)
    // formData.append('description', productInfo.description)
    // formData.append('category', productInfo.category)
    // formData.append('image', productInfo.image)
    // formData.append('price', productInfo.price)
    // formData.append('quantity', productInfo.quantity)
    // formData.append('shipping', productInfo.shipping)

    // dispatch(createProduct(formData))
    // // for (const [key, value] of formData) {
    // //   console.log(key, value);
    // // }

    if (isEdit) {
      //const editProductData = { _id: editId, ...productInfo }
      const editProductData = {
        _id: editId,
        title: productInfo.title,
        description: productInfo.description,
        category: productInfo.category,
        quantity: Number(productInfo.quantity),
        shipping: Number(productInfo.shipping),
        price: Number(productInfo.price)
      }
      dispatch(updateProduct(editProductData))
    } else {
      // const newProduct = { id: uuidv4(), ...productInfo }
      // dispatch(addProduct(newProduct))

      const formData = new FormData()
      formData.append('title', productInfo.title)
      formData.append('description', productInfo.description)
      formData.append('category', productInfo.category)
      formData.append('image', productInfo.image)
      formData.append('price', productInfo.price)
      formData.append('quantity', productInfo.quantity)
      formData.append('shipping', productInfo.shipping)

      dispatch(createProduct(formData))
      // for (const [key, value] of formData) {
      //   console.log(key, value);
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
                  <img src={image} alt={title} width={100} height={100} />
                  <p>{_id}</p>
                  <p>{title}</p>
                  <p>{description}</p>
                  <p>{price}</p>
                  <p>{quantity}</p>
                  <p>{sold}</p>
                  <p>${shipping}</p>
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
