'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CiMenuBurger } from 'react-icons/ci'
import { MdClose } from 'react-icons/md'
import Cookies from 'js-cookie'
import { useGetProfileQuery } from '@/redux/profileApis'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    const cookieToken = Cookies.get('token')
    const localToken = localStorage.getItem('token')
    const finalToken = cookieToken || localToken || ''
    setToken(finalToken)
  }, [])

  const { data: profileData, error } = useGetProfileQuery(undefined, {
    skip: !token, 
  })

  const getLinkClass = (path: string) =>
    pathname === path ? ' font-semibold text-yellow-500' : 'no-underline'

  return (
    <div className="z-50 ">
      <section>
        <div className="font-semibold navbar-bg-color  text-white ">
          <div className="flex justify-between items-center mx-auto  px-10 py-4">
            <div>
              <Link href="/">
                <section className="flex justify-center flex-col items-center ">
                  <div>
                    <Image
                      src="/logo.svg"
                      alt="logo"
                      className="h-[50px] w-[50px]"
                      width={5000}
                      height={50}
                    />
                  </div>
                  <div>KickCheck</div>
                </section>
              </Link>
            </div>

            <div className="flex max-md:hidden justify-between items-center gap-10 ">
              <Link href="/" className={getLinkClass('/')}>
                Home
              </Link>
              <Link href="/process" className={getLinkClass('/process')}>
                Process
              </Link>
              <Link
                href="/authentication"
                className={getLinkClass('/authentication')}
              >
                Authentication
              </Link>
              <Link href="/pricing" className={getLinkClass('/pricing')}>
                Pricing
              </Link>
              <Link href="/explore" className={getLinkClass('/explore')}>
                Explore
              </Link>
              <Link href="/contact-us" className={getLinkClass('/contact-us')}>
                Contact
              </Link>

              {token ? (
                <Link
                  href="/profile"
                  className="bg-white/20 px-6 py-1.5 rounded-lg"
                >
                  <section className="flex items-center gap-2">
                    <div className="border border-green-400 rounded-full">
                      <Image
                        src="/shoe/shoe-2.jpg"
                        alt="shoe"
                        width={5000}
                        height={5000}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>

                    <div>
                      <div>{profileData?.data?.name || 'Loading...'}</div>
                      <div className="text-xs">
                        {profileData?.data?.email || ''}
                      </div>
                    </div>
                  </section>
                </Link>
              ) : (
                <div className="flex gap-5">
                  <Link
                    href="/sign-up"
                    className="border border-green-400 px-6 py-1.5 rounded-lg"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/sign-in"
                    className="bg-[#5F9E19] px-6 py-1.5 rounded-lg"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            <div className="relative max-md:block hidden cursor-pointer">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer p-2 rounded-md bg-yellow-400 text-black hover:bg-yellow-500 transition-all"
              >
                {isOpen ? <MdClose /> : <CiMenuBurger />}
              </button>

              {isOpen && (
                <div
                  className="z-10 cursor-pointer absolute top-12 right-0 w-40  bg-gray-700 text-white shadow-lg rounded-lg p-4"
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className={`p-2  cursor-pointer`}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/authentication"
                        className={` p-2  cursor-pointer`}
                      >
                        Authentication
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" className={` p-2  cursor-pointer`}>
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link href="/explore" className={` p-2  cursor-pointer`}>
                        Explore
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        className={` p-2  cursor-pointer`}
                      >
                        Contact
                      </Link>
                    </li>

                    <li className="flex gap-2 flex-col">
                      {token ? (
                        <Link
                          href="/profile"
                          className={` px-3 rounded-full flex items-center justify-center bg-green-600  hover:bg-green-700 cursor-pointer`}
                        >
                          Profile
                        </Link>
                      ) : (
                        <>
                          <Link
                            href="/sign-in"
                            className={` px-3 rounded-full flex items-center justify-center bg-red-600  hover:bg-red-700 cursor-pointer`}
                          >
                            Login
                          </Link>
                          <Link
                            href="/sign-up"
                            className={` px-3 rounded-full flex items-center justify-center bg-gray-900  hover:bg-gray-950 cursor-pointer`}
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Navbar
