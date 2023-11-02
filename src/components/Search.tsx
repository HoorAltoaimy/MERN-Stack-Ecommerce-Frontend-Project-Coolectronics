import { ChangeEvent } from 'react'

type SearchPropsType = {
  searchInput: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
  searchLabel: string
}

const Search = ({ searchInput, handleSearch, searchLabel }: SearchPropsType) => {
  return (
    <div>
      <form>
        <label htmlFor="search">{searchLabel}</label>
        <input
          className="search"
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
