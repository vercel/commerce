import { Box, Flex, propNames, Stack, Text } from "@chakra-ui/react"
import { MarkerResourcePayload } from "../RoomTypes/RoomTypes"
import Image from "next/image";

import 'react-h5-audio-player/lib/styles.css';

import style from './ResourceCardStyle.module.css';
import ImageCardContent from "../ResourceCardContent/ImageCardContent";
import AudioCardContent from "../ResourceCardContent/AudioCardContent";
import VideoCardContent from "../ResourceCardContent/VideoCardContent";

export default function ResourceCardModal(props: {
    decade: string,
    resourcePayload: MarkerResourcePayload,
    onModalClose?: () => void,
    onAudioPlay?: (player: HTMLAudioElement) => void,
    onAudioPause?: () => void
  }) {
    
    const RES_PATH = '/regions/abruzzo/' + props.decade + '/resources/' + props.resourcePayload.resourceSource;

    const getResourceContent = () => {
      switch(props.resourcePayload.resourceType) {
        case 'image':
          return (
            <ImageCardContent resourceCaption={props.resourcePayload.resourceCaption} resourcePath={RES_PATH} style={style} />
          )
        case 'audio':
          return (
            <AudioCardContent resourceCaption={props.resourcePayload.resourceCaption} style={style} resourcePath={RES_PATH} onPlay={props.onAudioPlay!} onPause={props.onAudioPause!} onClose={props.onModalClose!} />
          )
        case 'video':
          return (
            <VideoCardContent resourceCaption={props.resourcePayload.resourceCaption} style={style} resourcePath={RES_PATH} />
          )
        default:
          return (<></>) 
      }
    }

    return (
      <Flex w="full" alignItems="center" justifyContent="center" direction={'row'}>
        <Box
          maxW={'445px'}
          w={'full'}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
          className={style.cardBody}>

          <Box 
            position={"absolute"} 
            margin={"5px"} 
            top={"0"} 
            left={"0"} 
            height={"50px"} 
            width={"50px"}
            zIndex={'overlay'}>
              <Image
                className={style.decadeIcon}
                src={'/assets/polygons/' + props.decade + '.svg'}
                alt={`Picture of Decade`}
                layout={"fill"}
              />
          </Box>

            {
              getResourceContent()
            }

          </Box>
      </Flex>
    )
};