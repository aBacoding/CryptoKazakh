import React from 'react'

const price = 0.85

const BidContent: React.FC = () => {
	return (
		<div className='bid_content'>
			<div className='cripto_title'>
				<p className='rate_title rate_paragraph'>Current Price</p>
				<h2 className='rate_title rate_title_2'>{price} ETH</h2>
			</div>
		</div>
	)
}

export default BidContent
