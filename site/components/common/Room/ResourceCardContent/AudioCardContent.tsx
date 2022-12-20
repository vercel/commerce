import { Box, Stack, Button, Text } from "@chakra-ui/react";
import { createRef } from "react";
import H5AudioPlayer from "react-h5-audio-player";

export default function AudioCardContent(props: {
    style: any
    resourcePath: string,
    resourceCaption: string,
    onPlay: (player: HTMLAudioElement) => void,
    onPause: () => void,
    onClose: () => void
  }) { 

    const player = createRef<H5AudioPlayer>()

    return (
        <>
            <Box
                className={props.style.imageContainer}
                w={'full'}
                >
                <H5AudioPlayer
                    src={props.resourcePath}
                    ref={player}
                    onCanPlay={e => props.onPlay(player.current?.audio.current!)}
                />
            </Box>
            
            <Box 
                p={5}
                className={props.style.captionContainer}>
                
                <Stack align={'center'}>
                    <Text padding={0} color={'gray.500'} fontSize={'sm'} align={'center'}>
                        {props.resourceCaption}
                    </Text>
                    <Button mt={5} onClick={(e) => {props.onClose();props.onPause();}} colorScheme='teal' variant='solid'>
                        BACKGROUND AUDIO
                    </Button>
                </Stack>
            </Box>
        </>
    )
};