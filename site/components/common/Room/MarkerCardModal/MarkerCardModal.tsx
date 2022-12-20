import { 
    Modal, 
    ModalOverlay, 
    ModalContent,  
    ModalBody, 
} from "@chakra-ui/react"
import { Product } from "@commerce/types"
import ProductCardRoom from "../../../product/ProductCardRoom/ProductCardRoom"

import decadesManifest from '../../../../static_data/decadesManifest.json';
import ResourceCardModal from "@components/common/Room/ResourceCardModal/ResourceCardModal";
import { MarkerData, MarkerResourcePayload } from "../RoomTypes/RoomTypes";

export default function MarkerCardModal(props: {
    isOpen: boolean,
    onModalClose: () => void,
    marker: MarkerData,
    decade: string,
    onAudioPlayerPlay?: (player: HTMLAudioElement) => void,
    onAudioPlayerPause?: () => void
}) {

    const decadeColor = decadesManifest[props.decade as keyof typeof decadesManifest].color;

    const getCardToRender = (markerType: string) => {
      switch(markerType) {
        case "product":
          return <ProductCardRoom decade={props.decade} product={props.marker.markerPayload as Product.Product} />
        case "image":
        case "video":
          return <ResourceCardModal decade={props.decade} resourcePayload={props.marker.markerPayload as MarkerResourcePayload} />
        case "audio":
          return <ResourceCardModal decade={props.decade} resourcePayload={props.marker.markerPayload as MarkerResourcePayload} 
            onAudioPlay={props.onAudioPlayerPlay!} onAudioPause={props.onAudioPlayerPause!} onModalClose={props.onModalClose} />
      }
    }

    return (
      <>
        <Modal onClose={props.onModalClose} isOpen={props.isOpen} isCentered>
          <ModalOverlay />
          <ModalContent rounded={"lg"}>
            <ModalBody rounded={"lg"} style={{background: 'linear-gradient(120deg, ' + decadeColor + ' 0%, #000000 130%)'}} p={5}>
              {
                getCardToRender(props.marker.markerType)
              }
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
  