import axios from 'axios'
import { BigNumber, ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import '../styles/Explore.css'
import Header from './Header'

const Explore: React.FC = () => {
	const [userAddress, setUserAddress] = useState<string | null>(null)
	const [nfts, setNfts] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const fetchNFTs = async () => {
		setIsLoading(true)
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || ''
			const contractABI = require('../ArtCollectiveMarket.json').abi
			const contract = new ethers.Contract(
				contractAddress,
				contractABI,
				provider
			)

			try {
				const items = await contract.browseGallery()
				const itemsWithMetadata = await Promise.all(
					items.map(async (item: any) => {
						const metadataUri = await contract.tokenURI(item.tokenId)
						const metadataResponse = await axios.get(
							`https://ipfs.io/ipfs/${metadataUri}`
						)
						return {
							...item,
							title: metadataResponse.data.title,
							image: metadataResponse.data.image,
							avatar: metadataResponse.data.avatar,
							price: ethers.utils.formatEther(item.price),
						}
					})
				)
				setNfts(itemsWithMetadata)
			} catch (error) {
				console.error('Error fetching NFTs: ', error)
			}
		} else {
			console.log('Ethereum object not found, install MetaMask.')
		}
		setIsLoading(false)
	}

	const purchaseArtwork = async (tokenId: string, price: string) => {
		if (!window.ethereum) {
			alert('Please install MetaMask to make a purchase.')
			return
		}

		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			await provider.send('eth_requestAccounts', [])
			const signer = provider.getSigner()
			const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || ''
			const contractABI = require('../ArtCollectiveMarket.json').abi
			const contract = new ethers.Contract(contractAddress, contractABI, signer)

			const transaction = await contract.purchaseArtwork(
				BigNumber.from(tokenId),
				{ value: ethers.utils.parseEther(price) }
			)

			await transaction.wait()
			alert('Purchase successful!')

			// Remove purchased NFT from the display
			await fetchNFTs()
		} catch (error) {
			console.error('Purchase failed: ', error)
			alert('There was an error processing your purchase.')
		}
	}

	useEffect(() => {
		fetchNFTs()
	}, [])

	return (
		<>
			<Header userAddress={userAddress} setUserAddress={setUserAddress} />
			<section className='explore_section'>
				<div className='container'>
					<h2 className='explore_title'>Explore</h2>
					{isLoading ? (
						<p>Loading NFTs...</p>
					) : nfts.length > 0 ? (
						<div className='nft-grid'>
							{nfts.map((nft, index) => (
								<div key={index} className='nft-card'>
									<div className='image-container'>
										<img
											src={`https://ipfs.io/ipfs/${nft.image}`}
											alt={nft.title}
										/>
									</div>
									<div className='nft-info'>
										<h3>{nft.title}</h3>
										<div className='artist'>
											<img src={nft.avatar} alt='Artist Avatar' />
											<span className='wallet-address'>
												by @{nft.seller.substring(0, 6)}...
											</span>
										</div>
										<div className='bid-info'>
											<div className='current-bid'>Current Bid</div>
											<p className='price'>{nft.price} ETH</p>
										</div>
										<button
											className='place-bid'
											onClick={() => purchaseArtwork(nft.tokenId, nft.price)}
										>
											Purchase
										</button>
									</div>
								</div>
							))}
						</div>
					) : (
						<p>No NFTs available. Please install and connect your wallet. </p>
					)}
				</div>
			</section>
		</>
	)
}

export default Explore
