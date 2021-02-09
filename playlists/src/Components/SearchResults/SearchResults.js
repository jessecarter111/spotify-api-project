import React from 'react'
import './SearchResults.css'
import Tracklist from '../Tracklist/Tracklist'

const SearchResults = (props) => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist searchResults={props.searchResults} onAdd={props.onAdd} isRemoval={false}/>
        </div>
    )
}

export default SearchResults;