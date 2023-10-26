import './App.css'

import Header from './components/Header'
import Home from './components/Home'
import HowItWorks from './components/HowItWorks'
import LiveAuctions from './components/LiveAuctions'
import TrendingCollections from './components/TrendingCollections'

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
			</main>
		</div>
	)
}

export default App
