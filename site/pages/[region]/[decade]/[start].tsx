import { Layout } from '@components/common'
import commerce from '@lib/api/commerce'
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { Viewer } from 'photo-sphere-viewer'
import { GyroscopePlugin } from 'photo-sphere-viewer/dist/plugins/gyroscope'
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers'
import { GalleryPlugin } from 'photo-sphere-viewer/dist/plugins/gallery'
import 'photo-sphere-viewer/dist/plugins/markers.css'
import 'photo-sphere-viewer/dist/plugins/gallery.css'
import { StereoPlugin } from 'photo-sphere-viewer/dist/plugins/stereo'
import { VirtualTourPlugin } from 'photo-sphere-viewer/dist/plugins/virtual-tour'
import { VisibleRangePlugin } from 'photo-sphere-viewer/dist/plugins/visible-range'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import RegionsDataJson from '../../../static_data/navBarMenuData.json'
import MarkerCardModal from '@components/common/Room/MarkerCardModal/MarkerCardModal'
import { useDisclosure } from '@chakra-ui/react'

import decadesManifest from '../../../static_data/decadesManifest.json'
import {
  MarkerData,
  MarkerJson,
} from '@components/common/Room/RoomTypes/RoomTypes'
import { getNodes, getRecursiveMarkers } from 'workers/DecadeWorker'
import screenfull from 'screenfull'

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const decadesPaths = RegionsDataJson.regions
    .filter((region) => region.enabled)
    .flatMap((region) => {
      let regionDecadesPath = new Array<string>()
      for (let key in decadesManifest) {
        if (decadesManifest[key as keyof typeof decadesManifest].enabled) {
          Array.from(Array(7).keys()).forEach((nodeId: number) =>
            regionDecadesPath.push(region.href + '/' + key + '/' + nodeId)
          )
        }
      }
      return regionDecadesPath
    })

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a decade path for every locale
          decadesPaths.forEach((path: any) => {
            arr.push(`/${locale}${path}`)
          })
          return arr
        }, [])
      : decadesPaths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ region: string; decade: string; start: string }>) {
  const config = { locale, locales }
  let products = new Array()
  let decadeManifest = (
    await import(
      `../../../static_data/regions/${params?.region}/${params?.decade}/manifest.json`
    )
  ).rooms
  let region = params?.region
  let decade = params?.decade
  let startNode = params?.start

  //sunrise sunset api to retreive Rome rise/set times
  const sunriseSunsetAPI =
    'https://api.sunrise-sunset.org/json?lat=41.9027835&lng=12.4963655'
  const [sunriseTime, sunsetTime] = await fetch(sunriseSunsetAPI)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => data.results)
    .then((data) => [
      parseInt(data.sunrise.split(':')[0]),
      parseInt(data.sunset.split(':')[0]),
    ])
    .catch((error) => [7, 7])

  const time =
    new Date().getUTCHours() >= sunsetTime + 12 ||
    new Date().getUTCHours() <= sunriseTime
      ? 'night'
      : 'day'

  for (const roomMeta of decadeManifest) {
    let roomMarkers

    try {
      roomMarkers = await import(
        `../../../static_data/regions/abruzzo/${decade}/${time}/${
          roomMeta.filename.split('.')[0]
        }.json`
      )
    } catch (e) {
      continue
    }

    for (const productMarker of roomMarkers.markers.filter(
      (marker: MarkerJson) => marker.markerType == 'product'
    )) {
      if (
        products.find(({ product }) =>
          product.slug?.includes(productMarker.markerSource)
        )
      )
        continue

      const productPromise = commerce.getProduct({
        variables: {
          slug: productMarker.markerSource,
          withMetafields: [
            { namespace: 'custom', key: 'nazionalit_' },
            { namespace: 'custom', key: 'descrizione_tecnica' },
            { namespace: 'custom', key: 'descrizione_storica' },
          ],
        },
        config,
        preview,
      })

      products.push(await productPromise)
    }
  }

  if (!products) {
    throw new Error(`Products associated with markers not found`)
  }

  return {
    props: {
      products,
      decadeManifest,
      region,
      decade,
      startNode,
      time,
    },
    revalidate: 200,
  }
}

