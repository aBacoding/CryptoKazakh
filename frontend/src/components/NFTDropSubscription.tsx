import React, { FormEvent } from 'react'
import '../styles/NFTDropSubscription.css'

const NFTDropSubscription: React.FC = () => {
	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault()
		// Handle the form submission logic here
		const email = (document.getElementById('mail_input') as HTMLInputElement)
			.value
		console.log('Email submitted:', email)
		// further logic to handle the email or API calls, etc.
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
						placeholder='email@gmail.com'
						id='mail_input'
					/>
					<button
						type='submit'
						name='email_btn'
						className='header_btn content_btn input_btn'
					>
						Subscribe
					</button>
				</form>
			</div>
		</section>
	)
}

export default NFTDropSubscription
