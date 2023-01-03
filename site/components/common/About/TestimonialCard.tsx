import { ReactNode } from 'react'
import {
  Box,
  Heading,
  Text,
  Stack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>
}

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      alignItems={'center'}
      justifyContent={'center'}
      display={'flex'}
      w={'md'}
      height={'130px'}
    >
      {children}
    </Box>
  )
}

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  )
}

export default function MessageMap() {
  const { locale = 'it' } = useRouter()

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>
            {locale == 'it' ? 'I Nostri Motti' : 'Our Catchphrases'}
          </Heading>
          <Text>
            {locale == 'it'
              ? 'Quello per cui lavoriamo ogni giorno...'
              : 'What we work for every day...'}
          </Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
          justifyContent={'center'}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                {locale == 'it'
                  ? 'Safara. Il sentiero che ci ha portato qui!'
                  : 'Safara. the path that led us here!'}
              </TestimonialHeading>
            </TestimonialContent>
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                {locale == 'it'
                  ? 'Safara espone e vende i tuoi pezzi di storia... e nel frattempo fa cultura, intrattenimento'
                  : 'Safara exposes and sells your pieces of history... and meanwhile does culture, entertainment'}
              </TestimonialHeading>
            </TestimonialContent>
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  )
}
