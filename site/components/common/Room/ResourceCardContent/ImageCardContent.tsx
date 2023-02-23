import { Box, Stack, Image, Text } from "@chakra-ui/react";
import screenfull from "screenfull";

export default function ImageCardContent(props: {
    style: any
    resourcePath: string
    resourceCaption: string
  }) { 

    return (
        <>
          <style jsx>{`
            *|*:fullscreen:not(:root) {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              width: 100% !important;
              height: 100% !important;
              margin: 0 !important;
              min-width: 0 !important;
              max-width: none !important;
              min-height: 0 !important;
              max-height: none !important;
              box-sizing: border-box !important;
              object-fit: contain;
              transform: none !important;
            }
            `}
          </style>
            <Box
              className={props.style.imageContainer}
              w={'full'}
              >
                <Image 
                  objectFit={"cover"} 
                  margin={"auto"}
                  cursor={'pointer'}
                  onClick={() => openFullScreen('resource-image')} 
                  id='resource-image' 
                  alt='' 
                  src={props.resourcePath} />
            </Box>
            
            <Box 
              p={5}
              className={props.style.captionContainer}>
              
              <Stack align={'center'}>
                <Text padding={0} color={'gray.500'} fontSize={'sm'} align={'center'}>
                  {props.resourceCaption}
                </Text>
              </Stack>
            </Box>
        </>
    )
};

const openFullScreen = (imageId: string) => {
    if (screenfull.isEnabled) {
        screenfull.request(document.getElementById(imageId)!);
    }
}