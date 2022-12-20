import { Box, Stack, Image, Text } from "@chakra-ui/react";
import screenfull from "screenfull";

export default function ImageCardContent(props: {
    style: any
    resourcePath: string
    resourceCaption: string
  }) { 

    return (
        <>
            <Box
              className={props.style.imageContainer}
              w={'full'}
              height={'220px'}
              >
                
                <Image cursor={'pointer'} onClick={() => openFullScreen('resource-image')} id='resource-image' alt='Resource Image Not Found' src={props.resourcePath} />
            
            </Box>
            
            <Box 
              p={5}
              className={props.style.captionContainer}>
              
              <Stack mt={6} align={'center'}>
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