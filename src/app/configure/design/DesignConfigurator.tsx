'use client'

import HandleComponent from '@/components/HandleComponent'
import {AspectRatio} from '@/components/ui/aspect-ratio'
import {cn} from '@/lib/utils'
import NextImage from 'next/image'
import {Rnd} from 'react-rnd'
import {useRef, useState} from 'react'
import Link from 'next/link'

import {useUploadThing} from '@/lib/uploadthing'
import {useToast} from '@/components/ui/use-toast'
import {useMutation} from '@tanstack/react-query'
// import {saveConfig as _saveConfig, SaveConfigArgs} from './actions'
import {useRouter} from 'next/navigation'
import {saveConfig as _saveConfig, SaveConfigArgs} from './actions'
import {ArrowRight} from 'lucide-react'
import {buttonVariants} from '@/components/ui/button'

interface DesignConfiguratorProps {
	configId: string
	imageUrl: string
	imageDimensions: {width: number; height: number}
}

const DesignConfigurator = ({
	configId,
	imageUrl,
	imageDimensions,
}: DesignConfiguratorProps) => {
	const {toast} = useToast()
	const router = useRouter()

	const {mutate: saveConfig, isPending} = useMutation({
		mutationKey: ['save-config'],
		mutationFn: async (args: SaveConfigArgs) => {
			await Promise.all([saveConfiguration(), _saveConfig(args)])
		},
		onError: () => {
			toast({
				title: 'Something went wrong',
				description: 'There was an error on our end. Please try again.',
				variant: 'destructive',
			})
		},
		onSuccess: () => {
			router.push(`/configure/preview?id=${configId}`)
		},
	})


	const [renderedDimension, setRenderedDimension] = useState({
		width: imageDimensions.width / 4,
		height: imageDimensions.height / 4,
	})

	const [renderedPosition, setRenderedPosition] = useState({
		x: 150,
		y: 205,
	})

	const phoneCaseRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const {startUpload} = useUploadThing('imageUploader')

	async function saveConfiguration() {
		try
		{
			const {
				left: caseLeft,
				top: caseTop,
				width,
				height,
			} = phoneCaseRef.current!.getBoundingClientRect()

			const {left: containerLeft, top: containerTop} =
				containerRef.current!.getBoundingClientRect()

			const leftOffset = caseLeft - containerLeft
			const topOffset = caseTop - containerTop

			const actualX = renderedPosition.x - leftOffset
			const actualY = renderedPosition.y - topOffset

			const canvas = document.createElement('canvas')
			canvas.width = width
			canvas.height = height
			const ctx = canvas.getContext('2d')

			const userImage = new Image()
			userImage.crossOrigin = 'anonymous'
			userImage.src = imageUrl
			await new Promise((resolve) => (userImage.onload = resolve))

			ctx?.drawImage(
				userImage,
				actualX,
				actualY,
				renderedDimension.width,
				renderedDimension.height
			)

			const base64 = canvas.toDataURL()
			const base64Data = base64.split(',')[1]

			const blob = base64ToBlob(base64Data, 'image/png')
			const file = new File([blob], 'filename.png', {type: 'image/png'})

			await startUpload([file], {configId})
		} catch (err)
		{
			toast({
				title: 'Something went wrong',
				description:
					'There was a problem saving your config, please try again.',
				variant: 'destructive',
			})
		}
	}

	function base64ToBlob(base64: string, mimeType: string) {
		const byteCharacters = atob(base64)
		const byteNumbers = new Array(byteCharacters.length)
		for (let i = 0; i < byteCharacters.length; i++)
		{
			byteNumbers[i] = byteCharacters.charCodeAt(i)
		}
		const byteArray = new Uint8Array(byteNumbers)
		return new Blob([byteArray], {type: mimeType})
	}

	return (
		<div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
			<div
				ref={containerRef}
				className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
				<div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
					<AspectRatio
						ref={phoneCaseRef}
						ratio={896 / 1831}
						className='pointer-events-none relative z-50 aspect-[896/1831] w-full'>
						<NextImage
							fill
							alt='phone image'
							src='/phone-template.png'
							className='pointer-events-none z-50 select-none'
						/>
					</AspectRatio>
					<div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />

				</div>

				<Rnd
					default={{
						x: 150,
						y: 205,
						height: imageDimensions.height / 4,
						width: imageDimensions.width / 4,
					}}
					onResizeStop={(_, __, ref, ___, {x, y}) => {
						setRenderedDimension({
							height: parseInt(ref.style.height.slice(0, -2)),
							width: parseInt(ref.style.width.slice(0, -2)),
						})

						setRenderedPosition({x, y})
					}}
					onDragStop={(_, data) => {
						const {x, y} = data
						setRenderedPosition({x, y})
					}}
					className='absolute z-20 border-[3px] border-primary'
					lockAspectRatio
					resizeHandleComponent={{
						bottomRight: <HandleComponent />,
						bottomLeft: <HandleComponent />,
						topRight: <HandleComponent />,
						topLeft: <HandleComponent />,
					}}>
					<div className='relative w-full h-full'>
						<NextImage
							src={imageUrl}
							fill
							alt='your image'
							className='pointer-events-none'
						/>
					</div>
				</Rnd>
			</div>
			<Link
				href='/app/config/review'
				onClick={() => saveConfig}
				className={buttonVariants({
					size: 'sm',
					className: 'hidden sm:flex items-center gap-1 bg-[rgb(253,213,93)] text-[#0048AE] font-bold hover:scale-75',
				})}>
				Save Design
				<ArrowRight className='ml-1.5 h-5 w-5' />
			</Link>
		</div>
	)
}

export default DesignConfigurator