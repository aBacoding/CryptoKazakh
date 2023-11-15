// Explore.tsx
import React, { useState } from 'react'
import '../styles/Explore.css'
import Header from './Header'

const Explore: React.FC = () => {
	const [userAddress, setUserAddress] = useState<string | null>(null)
	return (
		<>
			<Header userAddress={userAddress} setUserAddress={setUserAddress} />
			<section className='explore_section'>
				<div className='container'>
					{/* Add your grid or list layout here to display NFTs */}
				</div>
			</section>
		</>
	)
}

export default Explore
