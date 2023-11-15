import React from 'react'

interface ArtistContentProps {
	isBidExpired: boolean
}

const author = 'aBa'

const ArtistContent: React.FC<ArtistContentProps> = ({ isBidExpired }) => {
	return (
		<div className='artist_content'>
			<div className='wzard_title'>
				<h2 className='rate_title rate_title_2'>Kazakh NFT</h2>
				<p className='rate_title rate_paragraph'>@{author}</p>
			</div>
			<a
				className={`header_btn content_btn ${isBidExpired ? 'expired' : ''}`}
				href='#'
				onClick={e => isBidExpired && e.preventDefault()}
			>
				{isBidExpired ? 'Expired' : 'Purchase'}
			</a>
		</div>
	)
}

export default ArtistContent
