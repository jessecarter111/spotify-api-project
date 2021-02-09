import React from 'react'
import './Track.css'
const Track = (props) => {
    const trackInfo = props.trackInfo

    const renderAction = (isRemoval) => {
        if (isRemoval) {
            return (
                <button className="Track-action" onClick={removeTrack}>
                        -
                </button>)
        } else {
            return (
                <button className="Track-action" onClick={addTrack}>
                        +
                </button>)
        }
    }

    const addTrack = () => {
        props.onAdd(trackInfo)
    }

    const removeTrack = () => {
        props.onRemove(trackInfo)
    }

    return (
        <div className="Track">
        <div className="Track-information">
            <h3>{trackInfo.name}</h3>
            <p>{trackInfo.artist} | {trackInfo.album}</p>
        </div>
            {renderAction(props.isRemoval)}
        </div>
    )
}

export default Track;