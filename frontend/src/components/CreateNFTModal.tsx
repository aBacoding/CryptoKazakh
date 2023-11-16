import axios from 'axios'
import blockies from 'ethereum-blockies'
import { ethers } from 'ethers'
import FormData from 'form-data'
import React, { useState } from 'react'
import '../styles/CreateNFTModal.css'

interface CreateNFTModalProps {
	userAddress: string | null
	onHide: () => void
}

const CreateNFTModal: React.FC<CreateNFTModalProps> = ({
	userAddress,
	onHide,
}) => {
	const [title, setTitle] = useState('')
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [price, setPrice] = useState('')

	const pinFileToIPFS = async (file: File) => {
		const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
		const pinataApiKey = process.env.REACT_APP_PINATA_KEY || ''
		const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET || ''

		const data = new FormData()
		data.append('file', file)

		try {
			const response = await axios.post(url, data, {
				headers: {
					pinata_api_key: pinataApiKey,
					pinata_secret_api_key: pinataSecretApiKey,
				},
			})

			return response.data.IpfsHash
		} catch (error) {
			console.error('Error trying to upload file to IPFS: ', error)
			throw new Error('Error uploading file to IPFS')
		}
	}

	const pinJSONToIPFS = async (jsonBody: any) => {
		const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
		const pinataApiKey = process.env.REACT_APP_PINATA_KEY || ''
		const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET || ''

		try {
			const response = await axios.post(url, jsonBody, {
				headers: {
					pinata_api_key: pinataApiKey,
					pinata_secret_api_key: pinataSecretApiKey,
				},
			})

			return response.data.IpfsHash
		} catch (error) {
			console.error('Error trying to upload JSON to IPFS: ', error)
			throw new Error('Error uploading JSON to IPFS')
		}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setImageFile(e.target.files[0])
		}
	}

	// New function to interact with the smart contract
	const mintNFT = async (metadataUri: string, price: string) => {
		// Make sure user has MetaMask installed
		if (!window.ethereum) {
			throw new Error(
				'Please install MetaMask to interact with the blockchain.'
			)
		}

		// Create a new provider and signer instance
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		await provider.send('eth_requestAccounts', []) // Request access to account
		const signer = provider.getSigner()

		const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || ''
		const contractABI = require('../ArtCollectiveMarket.json').abi

		// Create a new contract instance
		const contract = new ethers.Contract(contractAddress, contractABI, signer)

		// Convert price to Wei
		const priceInWei = ethers.utils.parseEther(price)

		// Convert listing fee to Wei
		const listingFee = ethers.utils.parseEther('0.01') // Listing fee is 0.01 ether

		// Send a transaction to mint the NFT
		const transaction = await contract.mintArtwork(metadataUri, priceInWei, {
			value: listingFee, // Set the transaction value to the listing fee
		})

		await transaction.wait() // Wait for the transaction to be mined
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!userAddress || !imageFile) {
			alert('Please connect your wallet and select a file.')
			return
		}

		try {
			const imageIpfsHash = await pinFileToIPFS(imageFile)
			const avatarUrl =
				localStorage.getItem(`avatar_${userAddress}`) ||
				blockies.create({ seed: userAddress }).toDataURL()

			const metadata = {
				title,
				image: imageIpfsHash,
				price,
				userAddress,
				avatar: avatarUrl,
			}

			const metadataIpfsHash = await pinJSONToIPFS(metadata)

			// Call the mintNFT function after successful IPFS upload
			await mintNFT(metadataIpfsHash, price)

			console.log('NFT Minted successfully')
			alert('NFT created and minted successfully!')

			onHide()
		} catch (error) {
			console.error('Error while trying to mint NFT: ', error)
			alert('Error during NFT minting. Check the console for more information.')
		}
	}

	return (
		<div className='create-nft-modal'>
			<div className='modal-overlay' onClick={onHide} />
			<div className='modal-content'>
				<button className='close-modal' onClick={onHide}>
					&times;
				</button>
				<h2>Create New NFT</h2>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='userAddress'>Your Address:</label>
						<input
							type='text'
							id='userAddress'
							value={userAddress || ''}
							readOnly
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='nftTitle'>NFT Title:</label>
						<input
							type='text'
							id='nftTitle'
							value={title}
							onChange={e => setTitle(e.target.value)}
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='nftImage'>NFT Image:</label>
						<input
							type='file'
							id='nftImage'
							onChange={handleImageChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='nftPrice'>Price:</label>
						<input
							type='text'
							id='nftPrice'
							value={price}
							onChange={e => setPrice(e.target.value)}
							required
						/>
					</div>
					<div className='form-actions'>
						<button type='submit' className='submit-btn'>
							Create NFT
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateNFTModal
