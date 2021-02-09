import React from 'react'
import './Playlist.css'

import Tracklist from '../Tracklist/Tracklist'

const Playlist = (props) => {
    return (
        <div className="Playlist">
            <input defaultValue={"New Playlist"}/>
            <Tracklist playlistTracks={props.playlistTracks}/>
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;