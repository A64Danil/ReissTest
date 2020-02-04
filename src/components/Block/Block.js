import React from 'react'
import "./Block.scss";

const Block = ({title}) => {
    return (
        <div className="block-test">
            <h1>Заголовок11: {title}</h1>
        </div>
    )
}

export default Block