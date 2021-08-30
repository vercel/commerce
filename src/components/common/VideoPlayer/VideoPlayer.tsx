import React from 'react';
import ReactPlayer from 'react-player/lazy'

interface Props {
    url: string,
    controls?: boolean,
    muted?: boolean,
}

const VideoPlayer = ({ url, controls, muted }: Props) => {
    return (
        <ReactPlayer
            url={url}
            controls={controls}
            muted={muted} />
    );
};

export default VideoPlayer;