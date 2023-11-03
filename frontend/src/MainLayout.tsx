import React, { useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import NotFound from './components/404'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import HowItWorks from './components/HowItWorks'
import LiveAuctions from './components/LiveAuctions'
import NFTDropSubscription from './components/NFTDropSubscription'
import TopCreators from './components/TopCreators'
import Trending from './components/Trending'
import TrendingCollections from './components/TrendingCollections'
import './styles/Carousel.css'
import './styles/Media.css'

const MainLayout: React.FC = () => {
	const homeRef = useRef<HTMLDivElement>(null)
	const trendingRef = useRef<HTMLDivElement>(null)
	const location = useLocation()
	const [userAddress, setUserAddress] = useState<string | null>(null)
	const showHeaderFooter = location.pathname === '/'

	return (
		<div className='App'>
			{showHeaderFooter && (
				<header>
					<div className='header'>
						<Header
							homeRef={homeRef}
							userAddress={userAddress}
							setUserAddress={setUserAddress}
						/>
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
								<LiveAuctions />
								<HowItWorks />
								<TrendingCollections />
								<div ref={trendingRef}>
									<Trending />
								</div>
								<TopCreators />
								<NFTDropSubscription />
							</>
						}
					/>
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
