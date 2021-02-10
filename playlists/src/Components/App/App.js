import { useState } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar'
import Spotify from '../../util/Spotify'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlayListName] = useState('')
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

  const savePlaylist = async () => {
    const userID = await Spotify.getUserID()
    const playlistID = await Spotify.savePlaylist(userID, playlistName)
    const trackURIs = playlistTracks.map(track => track.URI)
    Spotify.addTracksToPlaylist(playlistID, trackURIs)
    window.alert(`Success, ${playlistName} saved!`)
  }

  const search = async () => {
    Spotify.getAccessToken()
    Spotify.search(searchTerm).then((result) => {
        setSearchResults(result)
      }
    )
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
          <Playlist playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemove={removeTrack} 
            updatePlaylistName={updatePlaylistName}
            savePlaylist={savePlaylist}/>
        </div>
      </div>
    </div>
  );
}

export default App;
