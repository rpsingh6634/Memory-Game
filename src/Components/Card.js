import React from 'react'

const Card = (props) => {
    const flip = () => {
        props.flip(props.index);
    }
    return (
        <div className={`card ${props.isFlipped ? "flipped" : false}`} onClick={flip}>
            <div className="content">
            <h1>{props.emoji}</h1>
            </div>
        </div>
    )
}

export default Card;
