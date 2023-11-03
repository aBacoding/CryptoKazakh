import React from 'react'
import '../styles/Footer.css'

const Footer: React.FC = () => {
	return (
		<>
			<div className='container'>
				<div className='footer_section'>
					<div className='footer_logo_content'>
						<a href='/'>
							<img
								src='./assets/image/footerLogo.png'
								alt='logo'
								className='footer_logo'
							/>
						</a>
						<div className='logo_content'>
							<p className='footer_paragraph'>
								Established in the heart of Central Asia, CryptoKazakh is not
								just an NFT marketplace but a revolutionary platform that
								bridges the traditional art world with the futuristic realm of
								blockchain. Our commitment to authenticity, security, and artist
								empowerment has made us a trusted name in the rapidly evolving
								world of digital artistry. With a focus on diverse artistic
								expression and fostering a global community, CryptoKazakh is
								leading the way in redefining the digital art landscape.
							</p>
							<div className='social_links'>
								<a className='social_icons telegram'>
									<i className='bx bxl-telegram icon'></i>
								</a>
								<a className='social_icons gmail'>
									<i className='bx bxl-gmail icon'></i>
								</a>
							</div>
							<p className='footer_copyright'>All rights reserved@2023</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Footer
