import type { Client } from '@spree/storefront-api-v2-sdk'
import SpreeSdkMethodFromEndpointPathError from '../errors/SpreeSdkMethodFromEndpointPathError'
import { SpreeSdkMethod } from '../types'

const getSpreeSdkMethodFromEndpointPath = <
  ExactSpreeSdkClientType extends Client
>(
  client: ExactSpreeSdkClientType,
  path: string
) => {
  const pathParts = path.split('.')
  const reachedPath: string[] = []
  let node = <Record<string, unknown>>client

  console.log(`Looking for ${path} in Spree Sdk.`)

  while (reachedPath.length < pathParts.length - 1) {
    const checkedPathPart = pathParts[reachedPath.length]
    const checkedNode = node[checkedPathPart]

    console.log(`Checking part ${checkedPathPart}.`)

    if (typeof checkedNode !== 'object') {
      throw new SpreeSdkMethodFromEndpointPathError(
        `Couldn't reach ${path}. Farthest path reached was: ${reachedPath.join(
          '.'
        )}.`
      )
    }

    if (checkedNode === null) {
      throw new SpreeSdkMethodFromEndpointPathError(
        `Path ${path} doesn't exist.`
      )
    }

    node = <Record<string, unknown>>checkedNode
    reachedPath.push(checkedPathPart)
  }

  if (
    reachedPath.length !== pathParts.length - 1 ||
    typeof node[pathParts[reachedPath.length]] !== 'function'
  ) {
    throw new SpreeSdkMethodFromEndpointPathError(
      `Couldn't reach ${path}. Farthest path reached was: ${reachedPath.join(
        '.'
      )}.`
    )
  }

  return (...args: any[]) =>
    (node[pathParts[reachedPath.length]] as SpreeSdkMethod)(...args)
}

export default getSpreeSdkMethodFromEndpointPath
