import React, { useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import NotFound from './components/404'
import Explore from './components/Explore'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import HowItWorks from './components/HowItWorks'
import NFTDropSubscription from './components/NFTDropSubscription'
import TopCreators from './components/TopCreators'
import './styles/Carousel.css'
import './styles/Media.css'

const MainLayout: React.FC = () => {
	const homeRef = useRef<HTMLDivElement>(null)
	const location = useLocation()
	const [userAddress, setUserAddress] = useState<string | null>(null)
	const showHeaderFooter = location.pathname === '/'

	return (
		<div className='App'>
			{showHeaderFooter && (
				<header>
					<div className='header'>
						<Header userAddress={userAddress} setUserAddress={setUserAddress} />
					</div>
				</header>
			)}

			<main className='main'>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<div ref={homeRef}>
									<Home userAddress={userAddress} />
								</div>
								<HowItWorks />
								<NFTDropSubscription />
								<TopCreators />
							</>
						}
					/>
					<Route path='/explore' element={<Explore />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>

			{showHeaderFooter && (
				<footer className='footer'>
					<Footer />
				</footer>
			)}
		</div>
	)
}

export default MainLayout
