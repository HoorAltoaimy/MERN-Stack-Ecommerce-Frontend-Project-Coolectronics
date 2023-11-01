import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useUsersState = () => {
  const { users, isLoading, error, searchInput, isLoggedin, userData } = useSelector(
    (state: RootState) => state.usersReducer
  )

  return { users, isLoading, error, searchInput, isLoggedin, userData }
}

export default useUsersState
