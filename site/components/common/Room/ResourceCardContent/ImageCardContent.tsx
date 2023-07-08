import { Box, Stack, Text } from "@chakra-ui/react";
import "./ImageCardContent.module.css"
import screenfull from "screenfull";
import Image from "next/image";

export default function ImageCardContent(props: {
    style: any
    resourcePath: string
    resourceCaption: string
  }) { 

    return (
        <>
          <Box
            position={"relative"}
            margin={"auto"}
            cursor={'pointer'}
            w={'full'}
            height={"220px"}
            >
              <Image 
                objectFit={"cover"} 
                layout={"fill"}
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