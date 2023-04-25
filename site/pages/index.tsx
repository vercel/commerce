import { Layout } from '@components/common'
import ImageMapper from 'react-img-mapper'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import PolygonModal from '@components/common/HomePage/PolygonModal/PolygonModal'

export default function Home() {
  const imagePath = 'homepageBackgroundImage2.png'

  const [mapContainerWidth, setMapContainerWidth] = useState<
    number | undefined
  >(600)
  const [innerWidth, setInnerWidth] = useState<number | undefined>(600)
  const [decadeClicked, setDecadeClicked] = useState<string>('12')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const mapAreas = [
    {
      id: '12',
      title: '2000',
      name: '2000',
      fillColor: '#FF279E',
      strokeColor: 'black',
      coords: [
        4634, 1239, 4945, 1320, 5162, 1541, 5252, 1857, 5176, 2149, 4941, 2385,
        4630, 2474, 4319, 2385, 4092, 2154, 4017, 1833, 4097, 1541, 4323, 1324,
      ],
      shape: 'poly',
      href: '#',
    },
    {
      id: '11',
      title: '1990',
      name: '1990',
      fillColor: '#A12AFF',
      strokeColor: 'black',
      coords: [
        3909, 467, 4175, 549, 4363, 765, 4408, 1046, 4295, 1315, 4045, 1466,
        3763, 1470, 3515, 1302, 3402, 1048, 3447, 759, 3626, 551,
      ],
      shape: 'poly',
      href: '#',
    },
    {
      id: '10',
      title: '1980',
      name: '1980',
      fillColor: '#2C28FF',
      strokeColor: 'black',
      coords: [
        3046, 207, 3280, 289, 3430, 486, 3430, 740, 3287, 952, 3044, 1032, 2799,
        947, 2648, 740, 2646, 504, 2808, 279,
      ],
      shape: 'poly',
      href: '#',
    },
    {
      id: '9',
      title: '1970',
      name: '1970',
      fillColor: '#1A82FF',
      strokeColor: 'black',
      coords: [
        2279, 279, 2496, 356, 2616, 562, 2579, 779, 2407, 929, 2174, 929, 1995,
        779, 1958, 553, 2077, 360,
      ],
      shape: 'poly',
      href: '#',
    },
    {
      id: '8',
      title: '1960',
      name: '1960',
      fillColor: '#1ACBFF',
      strokeColor: 'black',
      coords: [
        1707, 535, 1896, 615, 1980, 809, 1897, 996, 1710, 1071, 1515, 989, 1448,
        794, 1523, 614,
      ],
      shape: 'poly',
      href: '#',
    },
  ]

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setInnerWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setMapContainerWidth(document.getElementById('mapContainer')?.clientWidth)
  }, [innerWidth])

  return (
    <>
      <section id="mapContainer" className="w-full">
        <div>
          <ImageMapper
            onClick={(area) => {
              setDecadeClicked(area.id!)
              onOpen()
            }}
            parentWidth={mapContainerWidth}
            responsive={true}
            src={imagePath}
            map={{ name: 'my-map', areas: mapAreas }}
          ></ImageMapper>
          <PolygonModal
            key={decadeClicked}
            decade={decadeClicked}
            onModalClose={onClose}
            isOpen={isOpen}
          />
        </div>
      </section>
    </>
  )
}

Home.Layout = Layout
