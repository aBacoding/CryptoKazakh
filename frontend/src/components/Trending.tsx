import React, { useRef, useState } from 'react'
import '../styles/Carousel.css'
import '../styles/Trending.css'

interface CarouselCardProps {
	imageUrl: string
	title: string
	author: string
	price: number
}

const Trending: React.FC = () => {
	const [sliderIndex, setSliderIndex] = useState(0)
	const sliderRef = useRef<HTMLDivElement | null>(null)
	const cardWidth = 460
	const numCards = cards.length

	const updateSliderPosition = () => {
		if (sliderRef.current) {
			sliderRef.current.style.transform = `translateX(-${
				sliderIndex * cardWidth
			}px)`
		}
	}

	const handleLeftClick = () => {
		if (sliderIndex > 0) {
			setSliderIndex(sliderIndex - 1)
		} else {
			setSliderIndex(numCards - 1)
		}
		updateSliderPosition()
	}

	const handleRightClick = () => {
		if (sliderIndex < numCards - 1) {
			setSliderIndex(sliderIndex + 1)
		} else {
			setSliderIndex(0)
		}
		updateSliderPosition()
	}

	return (
		<section className='home_section_5 title_section'>
			<img
				className='blur_image'
				src='./assets/image/blursection5.png'
				alt='blur'
			/>
			<div className='container'>
				<div className='title_content'>
					<img
						className='title_img'
						src='./assets/image/violet.png'
						alt='violet'
					/>
					<h2 className='title'>Trending</h2>
				</div>
				<div className='carousel_buttons'>
					<button
						className='carousel_btn left-handle3'
						type='button'
						onClick={handleLeftClick}
					>
						<i className='bx bx-left-arrow-alt'></i>
					</button>
					<button
						className='carousel_btn right-handle3'
						type='button'
						onClick={handleRightClick}
					>
						<i className='bx bx-right-arrow-alt'></i>
					</button>
				</div>
			</div>
			<div className='carousel_container'>
				<div className='slider slider3' ref={sliderRef}>
					{cards.map((card, index) => (
						<div key={index} className='carousel_card3'>
							<img className='virtual_img' src={card.imageUrl} alt='card' />
							<div className='card_description'>
								<div className='card_description_inner'>
									<div className='inner_content'>
										<div className='author_description'>
											<h3 className='author_title'>{card.title}</h3>
											<p className='paragraph'>by @{card.author}</p>
										</div>
									</div>
								</div>
								<div className='virtual_price'>
									<p className='paragraph'>Current Price</p>
									<h4 className='crypto_price'>{card.price} ETH</h4>
								</div>
								<a className='header_btn crypto_btn' href='#'>
									Purchase
								</a>
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

const cards: CarouselCardProps[] = [
	{
		imageUrl: './assets/image/trending.png',
		title: 'Kazakh Essence',
		author: 'aBa',
		price: 0.14,
	},
	{
		imageUrl: './assets/image/trending2.png',
		title: 'Steppe Tales',
		author: '7eyAzat',
		price: 0.77,
	},
	{
		imageUrl: './assets/image/trending3.png',
		title: 'Brave Warrior',
		author: 'aBa',
		price: 1.16,
	},
	{
		imageUrl: './assets/image/trending4.png',
		title: 'Neverland Legend',
		author: 'ferrum',
		price: 0.03,
	},
	{
		imageUrl: './assets/image/trending5.png',
		title: 'Kazakh Detective',
		author: 'TnnL',
		price: 0.01,
	},
]

export default Trending
