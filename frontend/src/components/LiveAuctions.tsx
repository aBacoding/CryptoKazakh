import React, { useEffect, useRef, useState } from 'react'
import '../styles/Carousel.css'
import '../styles/LiveAuctions.css'

const carouselData = [
	{
		title: 'Kazakh Warrior',
		imgSrc: './assets/image/card1.png',
		authorImg: './assets/image/author.png',
		author: 'aBa',
		bid: 2.77,
		endTime: new Date('2023-10-26T24:00:00Z'),
	},
	{
		title: 'Kazakh fields',
		imgSrc: './assets/image/card2.png',
		authorImg: './assets/image/author2.png',
		author: 'ferrum',
		bid: 0.44,
		endTime: new Date('2023-10-27T14:00:00Z'),
	},
	{
		title: 'KZAnime',
		imgSrc: './assets/image/card3.png',
		authorImg: './assets/image/author3.png',
		author: '7eyAzat',
		bid: 0.19,
		endTime: new Date('2023-10-26T18:00:00Z'),
	},
	{
		title: 'Steppes Elegy',
		imgSrc: './assets/image/card4.png',
		authorImg: './assets/image/author4.png',
		author: 'TnnL',
		bid: 1.99,
		endTime: new Date('2023-10-27T18:00:00Z'),
	},
]

const getTimeDifference = (end: Date) => {
	const now = new Date()
	const diff = end.getTime() - now.getTime()
	if (diff <= 0) return '00:00:00'

	const hours = Math.floor(diff / (1000 * 60 * 60))
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((diff % (1000 * 60)) / 1000)

	return `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const LiveAuctions: React.FC = () => {
	// Initial countdown values for each card
	const initialCountdowns = carouselData.map(card =>
		getTimeDifference(card.endTime)
	)
	const [countdowns, setCountdowns] = useState(initialCountdowns)

	useEffect(() => {
		const intervalId = setInterval(() => {
			const updatedCountdowns = carouselData.map(card =>
				getTimeDifference(card.endTime)
			)
			setCountdowns(updatedCountdowns)
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	const sliderRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const slider = sliderRef.current
		let sliderIndex = 0
		const cardWidth = 500
		const numCards = carouselData.length

		const updateSliderPosition = () => {
			if (slider) {
				slider.style.transform = `translateX(-${sliderIndex * cardWidth}px)`
			}
		}

		const leftHandleClick = () => {
			if (sliderIndex === 0) {
				sliderIndex = (sliderIndex - 3 + numCards) % numCards
			} else {
				sliderIndex = (sliderIndex - 1 + numCards) % numCards
			}
			updateSliderPosition()
		}

		const rightHandleClick = () => {
			sliderIndex = (sliderIndex + 1) % (numCards - 2)
			updateSliderPosition()
		}

		const leftButton = document.querySelector('.left-handle')
		const rightButton = document.querySelector('.right-handle')

		if (leftButton) {
			leftButton.addEventListener('click', leftHandleClick)
		}

		if (rightButton) {
			rightButton.addEventListener('click', rightHandleClick)
		}

		return () => {
			if (leftButton) {
				leftButton.removeEventListener('click', leftHandleClick)
			}
			if (rightButton) {
				rightButton.removeEventListener('click', rightHandleClick)
			}
		}
	}, [])

	return (
		<section className='home_section_2 title_section'>
			<img
				className='blur_image'
				src='./assets/image/blursection2.png'
				alt='blur'
			/>
			<div className='container'>
				<div className='title_content'>
					<img
						className='title_img'
						src='./assets/image/violet.png'
						alt='violet'
					/>
					<h2 className='title'>Live Auctions</h2>
				</div>
			</div>
			<div className='carousel_container'>
				<div className='carousel_buttons'>
					<button className='carousel_btn left-handle'>
						<i className='bx bx-left-arrow-alt'></i>
					</button>
					<button className='carousel_btn right-handle'>
						<i className='bx bx-right-arrow-alt'></i>
					</button>
				</div>
				<div className='slider' ref={sliderRef}>
					{carouselData.map((card, index) => (
						<div key={index} className='carousel_card'>
							<img className='virtual_img' src={card.imgSrc} alt='card' />
							<div className='card_description'>
								<div className='card_description_inner'>
									<div className='inner_content'>
										<img src={card.authorImg} alt='author' /> {}
										<div className='author_description'>
											<h3 className='author_title'>{card.title}</h3>
											<p className='paragraph'>by @{card.author}</p>
										</div>
									</div>
								</div>
								<div className='virtual_price'>
									<p className='paragraph'>Current Bid</p>
									<h4 className='crypto_price'>{card.bid} ETH</h4>
								</div>
								<a className='header_btn crypto_btn' href='#'>
									Place a bid
								</a>
							</div>
							<div className='timer_content'>
								<h3 className='author_title'>{countdowns[index]}</h3>
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

export default LiveAuctions
