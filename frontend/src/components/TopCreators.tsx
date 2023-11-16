import React from 'react'
import '../App.css'
import '../styles/TopCreators.css'

interface TopCreatorProps {
	imageUrl: string
	name: string
}

const TopCreators: React.FC = () => {
	const creators: TopCreatorProps[] = [
		{
			imageUrl: './assets/image/prof1.png',
			name: 'Abdurakhim Bakytzhan',
		},
		{
			imageUrl: './assets/image/prof2.png',
			name: 'Temirlan Torebekov',
		},
		{
			imageUrl: './assets/image/prof3.png',
			name: 'Azat Bekturganov',
		},
		{
			imageUrl: './assets/image/prof4.png',
			name: 'Nursultan Tynyshbay',
		},
	]

	return (
		<section className='home_section_6'>
			<img
				className='blur_image'
				src='./assets/image/blursection5.png'
				alt='blur'
			/>
			<div className='container'>
				<div className='title_content'>
					<img
						className='title_img'
						src='./assets/image/red.png'
						alt='violet'
					/>
					<h2 className='title'>Developers</h2>
				</div>
				<div className='grid_descriptions'>
					{creators.map((creator, index) => (
						<div key={index} className='grid_card'>
							<div className='card_description_inner'>
								<div className='inner_content'>
									<img src={creator.imageUrl} alt='author' />
									<div className='author_description'>
										<h3 className='author_title'>{creator.name}</h3>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default TopCreators
