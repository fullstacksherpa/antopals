
import {cn} from '@/lib/utils'
import {HTMLAttributes} from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
	imgSrc: string
	dark?: boolean
}

const Phone = ({imgSrc, className, dark = false, ...props}: PhoneProps) => {
	return (
		<div className={cn(
			'relative pointer-events-none z-50 overflow-hidden',
			className
		)}
			{...props}>
			<img
				src={
					dark
						? '/btshirt.png'
						: '/btshirt.png'
				}
				className='pointer-events-none z-50 select-none'
				alt='phone image'
			/>


		</div>
	)
}

export default Phone
