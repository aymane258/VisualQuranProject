import React from 'react'

const Gallery = (props) => {
    return (
        <div>
            <button onClick={props.change}>Switch Image</button>
        </div>
    )
}

export default Gallery
