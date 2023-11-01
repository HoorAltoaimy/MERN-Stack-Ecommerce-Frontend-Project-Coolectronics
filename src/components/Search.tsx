import { ChangeEvent } from 'react'

type SearchPropsType = {
  searchInput: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ searchInput, handleSearch }: SearchPropsType) => {
  return (
    <div>
      <form>
        <input className='search'
          type="text"
          name="search"
          id="search"
          placeholder="search.."
          onChange={handleSearch}
          value={searchInput}
        />
      </form>
    </div>
  )
}

export default Search
