import {
  Flex,
  Box,
  Image,
  Heading,
  Divider,
  Text,
  Stack,
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Product } from '@commerce/types'

import style from './ProductCardRoomStyle.module.css'

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
        <Image
          className={style.flagIcon}
          src={
            'http://purecatamphetamine.github.io/country-flag-icons/3x2/' +
            nationOrigin +
            '.svg'
          }
          alt={`Picture of Flag`}
          rounded={'lg'}
        />

        <Image
          className={style.decadeIcon}
          src={'/assets/polygons/colorized/' + props.decade + '.svg'}
          alt={`Picture of Decade`}
        />

        <Box className={style.imageContainer} w={'full'} height={'220px'}>
          <NextLink href={'/product/' + props.product.slug} passHref>
            <Link style={{ textDecoration: 'none', height: 'inherit' }}>
              <Image
                src={props.product.images[0].url}
                objectFit={'cover'}
                margin={'auto'}
                height={'inherit'}
              />
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
            {historicDescription.split('\n').map((line, index) => (
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
