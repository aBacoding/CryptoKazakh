import './App.css'

import Header from './components/Header'
import Home from './components/Home'
import LiveAuctions from './components/LiveAuctions'

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
			</main>
		</div>
	)
}

export default App
