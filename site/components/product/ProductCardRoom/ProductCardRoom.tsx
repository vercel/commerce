import {
  Flex,
  Box,
  Heading,
  Divider,
  Text,
  Stack,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Product } from '@commerce/types'

import style from './ProductCardRoomStyle.module.css'
import Image from 'next/image'

export default function ProductCardRoom(props: {
  product: Product.Product
  decade: string
}) {
  let historicDescription =
    props.product.metafields!.custom.descrizione_storica.value
  let technicalDescription =
    props.product.metafields!.custom.descrizione_tecnica.value
  let nationOrigin = props.product.metafields!.custom.nazionalit_.value

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      direction={'row'}
    >
      <Box
        maxW={'445px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        className={style.cardBody}
      >

        <Box 
          position={"absolute"}
          margin={"5px"} 
          top={"0"} 
          right={"0"} 
          height={"40px"}
          width={"40px"}
          rounded={"lg"}
          zIndex={'overlay'}>
          <Image
            className={style.flagIcon}
            src={
              '/flags/' +
              nationOrigin +
              '.svg'
            }
            alt={`Picture of Flag`}
            layout={"fill"}
            
          />
        </Box>

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
            src={'/assets/polygons/colorized/' + props.decade + '.svg'}
            alt={`Picture of Decade`}
            layout={"fill"}
          />
        </Box>
        

        <Box position={"relative"} className={style.imageContainer} w={'full'} height={'220px'}>
          <NextLink href={'/product/' + props.product.slug} passHref>
            <Link style={{ textDecoration: 'none', height: 'inherit'}}>
              <Box height={'inherit'} margin={"auto"}>
                <Image
                  src={props.product.images[0].url}
                  layout={"fill"}
                  alt={"Product Image"}
                  objectFit={"contain"}
                />
              </Box>
              
            </Link>
          </NextLink>
        </Box>

        <Box p={5} className={style.captionContainer}>
          <Stack align={'center'}>
            <Heading
              fontSize={'2xl'}
              textAlign={'center'}
              fontFamily={'body'}
              fontWeight={500}
            >
              {props.product.name}
            </Heading>
          </Stack>

          <Stack mt={6} align={'center'}>
            <Divider borderColor={'blackAlpha.600'} />
            {historicDescription.split('\n').map((line: any, index: any) => (
              <Text
                key={index}
                padding={0}
                color={'gray.500'}
                fontSize={'sm'}
                align={'center'}
              >
                {line}
              </Text>
            ))}
            <Divider borderColor={'blackAlpha.600'} />
            <Text color={'gray.500'} fontSize={'sm'} align={'center'}>
              {technicalDescription}
            </Text>
          </Stack>
        </Box>
      </Box>
    </Flex>
  )
}
