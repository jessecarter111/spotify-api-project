import React from 'react'
import './SearchBar.css'

const SearchBar = (props) => {

    const search = () => {
        props.onSearch()
    }

    const handleChange = ({ target }) => {
        props.updateSearchTerm(target.value)
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleChange} value={props.searchTerm}/>
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    );

}

export default SearchBar