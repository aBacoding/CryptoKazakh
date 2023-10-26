// HowItWorks.tsx
import React from 'react'
import '../styles/Carousel.css'
import '../styles/HowItWorks.css'

interface WorkItemProps {
	imgSrc: string
	altText: string
	title: string
}

const WorkItem: React.FC<WorkItemProps> = ({ imgSrc, altText, title }) => {
	return (
		<div className='work_list'>
			<div className='work_list_img'>
				<img src={imgSrc} alt={altText} />
			</div>
			<h2>{title}</h2>
		</div>
	)
}

const HowItWorks: React.FC = () => {
	return (
		<section className='home_section_3'>
			<h2 className='title'>How it works</h2>
			<div className='container'>
				<img
					className='blur_image3'
					src='./assets/image/longLine.png'
					alt='longline'
				/>
				<div className='work_list_content'>
					<WorkItem
						imgSrc='./assets/image/wallet.png'
						altText='wallet'
						title='Set up your wallet'
					/>
					<WorkItem
						imgSrc='./assets/image/collection.png'
						altText='collection'
						title='Create your collection'
					/>
					<WorkItem
						imgSrc='./assets/image/nfts.png'
						altText='nfts'
						title='Add your NFTs'
					/>
					<WorkItem
						imgSrc='./assets/image/lists.png'
						altText='lists'
						title='List them for sale'
					/>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
