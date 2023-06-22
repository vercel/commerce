import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons'
import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Layout } from '@components/common'
import { Text as TextUI } from '@components/ui'
import { useRouter } from 'next/router'

export default function Contact() {
  const { locale } = useRouter()

  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <Box textAlign="center" mb={'10'}>
        <TextUI className="mb-5" variant="heading">
          {locale == 'it' ? 'Contatti' : 'Contact Us'}
        </TextUI>
        <TextUI className="">
          {locale == 'it'
            ? 'Puoi contattarci usando i recapiti che trovi qui sotto!'
            : 'You can contact us using the contact details below!'}
        </TextUI>
      </Box>
      <SimpleGrid columns={2} spacing="24px">
        <Box textAlign="center" py={2}>
          <AtSignIcon boxSize={'40px'} color={'orange.300'} />
          <Text fontWeight={'bold'} fontSize="18px" mt={3} mb={2}>
            <a href="mailto:safaraecommerce@protonmail.com">
              safaraecommerce@protonmail.com
            </a>
          </Text>
        </Box>
        <Box textAlign="center" py={2}>
          <PhoneIcon boxSize={'40px'} color={'orange.300'} />
          <Text fontWeight={'bold'} fontSize="18px" mt={3} mb={2}>
            <a href="tel:+393391630349">+39 339 163 0349</a>
          </Text>
        </Box>
      </SimpleGrid>
    </div>
  )
}

Contact.Layout = Layout
