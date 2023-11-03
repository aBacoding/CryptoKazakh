import emailjs from 'emailjs-com'
import React, { FormEvent, useState } from 'react'
import '../styles/NFTDropSubscription.css'

const NFTDropSubscription: React.FC = () => {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault()

		// Ensuring that the environment variables are set correctly
		const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID
		const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
		const userID = process.env.REACT_APP_EMAILJS_USER_ID

		if (
			typeof serviceID === 'string' &&
			typeof templateID === 'string' &&
			typeof userID === 'string'
		) {
			// All environment variables are strings and not undefined
			const templateParams = {
				user_email: email,
			}

			emailjs.send(serviceID, templateID, templateParams, userID).then(
				response => {
					console.log('SUCCESS!', response.status, response.text)
					alert('Thank you for subscribing! Check your inbox for confirmation.')
					setEmail('') // This will clear the email input
				},
				error => {
					console.log('FAILED...', error)
					alert('Failed to subscribe. Please try again later.')
				}
			)
		} else {
			// Handle the case where environment variables are not set
			console.error('EmailJS environment variables are not properly set.')
			alert('Service is temporarily unavailable. Please try again later.')
		}
	}

	return (
		<section className='home_section_7'>
			<img
				className='seventh_background'
				src='./assets/image/back.png'
				alt='bg'
			/>
			<div className='content_section'>
				<h2 className='title'>Ready for Next NFT Drop?</h2>
				<form className='contact_form' onSubmit={handleFormSubmit}>
					<input
						type='email'
						name='mail'
						id='mail_input'
						placeholder='Your Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<button
						type='submit'
						name='email_btn'
						className='header_btn content_btn input_btn'
					>
						Subscribe
					</button>
					{message && <div className='subscription-message'>{message}</div>}
				</form>
			</div>
		</section>
	)
}

export default NFTDropSubscription
