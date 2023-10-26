import React from 'react'
import '../styles/TopCreators.css'

interface TopCreatorProps {
	imageUrl: string
	name: string
	ethAmount: number
	itemsCount: number
}

const TopCreators: React.FC = () => {
	const creators: TopCreatorProps[] = [
		{
			imageUrl: './assets/image/prof1.png',
			name: 'aBa',
			ethAmount: 7.77,
			itemsCount: 77,
		},
		{
			imageUrl: './assets/image/prof2.png',
			name: 'ferrum',
			ethAmount: 5.55,
			itemsCount: 55,
		},
		{
			imageUrl: './assets/image/prof3.png',
			name: '7eyAzat',
			ethAmount: 4.44,
			itemsCount: 44,
		},
		{
			imageUrl: './assets/image/prof4.png',
			name: 'TnnL',
			ethAmount: 3.33,
			itemsCount: 33,
		},
	]

	return (
		<section className='home_section_6'>
			<div className='container'>
				<div className='title_content'>
					<img
						className='title_img'
						src='./assets/image/red.png'
						alt='violet'
					/>
					<h2 className='title'>Top Creators</h2>
				</div>
				<div className='grid_descriptions'>
					{creators.map((creator, index) => (
						<div key={index} className='grid_card'>
							<div className='card_description_inner'>
								<div className='inner_content'>
									<img src={creator.imageUrl} alt='author' />
									<div className='author_description'>
										<h3 className='author_title'>{creator.name}</h3>
										<p className='paragraph'>{creator.ethAmount} ETH</p>
									</div>
								</div>
								<div className='grid_paragraph'>
									<p className='grid_paragraph_1'>{creator.itemsCount}</p>
									<h3 className='grid_title_p'>Items</h3>
								</div>
							</div>
						</div>
					))}
				</div>
				<a className='header_btn content_btn' href='#'>
					View All
				</a>
			</div>
		</section>
	)
}

export default TopCreators
