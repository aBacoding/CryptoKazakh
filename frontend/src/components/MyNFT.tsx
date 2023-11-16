import axios from 'axios'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import '../styles/Explore.css'
import '../styles/MyNFT.css'
import Header from './Header'

const MyNFT: React.FC = () => {
	const [userAddress, setUserAddress] = useState<string | null>(null)
	const [myNfts, setMyNfts] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [totalNfts, setTotalNfts] = useState<number>(0)
	const [totalSum, setTotalSum] = useState<string>('0')

	useEffect(() => {
		const getUserAddress = async () => {
			if (window.ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum)
				const accounts = await provider.listAccounts()
				if (accounts.length > 0) {
					setUserAddress(accounts[0])
				}
			} else {
				console.error('Ethereum object not found, install MetaMask.')
			}
		}
		getUserAddress()
	}, [])

	useEffect(() => {
		if (userAddress) {
			fetchMyNFTs()
		}
	}, [userAddress])

	const fetchMyNFTs = async () => {
		setIsLoading(true)
		const provider = new ethers.providers.Web3Provider(window.ethereum as any)
		const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || ''
		const contractABI = require('../ArtCollectiveMarket.json').abi
		const contract = new ethers.Contract(contractAddress, contractABI, provider)

		try {
			const items = await contract.myCollection({ from: userAddress })
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
			setMyNfts(itemsWithMetadata)
			// Calculate totals
			const sum = itemsWithMetadata.reduce(
				(acc, item) => acc + parseFloat(item.price),
				0
			)
			setTotalNfts(itemsWithMetadata.length)
			setTotalSum(sum.toFixed(6))
		} catch (error) {
			console.error('Error fetching my NFTs:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Header userAddress={userAddress} setUserAddress={setUserAddress} />
			<section className='my-nft-section'>
				<div className='container'>
					<h2 className='my-nft-title'>My NFTs</h2>
					<p>Total NFTs: {totalNfts}</p>
					<p>Total Sum: {totalSum} ETH</p>
					{isLoading ? (
						<p>Loading NFTs...</p>
					) : myNfts.length > 0 ? (
						<div className='my-nft-grid'>
							{myNfts.map((nft, index) => (
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
											<p className='price'>{nft.price} ETH</p>
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<p>You do not own any NFTs.</p>
					)}
				</div>
			</section>
		</>
	)
}

export default MyNFT
