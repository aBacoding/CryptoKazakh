import React from 'react'
import '../styles/Carousel.css'
import '../styles/Home.css'
import '../styles/Media.css'

// Subcomponents
import ArtistContent from './ArtistContent'
import BidContent from './BidContent'
import Links from './Links'
import Rates from './Rates'

const Home: React.FC = () => {
	return (
		<section className='home_section'>
			<div className='container'>
				<div className='home_section_content'>
					<div className='home_section_description'>
						<h1 className='main_title'>
							Create, Buy and Sell the <span>Best NFTs!</span>
						</h1>
						<div className='btn_section'>
							<a className='header_btn content_btn' href='#'>
								Explore
							</a>
							<a className='header_btn content_btn' href='#'>
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
							<BidContent />
							<ArtistContent />
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
