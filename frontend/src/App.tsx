import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import HowItWorks from './components/HowItWorks'
import LiveAuctions from './components/LiveAuctions'
import Trending from './components/Trending'
import TrendingCollections from './components/TrendingCollections'
import './styles/Carousel.css'

function App() {
	return (
		<div className='App'>
			{' '}
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
			</main>
		</div>
	)
}

export default App
