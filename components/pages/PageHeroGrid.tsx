'use client'

import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { get } from 'lodash-es'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function PageHeroGrid({
  title,
  description,
  imageSrcs,
  imageStyles,
  type,
  buyNowLink,
  buyNowText,
}: {
  title: React.ReactNode
  description: React.ReactNode
  imageSrcs: string[] | StaticImageData[]
  imageStyles?: Array<React.CSSProperties | null>
  type?: '4-image' | '6-image' | '1-image'
  buyNowLink?: string
  buyNowText?: string
}) {
  if (type === '1-image') {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-7xl pt-12 px-4 sm:px-6 lg:px-8 mb-8"
      >
        <div className="relative isolate overflow-hidden shadow-2xl rounded-2xl bg-gray-900">
          <div className="relative isolate overflow-hidden bg-gray-900">
            <div className="mx-auto px-6 pt-10 lg:pb-24 sm:pb-8 lg:flex lg:py-40 lg:pt-20 lg:px-8 flex">
              <div className="lg:mx-0 lg:pt-8 lg:pl-12 pl-6 max-w-none md:max-w-[46%]">
                <motion.h1
                  className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl"
                  variants={fadeInUp}
                  transition={{ delay: 0.1, duration: 1.2 }}
                >
                  {title}
                </motion.h1>

                <motion.div
                  className="mt-6 text-lg leading-8 text-gray-300 lg:max-w-md"
                  variants={fadeInUp}
                  transition={{ delay: 0.2, duration: 1.2 }}
                >
                  {description}
                </motion.div>

                {buyNowLink && (
                  <motion.div
                    className="mt-10"
                    variants={fadeInUp}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    <Link
                      href={buyNowLink || ''}
                      className="inline-flex items-center gap-x-1.5 rounded-[24px] px-6 py-3 text-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white bg-white text-black shadow-sm hover:bg-gray-200"
                    >
                      {buyNowText || 'Buy Now'}
                      <ArrowRightIcon
                        className="-mr-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div
            className="relative md:absolute md:top-0 md:left-1/2 w-full md:w-1/2 h-80 md:h-full mt-10 md:mt-0"
            style={{
              backgroundImage: `url(${
                typeof imageSrcs?.[0] === 'string'
                  ? imageSrcs?.[0]
                  : imageSrcs?.[0]?.src || ''
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="block md:hidden absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gray-900" />
          </div>

          <div className="hidden md:block absolute top-0 left-1/2 w-96 h-full bg-gradient-to-r from-gray-900" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 1 }}
      className="mx-auto max-w-7xl pt-12 px-4 sm:px-6 lg:px-8 mb-8"
    >
      <div className="relative isolate overflow-hidden shadow-2xl rounded-2xl">
        <div className="relative isolate overflow-hidden bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 pt-10 lg:pb-24 sm:pb-8 lg:flex lg:py-40 lg:pt-20 lg:px-8">
            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 lg:pl-12 pl-6">
              <motion.h1
                className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl"
                variants={fadeInUp}
                transition={{ delay: 0.1, duration: 1.2 }}
              >
                {title}
              </motion.h1>

              <motion.div
                className="mt-6 text-lg leading-8 text-gray-300 lg:max-w-md"
                variants={fadeInUp}
                transition={{ delay: 0.2, duration: 1.2 }}
              >
                {description}
              </motion.div>

              {buyNowLink && (
                <motion.div
                  className="mt-10"
                  variants={fadeInUp}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  <Link
                    href={buyNowLink || ''}
                    className="inline-flex items-center gap-x-1.5 rounded-[24px] px-6 py-3 text-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white bg-white text-black shadow-sm hover:bg-gray-200"
                  >
                    {buyNowText || 'Buy Now'}
                    <ArrowRightIcon
                      className="-mr-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              )}
            </div>

            <div className="lg:absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-16 sm:translate-x-0 pageHeroGrid__wrapper">
              <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8 pageHeroGrid__images">
                <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                      src={imageSrcs[0] || ''}
                      alt=""
                      style={get(imageStyles, 0) || undefined}
                    />
                  </div>

                  <div
                    className="mt-8 flex-shrink-0 sm:mt-0"
                    style={{ textAlign: 'right', marginLeft: '4rem' }}
                  >
                    <Image
                      className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                      src={imageSrcs[1] || ''}
                      alt=""
                      style={
                        {
                          opacity: 0.6,
                          width: '14rem',
                          height: '16rem',
                          WebkitMaskImage:
                            'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
                          ...get(imageStyles, 1),
                        } as any
                      }
                    />
                  </div>
                </div>

                <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                      src={imageSrcs[2] || ''}
                      alt=""
                      style={
                        {
                          opacity: 0.6,
                          width: '14rem',
                          height: '16rem',
                          WebkitMaskImage:
                            'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
                          ...get(imageStyles, 2),
                        } as any
                      }
                    />
                  </div>

                  <div className="mt-8 flex-shrink-0 sm:mt-0">
                    <Image
                      className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                      src={imageSrcs[3] || ''}
                      alt=""
                      style={get(imageStyles, 3) || undefined}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
