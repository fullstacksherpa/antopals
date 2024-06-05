import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link"
import {ArrowRight} from 'lucide-react'
import {buttonVariants} from './ui/button'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"

const Navbar = async () => {
	const {getUser} = getKindeServerSession()
	const user = await getUser()
	const isAdmin = user?.email === process.env.ADMIN_EMAIL
	return (
		<nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
			<MaxWidthWrapper>
				<div className='flex h-14 items-center justify-between border-b border-zinc-200'>
					<Link href='/' className='flex z-40 font-semibold p-6'>
						<img src="/logo.png" width={60} height={30} />
					</Link>
					<div className="flex h-full items-center space-x-4">
						{user ? (
							<>
								<Link
									href='/api/auth/logout'
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}>
									Sign out
								</Link>
								{isAdmin ? (
									<Link
										href='/'
										className={buttonVariants({
											size: 'sm',
											variant: 'ghost',
										})}>
										✨
									</Link>
								) : null}
								<Link
									href='https://shop.antopals.com/'
									className={buttonVariants({
										size: 'sm',
										className: 'hidden sm:flex items-center gap-1 bg-[rgb(253,213,93)] text-[#0048AE] font-bold hover:scale-75',
									})}>
									Start shopping
									<ArrowRight className='ml-1.5 h-5 w-5' />
								</Link>
							</>
						) : (
							<>
								<Link
									href='/api/auth/register'
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}>
									Sign up
								</Link>

								<Link
									href='/a'
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}>
									About Us
								</Link>

								<Link
									href='/creators-info'
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}>
									How to be creators
								</Link>

								<Link
									href='/api/auth/login'
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}>
									Login
								</Link>

								<div className='h-8 w-px bg-zinc-200 hidden sm:block' />

								<Link
									href='https://shop.antopals.com/'
									className={buttonVariants({
										size: 'sm',
										className: 'hidden sm:flex items-center gap-1 bg-[rgb(253,213,93)] text-[#0048AE] font-bold hover:scale-75',
									})}>
									Start shopping
									<ArrowRight className='ml-1.5 h-5 w-5' />
								</Link>
							</>
						)}
					</div>
				</div>

			</MaxWidthWrapper>
		</nav>
	)
}

export default Navbar