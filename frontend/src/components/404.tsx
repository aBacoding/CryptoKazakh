import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/404.css'

const NotFoundPage: React.FC = () => {
	return (
		<section className='page404'>
			<div className='container'>
				<div className='error-section'>
					<h1 className='error-404'>404</h1>
					<p className='error-message'>Page not found!</p>
				</div>
				<Link to='/' className='go-home-section'>
					<p className='go-home-text'>← Go to homepage</p>
				</Link>
			</div>
		</section>
	)
}

export default NotFoundPage
