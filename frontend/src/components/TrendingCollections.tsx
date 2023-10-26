import React, { useEffect, useRef, useState } from 'react'
import '../styles/TrendingCollections.css'

// TypeScript interface for carousel data
interface CarouselData {
	cardImg: string
	authorImg: string
	authorName: string
	/* rateImg: string
	rateType: string */
}

const carouselItems: CarouselData[] = [
	{
		cardImg: './assets/image/coll.png',
		authorImg: './assets/image/author.png',
		authorName: 'aBa',
		/* rateImg: './assets/image/rate.png',
		rateType: 'ERC-721', */
	},
	{
		cardImg: './assets/image/coll2.png',
		authorImg: './assets/image/author2.png',
		authorName: 'ferrum',
		/* rateImg: './assets/image/rate.png',
		rateType: 'ERC-721', */
	},
	{
		cardImg: './assets/image/coll3.png',
		authorImg: './assets/image/author3.png',
		authorName: '7eyAzat',
		/* rateImg: './assets/image/rate.png',
		rateType: 'ERC-721', */
	},
	{
		cardImg: './assets/image/coll4.png',
		authorImg: './assets/image/author4.png',
		authorName: 'TnnL',
		/* rateImg: './assets/image/rate.png',
		rateType: 'ERC-721', */
	},
]

const TrendingCollections: React.FC = () => {
	const slider2Ref = useRef<HTMLDivElement | null>(null)
	const [sliderIndex2, setSliderIndex2] = useState(0)
	const cardWidth2 = 500

	useEffect(() => {
		if (slider2Ref.current) {
			slider2Ref.current.style.transform = `translateX(-${
				sliderIndex2 * cardWidth2
			}px)`
		}
	}, [sliderIndex2])

	const handleLeftClick = () => {
		const numCards2 = carouselItems.length
		if (sliderIndex2 === 0) {
			setSliderIndex2((sliderIndex2 - 3 + numCards2) % numCards2)
		} else {
			setSliderIndex2((sliderIndex2 - 1 + numCards2) % numCards2)
		}
	}

	const handleRightClick = () => {
		const numCards2 = carouselItems.length
		setSliderIndex2((sliderIndex2 + 1) % (numCards2 - 2))
	}

	return (
		<section className='home_section_4 title_section'>
			<img
				className='blur_image'
				src='./assets/image/blursection4.png'
				alt='blur'
			/>
			<div className='container'>
				<div className='title_content'>
					<img
						className='title_img'
						src='./assets/image/red.png'
						alt='violet'
					/>
					<h2 className='title'>Trending Collections</h2>
				</div>
				<div className='carousel_buttons'>
					<button
						className='carousel_btn left-handle2'
						onClick={handleLeftClick}
					>
						<i className='bx bx-left-arrow-alt'></i>
					</button>
					<button
						className='carousel_btn right-handle2'
						onClick={handleRightClick}
					>
						<i className='bx bx-right-arrow-alt'></i>
					</button>
				</div>
			</div>
			<div className='carousel_container'>
				<div className='slider slider2' ref={slider2Ref}>
					{carouselItems.map((item, index) => (
						<div key={index} className='carousel_card2'>
							<img className='virtual_img' src={item.cardImg} alt='card' />
							<div className='card_description'>
								<div className='card_description_inner'>
									<div className='inner_content'>
										<img src={item.authorImg} alt='author' />
										<h3 className='author_title'>@{item.authorName}</h3>
									</div>
									<p className='paragraph'>
										{/* <img src={ item.rateImg } alt='rate' >  */}
										{/* item.rateType */}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
				<a className='header_btn content_btn' href='#'>
					View All
				</a>
			</div>
		</section>
	)
}

export default TrendingCollections
