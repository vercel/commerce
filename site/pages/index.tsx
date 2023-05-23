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
        4630, 1239, 4988, 1357, 5219, 1668, 5214, 2045, 4983, 2366, 4634, 2470,
        4267, 2352, 4045, 2060, 4041, 1678, 4267, 1353,
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
        3904, 477, 4224, 585, 4403, 892, 4342, 1231, 4078, 1462, 3725, 1462,
        3461, 1239, 3400, 891, 3574, 595,
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
        3042, 203, 3338, 330, 3452, 617, 3343, 910, 3046, 1027, 2759, 914, 2622,
        627, 2745, 325,
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
        2288, 287, 2542, 410, 2608, 688, 2429, 914, 2137, 910, 1963, 683, 2029,
        410,
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
        1708, 542, 1939, 674, 1939, 933, 1713, 1070, 1487, 943, 1482, 669,
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
