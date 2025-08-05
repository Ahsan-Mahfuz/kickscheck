import { Image } from 'antd'
import Link from 'next/link'
import { FaFacebook, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className="footer-bg-color pt-5  text-white pb-8 poppins  ">
      <div className=" mx-auto flex flex-col lg:flex-row justify-between responsive-width">
        <div className="flex flex-col mb-6 md:mb-0">
          <div className="  mb-5 ">
            <Image
              src="/logo.svg"
              alt="logo"
              preview={false}
              className="!w-full"
              height={60}
              width={60}
            />
            <div className="text-xl font-bold">KickCheck</div>
          </div>
          <p className="mt-2  poppins max-w-[600px] w-full">
            It is a long-established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lore Issue is that it has a more-or-less normal.
          </p>
          <section>
            <p className="font-semibold text-yellow-400 mt-5 poppins">
              Follow Us
            </p>
            <div className="flex mt-4 space-x-4 text-3xl items-center ">
              <Link href="/" target="_blank">
                <FaFacebook className="cursor-pointer " />
              </Link>

              <Link href="/" target="_blank">
                <FaLinkedin className="cursor-pointer  " />
              </Link>

              <Link href="/" target="_blank">
                <FaInstagramSquare className="cursor-pointer  " />
              </Link>
            </div>
          </section>
        </div>

        <div className="flex flex-col mb-6 md:mb-0">
          <h3 className="font-semibold text-yellow-400 text-xl">Information</h3>
          <ul className="mt-5 flex flex-col gap-5 ">
            <li>
              <Link href="/about-us" className="hover:text-yellow-400">
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/privacy-and-policy"
                className="hover:text-yellow-400"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                href="/terms-and-conditions"
                className="hover:text-yellow-400"
              >
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link href="/contact-us" className="hover:text-yellow-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mb-6 md:mb-0">
          <h3 className="font-semibold text-yellow-400 text-xl">
            Help & Support
          </h3>
          <section className="flex flex-col gap-5 justify-center mt-5">
            <div className="flex gap-4">
              <div className="flex gap-2 ">
                <MdOutlineMailOutline className="mt-1" />
                <div>Email:</div>
              </div>
              <div>
                <div>youremail@gmail.com</div>
                <div>letstalk@gmail.com</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex gap-2">
                <FiPhone className="mt-1" />
                <div>Phone:</div>
              </div>
              <div>
                <div>(+1) (888) 750-6866</div>
                <div>(+1) (888) 785-3986</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-10 text-center text-sm">
        <p>
          &copy; Copyright {new Date().getFullYear()}, All Rights Reserved by{' '}
          <Link href="/" className="text-yellow-400 hover:underline">
            KickCheck
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
