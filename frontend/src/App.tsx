import './App.css'

import Header from './components/Header'
import Home from './components/Home'

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
			</main>
		</div>
	)
}

export default App
