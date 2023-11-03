import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import MainLayout from './MainLayout'
import './styles/Carousel.css'
import './styles/Media.css'

function App() {
	return (
		<Router>
			<MainLayout />
		</Router>
	)
}

export default App
