import React, { useState } from 'react'
import '../styles/Carousel.css'
import '../styles/Home.css'

// Subcomponents
import ArtistContent from './ArtistContent'
import BidContent from './BidContent'
import Links from './Links'
import Rates from './Rates'

interface HomeProps {
	userAddress: string | null
}

const Home: React.FC<HomeProps> = ({ userAddress }) => {
	const [isBidExpired, setBidExpired] = useState(false)
	return (
		<section className='home_section'>
			<div className='container'>
				<div className='home_section_content'>
					<div className='home_section_description'>
						<h1 className='main_title'>
							Create, Buy and Sell the <span>Kazakh NFTs!</span>
						</h1>
						<div className='btn_section'>
							<a className='header_btn content_btn' href='#'>
								Explore
							</a>
							<a
								className='header_btn content_btn'
								href='#'
								onClick={e => {
									if (!userAddress) {
										e.preventDefault()
										alert('Please connect your wallet to create an NFT.')
									}
								}}
							>
								Create
							</a>
						</div>
						<Rates />
					</div>
					<div className='img_content'>
						<img
							className='blur_img'
							src='./assets/image/homeblurimg.png'
							alt='blur_img'
						/>
						<div className='home_section_img'>
							<img src='./assets/image/mainsectionimg.png' alt='img' />
							<BidContent setBidExpired={setBidExpired} />
							<ArtistContent isBidExpired={isBidExpired} />
							<img
								className='scrolldown_button'
								src='./assets/image/Scrolldownbutton.png'
								alt=''
							/>
						</div>
					</div>
				</div>
				<Links />
			</div>
		</section>
	)
}

export default Home
