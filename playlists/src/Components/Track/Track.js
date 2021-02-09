import React from 'react'
import './Track.css'
const Track = (props) => {
    const trackInfo = props.trackInfo
    
    const renderAction = (isRemoval) => {
        if (isRemoval) {
            return '-'
        } else {
            return '+'
        }
    }

    const addTrack = () => {
        // console.log("addTrack in Track.js:",trackInfo)
        props.onAdd(trackInfo)
    }

    return (
        <div className="Track">
        <div className="Track-information">
            <h3>{trackInfo.name}</h3>
            <p>{trackInfo.artist} | {trackInfo.album}</p>
        </div>
            <button className="Track-action"
                onClick={addTrack}>
                    {renderAction(props.isRemoval)}
            </button>
        </div>
    )
}

export default Track;