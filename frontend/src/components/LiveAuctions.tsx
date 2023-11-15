import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import '../styles/Carousel.css'
import '../styles/LiveAuctions.css'

const carouselData = [
	{
		title: 'Kazakh Warrior',
		imgSrc: './assets/image/card1.png',
		author: 'aBa',
		bid: 2.77,
		endTime: new Date('2023-11-06T24:00:00Z'),
	},
	{
		title: 'Kazakh fields',
		imgSrc: './assets/image/card2.png',
		author: 'ferrum',
		bid: 0.44,
		endTime: new Date('2023-11-07T14:35:43Z'),
	},
	{
		title: 'KZAnime',
		imgSrc: './assets/image/card3.png',
		author: '7eyAzat',
		bid: 0.19,
		endTime: new Date('2023-11-04T18:00:00Z'),
	},
	{
		title: 'Steppes Elegy',
		imgSrc: './assets/image/card4.png',
		author: 'TnnL',
		bid: 1.99,
		endTime: new Date('2023-11-05T18:00:00Z'),
	},
]

const getTimeDifference = (end: Date) => {
	const now = new Date()
	const diff = end.getTime() - now.getTime()

	if (diff <= 0) return { formatted: '00:00:00', expired: true }

	const hours = Math.floor(diff / (1000 * 60 * 60))
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((diff % (1000 * 60)) / 1000)

	const formatted = `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

	return { formatted, expired: false }
}

const LiveAuctions: React.FC = () => {
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
	const leftButtonRef = useRef<HTMLButtonElement>(null)
	const rightButtonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const slider = sliderRef.current
		const leftButton = leftButtonRef.current
		const rightButton = rightButtonRef.current

		let sliderIndex = 0
		const cardWidth = 510
		const numCards = carouselData.length

		const updateSliderPosition = () => {
			if (slider) {
				slider.style.transform = `translateX(-${sliderIndex * cardWidth}px)`
			}
		}

		const leftHandleClick = () => {
			sliderIndex = (sliderIndex - 1 + numCards) % numCards
			updateSliderPosition()
		}

		const rightHandleClick = () => {
			sliderIndex = (sliderIndex + 1) % numCards
			updateSliderPosition()
		}

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
					<button ref={leftButtonRef} className='carousel_btn left-handle'>
						<i className='bx bx-left-arrow-alt'></i>
					</button>
					<button ref={rightButtonRef} className='carousel_btn right-handle'>
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
										<div className='author_description'>
											<h3 className='author_title'>{card.title}</h3>
											<p className='paragraph'>by @{card.author}</p>
										</div>
									</div>
								</div>
								<div className='virtual_price'>
									<p className='paragraph'>Current Price</p>
									<h4 className='crypto_price'>{card.bid} ETH</h4>
								</div>
								<a
									className={`header_btn crypto_btn ${
										countdowns[index].expired ? 'expired' : ''
									}`}
									href={countdowns[index].expired ? 'javascript:void(0)' : '#'}
								>
									{countdowns[index].expired ? 'Expired' : 'Purchase'}
								</a>
							</div>
							<div className='timer_content'>
								<h3 className='author_title'>{countdowns[index].formatted}</h3>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default LiveAuctions
