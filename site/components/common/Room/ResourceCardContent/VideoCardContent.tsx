import { Box, Stack, Image, Text } from '@chakra-ui/react'

export default function VideoCardContent(props: {
  style: any
  resourcePath: string
  resourceCaption: string
}) {
  return (
    <>
      <Box className={props.style.imageContainer} w={'full'} height={'220px'}>
        <video
          style={{ width: 'inherit', height: 'inherit' }}
          controls
          playsInline
        >
          <source src={props.resourcePath} type="video/mp4" />
        </video>
      </Box>

      <Box p={5} className={props.style.captionContainer}>
        <Stack mt={6} align={'center'}>
          <Text padding={0} color={'gray.500'} fontSize={'sm'} align={'center'}>
            {props.resourceCaption}
          </Text>
        </Stack>
      </Box>
    </>
  )
}
