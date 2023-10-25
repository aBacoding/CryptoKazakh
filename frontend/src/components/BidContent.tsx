import React, { useEffect, useState } from 'react'

// Fixed end-time for the auction (for example, October 30, 2023, 18:00:00 GMT)
const END_TIME = new Date('2023-10-26T21:00:00Z')

const getTimeDifference = (end: Date) => {
	const now = new Date()
	const diff = end.getTime() - now.getTime()
	if (diff <= 0) return '00:00:00'

	const hours = Math.floor(diff / (1000 * 60 * 60))
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((diff % (1000 * 60)) / 1000)

	return `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const BidContent: React.FC = () => {
	const [countdown, setCountdown] = useState(getTimeDifference(END_TIME))

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountdown(getTimeDifference(END_TIME))
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<div className='bid_content'>
			<div className='cripto_title'>
				<p className='rate_title rate_paragraph'>Current bid</p>
				<h2 className='rate_title rate_title_2'>0.85 ETH</h2>
			</div>
			<div className='time_title'>
				<p className='rate_title rate_paragraph'>Ends in</p>
				<h2 className='rate_title rate_title_2'>{countdown}</h2>
			</div>
		</div>
	)
}

export default BidContent
