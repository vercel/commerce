import {
    Flex,
    Box,
    Image,
    useColorModeValue,
    Stack,
    Heading,
    Text,
    Center
  } from '@chakra-ui/react';
  import usePrice from '@framework/product/use-price'
  
import type { Product } from '@commerce/types/product'
import { ImageProps } from 'next/image'
import ProductTag from '../ProductTag'
import { FC } from 'react';

  interface Props {
    product: Product
    imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  }
  
  const ProductCardExtended: FC<Props> =({
    product,
    imgProps
  }) => {

    const { price } = usePrice({
        amount: product.price.value,
        baseAmount: product.price.retailPrice,
        currencyCode: product.price.currencyCode!,
      })

      const placeholderImg = '/product-img-placeholder.svg';
      const IMAGE = product.images[0]?.url || placeholderImg

    return (
        <Center>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            >
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={IMAGE}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Brand
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              Nice Chair, pink
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'}>
                $57
              </Text>
              <Text textDecoration={'line-through'} color={'gray.600'}>
                $199
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  }
  
  export default ProductCardExtended;