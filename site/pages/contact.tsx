import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Layout } from '@components/common'
import { Text as TextUI } from '@components/ui'

export default function Contact() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <TextUI className='mb-5' variant="heading">Contatti</TextUI>
      <TextUI className="">
        Puoi contattarci usando i recapiti che trovi qui sotto...
      </TextUI>
      <Stack direction={['column', 'row']} spacing='24px'>
        <Box textAlign="center" py={10} px={6}>
          <AtSignIcon boxSize={'40px'} color={'orange.300'} />
          <Text fontWeight={"bold"} fontSize="18px" mt={3} mb={2}>
            <a href= "mailto:safaraecommerce@protonmail.com">safaraecommerce@protonmail.com</a>
          </Text>
        </Box>
        <Box textAlign="center" py={10} px={6}>
          <PhoneIcon boxSize={'40px'} color={'orange.300'} />
          <Text fontWeight={"bold"} fontSize="18px" mt={3} mb={2}>
            <a href="tel:+390123456789">+39 3923790948</a>
          </Text>
        </Box>
      </Stack>
    </div>
  )
}

Contact.Layout = Layout
