import React from 'react'
import Track from '../Track/Track'

const Tracklist = (props) => {

    return (
        <div className="TrackList">
            {props.tracks.map(track => { return (
                <div>     
                    <Track trackInfo={track}
                        onAdd={props.onAdd}
                        onRemove={props.onRemove}
                        isRemoval={props.isRemoval}
                        key={track.id}/>
                </div>
            )})}
        </div>
    )
}

export default Tracklist;