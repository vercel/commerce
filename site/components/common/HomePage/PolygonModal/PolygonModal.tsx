import { 
    Modal, 
    ModalOverlay, 
    ModalContent,  
    ModalBody,
    Box, 
} from "@chakra-ui/react"

import decadesManifest from '../../../../static_data/decadesManifest.json';
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ImageMapper from "react-img-mapper"

export default function MarkerCardModal(props: {
    isOpen: boolean,
    onModalClose: () => void,
    decade: string,
}) {

  const {locale} = useRouter();
  const containerRef = useRef<any>();

  const decadeColor = decadesManifest[props.decade as keyof typeof decadesManifest].color;

  const [width, setWidth] = useState(200);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false)

  const [mapDefinition, setMapDefinition] = useState<any>() 

    const getContainerSize = () => {
      if(containerRef.current != undefined) {
        setWidth(containerRef.current.clientWidth);
      }
    };

    const getMapDefinition = async () => {
      const tempMapDefinition = await import("../../../../static_data/regions/abruzzo/" + props.decade + "/plan/manifest.json")
      tempMapDefinition.areas.forEach((area: any) => {
        area.href = "/" + locale + area.href
      })
      setMapDefinition(tempMapDefinition)
    }

    useEffect(() => {
      getContainerSize()
    }, [isMapLoaded]);

    useEffect(() => {
      getMapDefinition()
      return window.addEventListener("resize", getContainerSize);
    }, []);

    return (
      <>
        <Modal onClose={props.onModalClose} isOpen={props.isOpen} isCentered>
          <ModalOverlay />
          <ModalContent rounded={"lg"}>
            <ModalBody rounded={"lg"} style={{background: 'linear-gradient(120deg, ' + decadeColor + ' 0%, #000000 130%)'}} p={5}>
              <Box
                w={'full'}
                ref={containerRef}
                >
                  <ImageMapper onLoad={() => setIsMapLoaded(true)} natural stayHighlighted responsive={true} parentWidth={width} map={mapDefinition} src={"/regions/abruzzo/" + props.decade + "/plan/plan.jpeg"}></ImageMapper>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
  