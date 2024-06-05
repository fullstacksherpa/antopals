import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import Image from 'next/image'

const Footer = () => {
	return (
		<footer className='bg-white h-20 relative'>
			<MaxWidthWrapper>
				<div className="py-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64  text-sm mt-24">
					{/* TOP */}
					<div className="flex flex-col md:flex-row justify-between gap-24">
						{/* LEFT */}
						<div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
							<Link href="/">
								<div className="text-2xl tracking-wide">Anto Pals</div>
							</Link>
							<p>
								<span className='block'>Vancouver</span>
								City in British Columbia

							</p>
							<span className="font-semibold">antopals@gmail.com</span>
							<div className="flex gap-6">
								<Link href="https://www.instagram.com/antopals.canada/"> <Image src="/instagram.png" alt="" width={24} height={24} /> </Link>
								<Image src="/facebook.png" alt="" width={24} height={24} />


							</div>
						</div>
						{/* CENTER */}
						<div className="hidden lg:flex justify-between w-1/2">
							<div className="flex flex-col justify-between">
								<h1 className="font-medium text-lg">COMPANY</h1>
								<div className="flex flex-col gap-6 ">
									<Link href="">About Us</Link>
									<Link href="">Careers</Link>
									<Link href="">Contact Us</Link>
								</div>
							</div>
							<div className="flex flex-col justify-between">
								<h1 className="font-medium text-lg">SHOP</h1>
								<div className="flex flex-col gap-6">
									<Link href="https://shop.antopals.com/collections/shirts-tops">New Arrivals</Link>
									<Link href="https://shop.antopals.com/collections/bags">Bag</Link>
									<Link href="https://shop.antopals.com/collections/shirts-tops">All Products</Link>
								</div>
							</div>
							<div className="flex flex-col justify-between">
								<h1 className="font-medium text-lg">HELP</h1>
								<div className="flex flex-col gap-6">
									<Link href="">Return & Exchange Policy</Link>
									<Link href="">Terms of Service</Link>
									<Link href="">Legal & Privacy</Link>
								</div>
							</div>
						</div>
						{/* RIGHT */}
						<div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">

							<span className="font-semibold">Secure Payments</span>
							<div className="flex justify-between">
								<Image src="/discover.png" alt="" width={40} height={20} />
								<Image src="/mastercard.png" alt="" width={40} height={20} />
								<Image src="/visa.png" alt="" width={40} height={20} />
							</div>
						</div>
					</div>

				</div>
				<div className='border-t border-[rgb(253,213,93)]' />

				<div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
					<div className='text-center md:text-left pb-2 md:pb-0'>
						<p className='text-sm text-muted-foreground'>
							<span className='hover:text-[rgb(253,213,93)] hover:font-extrabold'>Antopals &copy;</span>  {new Date().getFullYear()} All rights reserved
						</p>
					</div>

					<div className='flex items-center justify-center'>
						<div className='flex space-x-8'>
							<Link
								href='#'
								className='text-sm text-muted-foreground hover:text-gray-600'>
								Terms
							</Link>
							<Link
								href='#'
								className='text-sm text-muted-foreground hover:text-gray-600'>
								Privacy Policy
							</Link>
							<Link
								href='#'
								className='text-sm text-muted-foreground hover:text-gray-600'>
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</MaxWidthWrapper>
		</footer>
	)
}

export default Footer