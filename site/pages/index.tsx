import { Layout } from '@components/common'
import ImageMapper from 'react-img-mapper'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDisclosure } from '@chakra-ui/react'
import PolygonModal from '@components/common/HomePage/PolygonModal/PolygonModal'

export default function Home() {

  const imagePath = "homepageBackgroundImage.png";
  const {locale} = useRouter();

  const [mapContainerWidth, setMapContainerWidth] = useState<number | undefined>(600);
  const [innerWidth, setInnerWidth] = useState<number | undefined>(600);
  const [decadeClicked, setDecadeClicked] = useState<string>("12")

  const { isOpen, onOpen, onClose } = useDisclosure()

  const mapDefinition = {
    name: "my-map",
    areas: [
      {
        id: '12',
        title: '2000',
        name: '2000',
        fillColor: '#eab54d4d',
        strokeColor: 'black',
        coords: [4653,1231,5039,1396,5204,1622,5218,2027,5039,2315,4709,2461,4276,2339,4068,2084,4040,1679,4177,1457,4337,1325],
        shape: "poly",
        //href: `/${locale}/abruzzo/12`,
        href: "#",
      },
      {
        id: '11',
        title: '1990',
        name: '1990',
        fillColor: '#eab54d4d',
        strokeColor: 'black',
        coords: [3904,974,475],
        shape: "circle",
        //href: `/${locale}/abruzzo/12`,
        href: "#",
      },
      {
        id: '10',
        title: '1980',
        name: '1980',
        fillColor: '#eab54d4d',
        strokeColor: 'black',
        coords: [3045,611,387],
        shape: "circle",
        //href: `/${locale}/abruzzo/12`,
        href: "#",
      }
    ] 
  }

  useEffect(() => {

    // Handler to call on window resize
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  useEffect(() => {
    setMapContainerWidth(document.getElementById('mapContainer')?.clientWidth);
  }, [innerWidth]);

  return (
    <>
      <section id='mapContainer' className='w-full'>
        <div>
          <ImageMapper natural stayHighlighted onClick={area => { setDecadeClicked(area.id!); onOpen() }} parentWidth={mapContainerWidth} responsive={true} src={imagePath} map={mapDefinition}></ImageMapper>
          <PolygonModal key={decadeClicked} decade={decadeClicked} onModalClose={onClose} isOpen={isOpen} /> 
        </div>
      </section>
    </>
  )
}

Home.Layout = Layout
