import React, { MutableRefObject } from 'react'

interface ScrollTargetProps {
    refScrollUp: MutableRefObject<HTMLDivElement>;
}

const ScrollTarget = ({ refScrollUp } : ScrollTargetProps) => {

    return (
        <div ref={refScrollUp}></div>
    )

}

export default ScrollTarget
