import './App.css'
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

function App() {
	return (
		<div className='App'>
			<header>
				<div className='header'>
					<Header />
				</div>
			</header>
			<main className='main'>
				<Home />
				<LiveAuctions />
				<HowItWorks />
				<TrendingCollections />
				<Trending />
				<TopCreators />
				<NFTDropSubscription />
			</main>
			<footer className='footer'>
				<Footer />
			</footer>
		</div>
	)
}

export default App
