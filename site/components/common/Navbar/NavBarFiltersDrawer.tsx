import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Link,
  Box,
  Stack,
  Heading,
  Divider,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import filtersData from '../../../static_data/navBarMenuData.json'
import NavBarFiltersItem from './NavBarFiltersItem'

export default function NavBarFiltersDrawer(props: {
  onClose: () => void
  isOpen: boolean
}) {
  const { locale = 'it' } = useRouter()

  const [placement, setPlacement] = React.useState('left' as const)
  const [regions, setRegions] = React.useState<NavItem[]>([])
  const [categories, setCategories] = React.useState<NavItem[]>([])

  useEffect(() => {
    setRegions(filtersData.regions)
    setCategories(
      filtersData.categories[locale as keyof typeof filtersData.categories]
    )
  }, [])

  return (
    <>
      <Drawer
        placement={placement}
        onClose={props.onClose}
        isOpen={props.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Stack mt={5} direction={'column'} spacing={'20'}>
              <Box>
                <Heading mb={5} size={'lg'}>
                  {locale === 'it' ? 'Categorie' : 'Categories'}
                </Heading>
                {categories.map((category) => (
                  <NavBarFiltersItem key={category.label} {...category} />
                ))}
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
  enabled: boolean
}
