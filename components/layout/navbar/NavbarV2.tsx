'use client'

import { FC, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import UserNav from '../UserNav'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

import { Fragment, useState } from 'react'
import { Dialog, Tab, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

// Product data
import { GLOVES_DATA } from '@/data/Gloves'
import { INDUSTRIAL_DATA } from '@/data/Industrial'
import CartModal from '@/components/cart/modal'

let _scrollTopValue: number | null = null

const navigation = {
  pages: [
    { name: 'Industrial', href: '/collections/industrial' },
    { name: 'Abrasive', href: '/collections/abrasives' },
    { name: 'Adhesive', href: '/collections/adhesives' },
    { name: 'Gloves', href: '/collections/gloves' },
    {
      name: 'Oscillating Accessories',
      href: '/collections/oscillating-accessories',
    },
  ],
}

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const NAVIGATION = [
  {
    category: 'Industrial',
    link: '/collections/industrial',
    // hidden: true,
    subMenus: [
      {
        name: 'Warehouse Racks',
        link: '/collections/industrial/warehouse-racks',
        image: INDUSTRIAL_DATA.WAREHOUSE_RACKS.navbarImage,
      },
      {
        name: 'Fences',
        link: '/collections/industrial/fences',
        image: INDUSTRIAL_DATA.FENCES.navbarImage,
      },
      {
        name: 'Pallet Trucks & Forklifts',
        link: '/collections/industrial/pallet-trucks-forklifts',
        image: INDUSTRIAL_DATA.FORKLIFTS.navbarImage,
      },
      {
        name: 'Warehouse Accessories',
        link: '/collections/industrial/warehouse-accessories',
        image: INDUSTRIAL_DATA.WAREHOUSE_ACCESSORIES.navbarImage,
      },
    ],
  },
  {
    category: 'Abrasives',
    link: '/collections/abrasives',
    subMenus: [
      {
        name: 'Cut off Discs',
        link: '/collections/abrasives/cut-off-discs',
        image: 'https://linconson-a.netlify.app/Abrasive.jpg',
      },
      {
        name: 'Flap Discs',
        link: '/collections/abrasives/flap-discs',
        image: 'https://linconson-a.netlify.app/flap.jpg',
      },
      {
        name: 'Grinding Wheels',
        link: '/collections/abrasives/metal-grinding-wheel',
        image: '/assets/navbar/grinding_wheel.jpeg',
      },
      {
        name: 'Sanding Discs',
        link: '/collections/abrasives/sanding-discs',
        image: '/assets/navbar/sanding_disc.jpeg',
      },
    ],
  },
  {
    category: 'Adhesives',
    link: '/collections/adhesives',
    subMenus: [
      {
        name: 'Grip Tape',
        link: '/collections/adhesives/grip-tape',
        // image: 'https://linconson-a.netlify.app/gtape.jpg',
        image: '/assets/navbar/grip_tape.jpeg',
      },
      {
        name: 'Tread Tape',
        link: '/collections/adhesives/tread-tape',
        image: '/assets/navbar/tread_tape.jpg',
      },
      {
        name: 'Carpet Tread',
        link: '/collections/adhesives/carpet-tread',
        image: '/assets/navbar/carpet_tread.jpg',
      },
    ],
  },
  {
    category: 'Gloves',
    link: '/collections/gloves',
    subMenus: [
      {
        name: 'Latex foam',
        link: '#latex-foam',
        image: GLOVES_DATA.LATEX_FOAM.navbarImage,
      },
      {
        name: 'Wrinkled Foam',
        link: '#wrinkled-foam',
        image: GLOVES_DATA.WRINKLED_FOAM.navbarImage,
      },
      {
        name: 'PU Coated',
        link: '#pu-coated',
        image: GLOVES_DATA.PU_COATED.navbarImage,
      },
      {
        name: 'PU Cut-resistant',
        link: '#pu-cut-resistant',
        image: GLOVES_DATA.PU_CUT_RESISTANT.navbarImage,
      },
      {
        name: 'Nitrile Cut-resistant',
        link: '#nitrile-cut-resistant',
        image: GLOVES_DATA.NITRILE_CUT_RESISTANT.navbarImage,
      },
      {
        name: 'Latex Cut-resistant',
        link: '#latex-cut-resistant',
        image: GLOVES_DATA.LATEX_CUT_RESISTANT.navbarImage,
      },
      {
        name: 'Nitrile Coated',
        link: '#nitrile-coated',
        image: GLOVES_DATA.NITRILE_COATED.navbarImage,
      },
      {
        name: 'Spandex',
        link: '#spandex',
        image: GLOVES_DATA.SPANDEX.navbarImage,
      },
      {
        name: 'Cotton Latex',
        link: '#cotton-latex',
        image: GLOVES_DATA.COTTON_LATEX.navbarImage,
      },
      {
        name: 'Winter',
        link: '#winter',
        image: GLOVES_DATA.WINTER.navbarImage,
      },
      {
        name: 'Leather',
        link: '#leather',
        image: GLOVES_DATA.LEATHER.navbarImage,
      },
    ],
  },
  {
    category: 'Oscillating Accessories',
    link: '/collections/oscillating-accessories',
  },
]

const Navbar: FC<NavbarProps> = ({ links }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const correspondingNavItem = useMemo(
    () =>
      isMounted
        ? NAVIGATION.find((_item) => pathname?.includes(_item.link))
        : null,
    [pathname, isMounted],
  )

  const correspondingNavSubMenu = useMemo(() => {
    if (!isMounted) return null
    if (correspondingNavItem && Array.isArray(correspondingNavItem.subMenus)) {
      return (correspondingNavItem.subMenus as object[]).find((subMenu: any) =>
        pathname?.includes(subMenu.link),
      )
    }
  }, [correspondingNavItem, pathname, isMounted])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isHomePage = useMemo(
    () => isMounted && pathname === '/',
    [pathname, isMounted],
  )

  /*
   * Fixed nav positioning
   */
  const headerRef = useRef<HTMLElement>(null)
  const [showNav, setShowNav] = useState(true)
  const trackScrolling = () => {
    if (typeof window !== 'undefined') {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      if (
        (_scrollTopValue === null || scrollTop > _scrollTopValue) &&
        scrollTop > 400
      ) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }

      _scrollTopValue = scrollTop <= 0 ? 0 : scrollTop
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', trackScrolling, { passive: true })

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', trackScrolling, { passive: true })
    }
  }, [])

  return (
    <>
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {/* {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))} */}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {/* {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-12 px-4 py-6"
                      >
                        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative">
                              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block text-sm font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p
                                aria-hidden="true"
                                className="mt-1 text-sm text-gray-500"
                              >
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))} */}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        onClick={(e) => {
                          setMobileMenuOpen(false)
                        }}
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* 
                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create an account
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                </div> */}

                {/* <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <form>
                    <div className="inline-block">
                      <label htmlFor="mobile-currency" className="sr-only">
                        Currency
                      </label>
                      <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                        <select
                          id="mobile-currency"
                          name="currency"
                          className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                        >
                          {currencies.map((currency) => (
                            <option key={currency}>{currency}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                          <ChevronDownIcon
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Navigation */}
      <header className={`main ${!showNav ? 'is-hidden' : ''}`} ref={headerRef}>
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6">
                {/* <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Sign in
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Create an account
                </a> */}
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div
            className="backdrop-blur-md backdrop-filter"
            style={{
              // backgroundColor: isHomePage ? undefined : '#192231',
              border: isHomePage
                ? '1px solid rgb(166 180 204 / 21%)'
                : '1px solid rgb(166 180 204 / 15%)',
              borderRight: 'none',
              borderLeft: 'none',
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <Link href="/">
                      <span className="sr-only">Linconson</span>

                      <Image
                        className="h-8 w-auto"
                        src={
                          pathname?.indexOf('/collections/industrial') === 0
                            ? '/logo-industrial.png'
                            : '/logo.png'
                        }
                        width="100"
                        height="30"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    <div className="flex h-full justify-center space-x-8">
                      {NAVIGATION.map((menuContent) => (
                        <Link
                          key={menuContent.category}
                          href={menuContent.link}
                          className={`flex items-center text-sm font-medium text-white ${
                            correspondingNavItem
                              ? menuContent.link.includes(
                                  correspondingNavItem.link,
                                )
                                ? ''
                                : 'text-opacity-50'
                              : ''
                          }`}
                        >
                          {menuContent.category}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 p-2 text-white"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <Link href="/search" className="ml-2 p-2 text-white">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  {/* Logo (lg-) */}
                  <Link href="/" className="lg:hidden">
                    <span className="sr-only">Linconson</span>

                    <Image
                      className="h-8 w-auto"
                      src={
                        pathname?.indexOf('/collections/industrial') === 0
                          ? '/logo-industrial.png'
                          : '/logo.png'
                      }
                      width="100"
                      height="30"
                      alt=""
                    />
                  </Link>

                  <div className="flex flex-1 items-center justify-end">
                    <Link
                      href="/search"
                      className="hidden text-sm font-medium text-white lg:flex items-center"
                    >
                      Search
                      <MagnifyingGlassIcon
                        className="h-4 w-4 ml-2"
                        aria-hidden="true"
                      />
                    </Link>

                    <div className="flex items-center lg:ml-8">
                      {/* Help */}
                      <Link
                        href="/contact-us"
                        className="p-2 text-white lg:hidden"
                      >
                        <span className="sr-only">Help</span>

                        <QuestionMarkCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Link>

                      <Link
                        href="/contact-us"
                        className="hidden text-sm font-medium text-white lg:block"
                      >
                        Help
                      </Link>

                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-8">
                        {/* <UserNav /> */}
                        <CartModal />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        style={{
          height:
            pathname === '/'
              ? '100vh'
              : headerRef.current
                ? headerRef.current.offsetHeight
                : 106,
        }}
      ></div>

      {correspondingNavItem && correspondingNavItem.subMenus && (
        <div
          className={`bg-gray-100 sub-nav ${
            correspondingNavSubMenu ? 'has-active' : ''
          }`}
        >
          <div className="mx-auto max-w-7xl text-white flex flex-wrap justify-center py-8 gap-y-6">
            {correspondingNavItem.subMenus?.map((subMenu) => {
              const _isActive = pathname?.includes(subMenu.link)

              return (
                <Link
                  key={subMenu.name}
                  className={`flex-none w-auto iphone:w-1/2 py-0 sub-nav__link ${
                    _isActive ? 'is-active' : ''
                  }`}
                  href={subMenu.link}
                  onClick={
                    subMenu.link && subMenu.link[0] === '#'
                      ? (e) => {
                          e.preventDefault()

                          // Smooth scroll to item
                          if (subMenu.link && document) {
                            const elementToScrollTo = document.getElementById(
                              subMenu.link.replace('#', ''),
                            )

                            if (elementToScrollTo) {
                              elementToScrollTo.scrollIntoView()
                            }
                          }
                        }
                      : undefined
                  }
                >
                  <div className="mx-auto max-w-xs items-center px-2 lg:max-w-none lg:px-4 text-center">
                    <div style={{ height: '3.5rem' }}>
                      <Image
                        src={subMenu.image}
                        alt=""
                        className="h-14 w-auto mx-auto"
                        width={60}
                        height={60}
                        style={{ mixBlendMode: 'darken' }}
                      />
                    </div>

                    <h3
                      className={`text-gray-900 mt-4 text-xs ${
                        _isActive ? 'font-semibold text-sky-800' : ''
                      }`}
                    >
                      {subMenu.name}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
