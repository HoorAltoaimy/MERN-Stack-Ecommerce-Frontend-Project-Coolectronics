import { toast } from 'react-toastify'
import { clearError } from '../redux/slices/users/userSlice'

const showToast = (status: string, message: string, options = {}) => {
  if (status === 'error') {
    toast.error(message, {
      onClose: () => clearError(),
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options
    })
  }
  if (status === 'success') {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options
    })
  }
}

export default showToast
