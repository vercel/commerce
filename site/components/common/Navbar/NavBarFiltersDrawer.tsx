import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Link, Box, Stack, Heading, Divider } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import filtersData from '../../../static_data/navBarMenuData.json';
import NavBarFiltersItem from './NavBarFiltersItem';

export default function NavBarFiltersDrawer(props: { 
  onClose: () => void;
  isOpen: boolean;
}) {

    const [placement, setPlacement] = React.useState('left' as const)
    const [regions, setRegions] = React.useState<NavItem[]>([]);
    const [categories, setCategories] = React.useState<NavItem[]>([]);

    useEffect(() => {
      setRegions(filtersData.regions);
      setCategories(filtersData.categories);
    }, []);

    return (
      <>
        <Drawer placement={placement} onClose={props.onClose} isOpen={props.isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <Stack mt={5} direction={"column"} spacing={"20"}>
                <Box>
                  <Heading size={"lg"} mb={5}>Regions</Heading>
                  {
                    regions.map(region => (
                      <NavBarFiltersItem key={region.label} {...region} />
                    ))
                  }
                </Box>
                <Box>
                  <Heading mb={5} size={"lg"}>Categories</Heading>
                  {
                    categories.map(category => (
                      <NavBarFiltersItem key={category.label} {...category} />
                    ))
                  }
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
      </Drawer>
      </>
    )
  }
  
  interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
    enabled: boolean;
  };