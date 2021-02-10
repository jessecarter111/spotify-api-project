import React from 'react'
import './Playlist.css'

import Tracklist from '../Tracklist/Tracklist'

const Playlist = (props) => {
    const handleChange = ({ target }) => {
        props.updatePlaylistName(target.value)
    }

    return (
        <div className="Playlist">
            <input defaultValue={props.playlistName} onChange={handleChange}/>
            <Tracklist tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
            <button className="Playlist-save" onClick={props.savePlaylist}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;