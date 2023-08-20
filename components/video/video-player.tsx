'use client';

import { FC, useEffect, useState } from 'react';

import ReactPlayer from 'react-player/';
import { VimeoConfig } from 'react-player/vimeo';
import { YouTubeConfig } from 'react-player/youtube';

import styles from '../../app/[locale]/css/video.module.css';

type VideoPlayerProps = {
  url: string;
  playing?: boolean;
  controls?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  volume?: number;
  pip?: boolean;
  width?: string;
  height?: string;
  showTitle?: boolean;
  showPortrait?: boolean;
  showByline?: boolean;
  className?: string;
  onLoaded?: () => void;
};

const VideoPlayer: FC<VideoPlayerProps> = (props) => {
  const {
    url,
    playing,
    controls = false,
    loop = true,
    autoplay = true,
    volume = 0,
    pip = false,
    width = '100%',
    height = '100%',
    showTitle,
    showPortrait,
    showByline,
    className = `relative w-full h-full ${styles.reactPlayerWrap} aspect-video`,
    onLoaded = (params: any) => params
  } = props;

  const [config, setConfig] = useState<{ vimeo: VimeoConfig; youtube: YouTubeConfig }>();

  useEffect(() => {
    const localConfig = {
      vimeo: {
        playerOptions: {
          showTitle,
          showPortrait,
          showByline
        }
      },
      youtube: {
        embedOptions: {
          autoplay: 0,
          controls,
          loop: 0,
          modestbranding: true,
          width: '1440px',
          height: '810px'
        }
      }
    };
    setConfig(localConfig);
  }, [autoplay, controls, loop, showTitle, showPortrait, showByline]);

  return (
    <ReactPlayer
      url={url}
      playing={playing}
      loop={loop}
      className={className}
      config={config}
      volume={volume}
      controls={controls}
      pip={pip}
      width={width}
      height={height}
      onReady={(params) => onLoaded(params)}
    />
  );
};

export default VideoPlayer;