export default function RoomPage({
  products,
  decadeManifest,
  region,
  decade,
  startNode,
  time,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure()
  const [currentMarkerInModal, setCurrentMarkerInModal] = useState<MarkerData>()
  const [recursiveMarkers] = useState<any>(
    getRecursiveMarkers(decade!, decadeManifest, time)
  )
  const [virtualTourNodes] = useState<Array<any>>(
    getNodes(products, decadeManifest, region!, decade!, time)
  )

  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement>()
  const [isAudioInBackground, setIsAudioInBackground] = useState<boolean>(false)
  const [isNodeChanged, setIsNodeChanged] = useState<boolean>(false)

  const router = useRouter()
  const audioPlayerRef = useRef<HTMLAudioElement | undefined>(audioPlayer)

  let navbarArray = new Array(
    'autorotate',
    'zoom',
    'move',
    'markers',
    'markersList',
    'gallery',
    'stereo',
    'gyroscope',
    'fullscreen'
  )

  navbarArray = navbarArray.concat(
    recursiveMarkers.map((recursiveMarker: any) => {
      return {
        id: recursiveMarker.name,
        content: recursiveMarker.name,
        title: recursiveMarker.name,
        className: 'custom-button',
        visible: false,
        onClick: (viewer: any) => {
          changeToRecursiveRoom(recursiveMarker, viewer)
        },
      }
    })
  )

  const changeToRecursiveRoom = (recursiveMarker: any, viewer: any) => {
    const virtualTour = viewer.getPlugin(VirtualTourPlugin)
    const destNode = virtualTourNodes.find(
      (node: any) => node.name === recursiveMarker.name
    )
    virtualTour.setCurrentNode(destNode.id)
  }

  useEffect(() => {
    const shperePlayerInstance = new Viewer({
      container: 'roomViewer',
      plugins: [
        [GyroscopePlugin, StereoPlugin],
        MarkersPlugin,
        [
          GalleryPlugin,
          {
            thumbnailSize: { width: 100, height: 100 },
          },
        ],
        [
          VirtualTourPlugin,
          {
            positionMode: VirtualTourPlugin.MODE_3D,
            renderMode: VirtualTourPlugin.MODE_MARKERS,
            nodes: virtualTourNodes,
            startNodeId: startNode,
            markerStyle: {
              style: {
                color:
                  decadesManifest[decade as keyof typeof decadesManifest].color,
              },
            },
          },
        ],
      ],
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true,
      navbar: navbarArray,
    })

    const markersPlugin = shperePlayerInstance.getPlugin(MarkersPlugin)
    const virtualTourPlugin = shperePlayerInstance.getPlugin(VirtualTourPlugin)

    markersPlugin?.on('select-marker', (e, marker) => {
      if (marker.id.includes('tour-link')) {
        return
      }

      if (screenfull.isEnabled) {
        screenfull.exit()
      }

      if (marker.data.markerType === 'room') {
        virtualTourPlugin?.setCurrentNode(
          decadeManifest.find(
            (room: any) =>
              room.name === marker.data.markerPayload.resourceSource
          ).id
        )
        return
      }

      setCurrentMarkerInModal(marker.data)
      onOpenModal()
    })

    virtualTourPlugin?.on('node-changed', (e, nodeId, data) => {
      setIsNodeChanged(true)
      recursiveMarkers.forEach((recursive: any) =>
        shperePlayerInstance.navbar.getButton(recursive.name).hide()
      )
      const originNode = virtualTourNodes.find(
        (node: any) => node.id === nodeId
      )
      const originRoom = recursiveMarkers.find((recursive: any) =>
        originNode.panorama.includes(recursive.panorama)
      )
      if (originRoom != undefined) {
        shperePlayerInstance.navbar.getButton(originRoom.name).show()
      }
    })

    router.events.on('routeChangeStart', () => {
      if (audioPlayerRef.current && !audioPlayerRef.current?.paused) {
        audioPlayerRef.current!.pause()
        audioPlayerRef.current!.src = ''
      }
    })

    // unmount component instructions
    return () => {
      shperePlayerInstance.destroy()
      router.events.off('routeChangeStart', () => {
        if (audioPlayerRef.current && !audioPlayerRef.current?.paused) {
          audioPlayerRef.current!.pause()
          audioPlayerRef.current!.src = ''
        }
      })
    }
  }, [])

  useEffect(() => {
    if (isAudioInBackground === true) {
      setTimeout(() => {
        audioPlayer!.play()
      }, 500)
      setTimeout(() => {
        audioPlayer?.pause()
        setIsAudioInBackground(false)
      }, (audioPlayer!.duration - audioPlayer!.currentTime) * 1000)
    }
  }, [isAudioInBackground])

  useEffect(() => {
    if (
      currentMarkerInModal != undefined &&
      currentMarkerInModal.markerType === 'video' &&
      !audioPlayer?.paused
    ) {
      audioPlayer?.pause()
    }
  }, [currentMarkerInModal])

  const onAudioPlay = (player: HTMLAudioElement) => {
    if (!audioPlayer?.paused) {
      audioPlayer?.pause()
    }
    setAudioPlayer(player)
  }

  useEffect(() => {
    audioPlayerRef.current = audioPlayer
  }, [audioPlayer])

  useEffect(() => {
    if (isNodeChanged && !audioPlayer?.paused) {
      audioPlayer?.pause()
      setIsNodeChanged(false)
    }
  }, [isNodeChanged])

  return (
    <>
      {currentMarkerInModal != undefined ? (
        currentMarkerInModal.markerType === 'audio' ? (
          <MarkerCardModal
            decade={decade!}
            marker={currentMarkerInModal}
            onModalClose={onCloseModal}
            isOpen={isOpenModal}
            onAudioPlayerPause={() => setIsAudioInBackground(true)}
            onAudioPlayerPlay={onAudioPlay}
          />
        ) : (
          <MarkerCardModal
            decade={decade!}
            marker={currentMarkerInModal}
            onModalClose={onCloseModal}
            isOpen={isOpenModal}
          />
        )
      ) : (
        <></>
      )}
      <div style={{ height: '90vh' }} id="roomViewer" />
    </>
  )
}

RoomPage.Layout = Layout
