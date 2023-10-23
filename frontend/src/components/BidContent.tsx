import React from 'react'

const BidContent: React.FC = () => {
	return (
		<div className='bid_content'>
			<div className='cripto_title'>
				<p className='rate_title rate_paragraph'>Current bid</p>
				<h2 className='rate_title rate_title_2'>0.85 ETH</h2>
			</div>
			<div className='time_title'>
				<p className='rate_title rate_paragraph'>Ends in</p>
				<h2 className='rate_title rate_title_2'>24 hrs</h2>
			</div>
		</div>
	)
}

export default BidContent
