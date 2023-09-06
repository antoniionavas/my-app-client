
function Search(props) {

  const handleSearch = (e) => {
    props.setSearchQuery(e.target.value)
  }

  return (
    <div>
      
      <input type="text" name="search" value={props.searchQuery} onChange={handleSearch}/>

    </div>
  )
}

export default Search