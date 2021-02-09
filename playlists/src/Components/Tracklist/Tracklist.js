import React from 'react'
import Track from '../Track/Track'

const Tracklist = (props) => {
    const tracksToRender = props.searchResults ? props.searchResults : props.playlistTracks

    return (
        <div className="TrackList">
            {tracksToRender.map(track => { return (
                <div>     
                    <Track trackInfo={track}
                        onAdd={props.onAdd}
                        key={track.id}/>
                </div>
            )})}
        </div>
    )
}

export default Tracklist;