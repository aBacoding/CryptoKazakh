import axios from 'axios'
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
					// 'Content-Type': `multipart/form-data; boundary=${data.getBoundary()}`, // This line is not needed, axios and form-data handle it
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
		const contractABI = [
			{ type: 'constructor', payable: false, inputs: [] },
			{
				type: 'event',
				anonymous: false,
				name: 'Approval',
				inputs: [
					{ type: 'address', name: 'owner', indexed: true },
					{ type: 'address', name: 'approved', indexed: true },
					{ type: 'uint256', name: 'tokenId', indexed: true },
				],
			},
			{
				type: 'event',
				anonymous: false,
				name: 'ApprovalForAll',
				inputs: [
					{ type: 'address', name: 'owner', indexed: true },
					{ type: 'address', name: 'operator', indexed: true },
					{ type: 'bool', name: 'approved', indexed: false },
				],
			},
			{
				type: 'event',
				anonymous: false,
				name: 'ArtworkListed',
				inputs: [
					{ type: 'uint256', name: 'tokenId', indexed: true },
					{ type: 'address', name: 'owner', indexed: false },
					{ type: 'address', name: 'seller', indexed: false },
					{ type: 'uint256', name: 'price', indexed: false },
					{ type: 'bool', name: 'currentlyListed', indexed: false },
				],
			},
			{
				type: 'event',
				anonymous: false,
				name: 'BatchMetadataUpdate',
				inputs: [
					{ type: 'uint256', name: '_fromTokenId', indexed: false },
					{ type: 'uint256', name: '_toTokenId', indexed: false },
				],
			},
			{
				type: 'event',
				anonymous: false,
				name: 'MetadataUpdate',
				inputs: [{ type: 'uint256', name: '_tokenId', indexed: false }],
			},
			{
				type: 'event',
				anonymous: false,
				name: 'Transfer',
				inputs: [
					{ type: 'address', name: 'from', indexed: true },
					{ type: 'address', name: 'to', indexed: true },
					{ type: 'uint256', name: 'tokenId', indexed: true },
				],
			},
			{
				type: 'function',
				name: 'approve',
				constant: false,
				payable: false,
				inputs: [
					{ type: 'address', name: 'to' },
					{ type: 'uint256', name: 'tokenId' },
				],
				outputs: [],
			},
			{
				type: 'function',
				name: 'balanceOf',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [{ type: 'address', name: 'owner' }],
				outputs: [{ type: 'uint256' }],
			},
			{
				type: 'function',
				name: 'browseGallery',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [],
				outputs: [
					{
						type: 'tuple[]',
						components: [
							{ type: 'uint256', name: 'tokenId' },
							{ type: 'address', name: 'owner' },
							{ type: 'address', name: 'seller' },
							{ type: 'uint256', name: 'price' },
							{ type: 'bool', name: 'currentlyListed' },
						],
					},
				],
			},
			{
				type: 'function',
				name: 'getApproved',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [{ type: 'uint256', name: 'tokenId' }],
				outputs: [{ type: 'address' }],
			},
			{
				type: 'function',
				name: 'getArtwork',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [{ type: 'uint256', name: 'tokenId' }],
				outputs: [
					{
						type: 'tuple',
						components: [
							{ type: 'uint256', name: 'tokenId' },
							{ type: 'address', name: 'owner' },
							{ type: 'address', name: 'seller' },
							{ type: 'uint256', name: 'price' },
							{ type: 'bool', name: 'currentlyListed' },
						],
					},
				],
			},
			{
				type: 'function',
				name: 'getCurrentToken',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [],
				outputs: [{ type: 'uint256' }],
			},
			{
				type: 'function',
				name: 'getLatestArtwork',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [],
				outputs: [
					{
						type: 'tuple',
						components: [
							{ type: 'uint256', name: 'tokenId' },
							{ type: 'address', name: 'owner' },
							{ type: 'address', name: 'seller' },
							{ type: 'uint256', name: 'price' },
							{ type: 'bool', name: 'currentlyListed' },
						],
					},
				],
			},
			{
				type: 'function',
				name: 'getListingFee',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [],
				outputs: [{ type: 'uint256' }],
			},
			{
				type: 'function',
				name: 'isApprovedForAll',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [
					{ type: 'address', name: 'owner' },
					{ type: 'address', name: 'operator' },
				],
				outputs: [{ type: 'bool' }],
			},
			{
				type: 'function',
				name: 'mintArtwork',
				constant: false,
				stateMutability: 'payable',
				payable: true,
				inputs: [
					{ type: 'string', name: 'tokenURI' },
					{ type: 'uint256', name: 'price' },
				],
				outputs: [{ type: 'uint256' }],
			},
			{
				type: 'function',
				name: 'myCollection',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [],
				outputs: [
					{
						type: 'tuple[]',
						components: [
							{ type: 'uint256', name: 'tokenId' },
							{ type: 'address', name: 'owner' },
							{ type: 'address', name: 'seller' },
							{ type: 'uint256', name: 'price' },
							{ type: 'bool', name: 'currentlyListed' },
						],
					},
				],
			},
			{
				type: 'function',
				name: 'name',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [],
				outputs: [{ type: 'string' }],
			},
			{
				type: 'function',
				name: 'ownerOf',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [{ type: 'uint256', name: 'tokenId' }],
				outputs: [{ type: 'address' }],
			},
			{
				type: 'function',
				name: 'purchaseArtwork',
				constant: false,
				stateMutability: 'payable',
				payable: true,
				inputs: [{ type: 'uint256', name: 'tokenId' }],
				outputs: [],
			},
			{
				type: 'function',
				name: 'safeTransferFrom',
				constant: false,
				payable: false,
				inputs: [
					{ type: 'address', name: 'from' },
					{ type: 'address', name: 'to' },
					{ type: 'uint256', name: 'tokenId' },
				],
				outputs: [],
			},
			{
				type: 'function',
				name: 'safeTransferFrom',
				constant: false,
				payable: false,
				inputs: [
					{ type: 'address', name: 'from' },
					{ type: 'address', name: 'to' },
					{ type: 'uint256', name: 'tokenId' },
					{ type: 'bytes', name: 'data' },
				],
				outputs: [],
			},
			{
				type: 'function',
				name: 'setApprovalForAll',
				constant: false,
				payable: false,
				inputs: [
					{ type: 'address', name: 'operator' },
					{ type: 'bool', name: 'approved' },
				],
				outputs: [],
			},
			{
				type: 'function',
				name: 'supportsInterface',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [{ type: 'bytes4', name: 'interfaceId' }],
				outputs: [{ type: 'bool' }],
			},
			{
				type: 'function',
				name: 'symbol',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [],
				outputs: [{ type: 'string' }],
			},
			{
				type: 'function',
				name: 'tokenURI',
				constant: true,
				stateMutability: 'view',
				payable: false,
				inputs: [{ type: 'uint256', name: 'tokenId' }],
				outputs: [{ type: 'string' }],
			},
			{
				type: 'function',
				name: 'transferFrom',
				constant: false,
				payable: false,
				inputs: [
					{ type: 'address', name: 'from' },
					{ type: 'address', name: 'to' },
					{ type: 'uint256', name: 'tokenId' },
				],
				outputs: [],
			},
			{
				type: 'function',
				name: 'updateListingFee',
				constant: false,
				stateMutability: 'payable',
				payable: true,
				inputs: [{ type: 'uint256', name: '_listingFee' }],
				outputs: [],
			},
		]

		// Create a new contract instance
		const contract = new ethers.Contract(contractAddress, contractABI, signer)

		// Convert price to Wei
		const priceInWei = ethers.utils.parseEther(price)

		// Send a transaction to mint the NFT
		const transaction = await contract.mintArtwork(metadataUri, priceInWei, {
			value: priceInWei, // This assumes your mintArtwork function also requires the msg.value to equal the price
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

			const metadata = {
				title,
				image: imageIpfsHash,
				price,
				userAddress, // Include the user address in the metadata
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
