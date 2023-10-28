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
	const sliderRef = useRef<HTMLDivElement | null>(null)
	const [sliderIndex, setSliderIndex] = useState(0)
	const cardWidth = 500

	useEffect(() => {
		if (sliderRef.current) {
			sliderRef.current.style.transform = `translateX(-${
				sliderIndex * cardWidth
			}px)`
		}
	}, [sliderIndex])

	const handleLeftClick = () => {
		const numCards = carouselItems.length
		if (sliderIndex > 0) {
			setSliderIndex(sliderIndex - 1)
		} else {
			setSliderIndex(numCards - 1) // Go to the last card
		}
	}

	const handleRightClick = () => {
		const numCards = carouselItems.length
		if (sliderIndex < numCards - 1) {
			setSliderIndex(sliderIndex + 1)
		} else {
			setSliderIndex(0) // Go to the first card
		}
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
				<div className='slider slider2' ref={sliderRef}>
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
