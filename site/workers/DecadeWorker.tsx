import { MarkerJson } from "@components/common/Room/RoomTypes/RoomTypes"
import decadesManifest from "../static_data/decadesManifest.json";

export const prepareMarkers = (products: Array<any>, decade: string, roomFilename: string, time: string) => {

    let roomMarkers
  
    try {
      roomMarkers = require('../static_data/regions/abruzzo/' + decade + '/' + time + '/' + roomFilename.split('.')[0] + '.json');
    } catch (e) {
      return new Array()
    }
  
    return roomMarkers.markers.filter((marker: MarkerJson) => marker.markerType != 'room').map((marker: MarkerJson, index: number) => {

        const product = marker.markerType == 'product' ? products.find(({product}) => product.slug?.includes(marker.markerSource)).product 
          : undefined;
        
        return {
            id: index.toString(),
            longitude: marker.longitude,
            latitude: marker.latitude,
            image: "/assets/polygons/" + (marker.markerType == "product" ? "colorized/" : "") + decade + ".svg",
            width: 50,
            height: 50,
            anchor: "bottom center",
            tooltip: marker.markerType == 'product' ? product.name : marker.resourceName,
            data: {
              markerType: marker.markerType,
              markerPayload: marker.markerType == 'product' ? product : {
                resourceType: marker.markerType,
                resourceSource: marker.markerSource,
                resourceName: marker.markerType,
                resourceCaption: marker.resourceCaption ? marker.resourceCaption : marker.resourceName
              }
            }
        }
    });
}
  
export const getRecursiveMarkers = (decade: string, roomsManifest: Array<any>, time: string) => {
    
    const recursiveMarkers = new Array()
    
    roomsManifest.forEach(roomMeta => {
  
      let roomMarkers
  
      try {
        roomMarkers = require('../static_data/regions/abruzzo/' + decade + '/' + time + '/' + roomMeta.filename.split('.')[0] + '.json');
      } catch (e) {
        return  
      }
    
      roomMarkers.markers.filter((marker: MarkerJson) => marker.markerType === 'room').forEach((marker: MarkerJson, index: number) => {
        recursiveMarkers.push({
            panorama: roomMeta.filename,
            source: marker.markerSource,
            name: marker.resourceName
        })
      })
    })
  
    return recursiveMarkers
}
  
export const getNodes = (products: Array<any>, roomsManifest: Array<any>, region: string, decade: string, time: string) => {
    
    return roomsManifest.map(roomMeta => {
      
      let panoramaPath = '/regions/' + region + '/' + decade + '/' + time + '/' + roomMeta.filename; 
  
      return {
        id: roomMeta.id,
        panorama: panoramaPath,
        thumbnail: panoramaPath,
        name: roomMeta.name,
        links: roomMeta.links,
        markers: prepareMarkers(products, decade, roomMeta.filename, time)
      }
    });
}