import { useState } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar'

const App = (props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([
    {name: 'Bob\'s Ballad', artist: 'TinyBob', album: 'Tiny Bob\'s Tiny Shiners', id: 1},
    {name: 'Bayou Bob', artist: 'TinyBob', album: 'Tiny Bob\'s Tiny Shiners', id: 2},
    {name: 'One Bob Short of Love', artist: 'TinyBob', album: 'Tiny Bob\'s Tiny Shiners', id: 3},
    {name: 'Bet My Last Bob on You', artist: 'TinyBob', album: 'Tiny Bob\'s Tiny Shiners', id: 4},
  ])
  const [playlistName, setPlayListName] = useState('Bob\s Fucking Bangers')
  const [playlistTracks, setPlaylistTracks] = useState([])
  
  const addTrack = (track) => {
    if (!playlistTracks.includes(track)) setPlaylistTracks([...playlistTracks, track])
  }

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id))
  }

  const updatePlaylistName = (newPlaylistName) => {
    setPlayListName(newPlaylistName)
  }

  //ToDo ===> Set up a Save Playlist method after API access is obtained

  const search = () => {
    console.log(searchTerm)
  }

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm)
  }

  return (
    <div>
      <h1><span className="highlight">Play</span>list</h1>
      <div className="App">
        <SearchBar onSearch={search} searchTerm={searchTerm} updateSearchTerm={updateSearchTerm}/>
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack}/>
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} 
            onRemove={removeTrack} updatePlaylistName={updatePlaylistName} />
        </div>
      </div>
    </div>
  );
}

export default App;
