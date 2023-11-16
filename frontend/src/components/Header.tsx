import blockies from 'ethereum-blockies'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import '../styles/Header.css'

interface HeaderProps {
	userAddress: string | null
	setUserAddress: React.Dispatch<React.SetStateAction<string | null>>
}

const Header: React.FC<HeaderProps> = ({ userAddress, setUserAddress }) => {
	const handleMyNFTsClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		if (!userAddress) {
			e.preventDefault()
			// Assuming you want to alert the user first
			alert('Please connect your wallet to access MyNFTs.')
		}
	}

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [avatar, setAvatar] = useState<string | null>(null)
	const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null)

	const handleMenuOpen = () => {
		setIsMenuOpen(true)
	}

	const handleMenuClose = () => {
		setIsMenuOpen(false)
	}

	const SEPOLIA_CHAIN_ID = '0xaa36a7'
	const connectWallet = async () => {
		if (typeof window.ethereum !== 'undefined') {
			try {
				const accounts: string[] = await window.ethereum.request({
					method: 'eth_requestAccounts',
				})

				const chainId = await window.ethereum.request({ method: 'eth_chainId' })

				if (chainId !== SEPOLIA_CHAIN_ID) {
					alert('Please connect using the Sepolia testnet.')
					disconnectWallet() // Disconnect the wallet if it's not on Sepolia
					return
				}

				setUserAddress(accounts[0])

				const savedAvatar = localStorage.getItem(`avatar_${accounts[0]}`)
				if (savedAvatar) {
					setUploadedAvatar(savedAvatar)
				} else {
					const avatarDataURL = blockies
						.create({ seed: accounts[0] })
						.toDataURL()
					setAvatar(avatarDataURL)
				}

				localStorage.setItem('isConnected', 'true')
			} catch (error) {
				console.error('User denied account access')
			}
		} else {
			alert('Please install MetaMask to connect your wallet.')
		}
	}

	useEffect(() => {
		if (localStorage.getItem('isConnected') === 'true') {
			connectWallet()
		}
	}, [])

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0]
		if (file) {
			const reader = new FileReader()

			reader.onloadend = () => {
				const base64String = reader.result as string
				setUploadedAvatar(base64String)
				if (userAddress) {
					localStorage.setItem(`avatar_${userAddress}`, base64String)
				}
			}

			reader.readAsDataURL(file)
		}
	}

	useEffect(() => {
		if (userAddress) {
			const savedAvatar = localStorage.getItem(`avatar_${userAddress}`)
			if (savedAvatar) {
				setUploadedAvatar(savedAvatar)
			}
		}
	}, [userAddress])

	const avatarToDisplay = uploadedAvatar || avatar

	const disconnectWallet = () => {
		const userConfirmation = window.confirm(
			'Do you want to disconnect from your wallet?'
		)
		if (userConfirmation) {
			// If user confirms, proceed with disconnection
			setUserAddress(null)
			setAvatar(null)
			setUploadedAvatar(null)
			localStorage.removeItem('isConnected')

			// Redirect to the home page
			window.location.href = '/'
		}
	}

	return (
		<header className='header'>
			<div className='container'>
				<div className='header_section'>
					<a href='/' className='logo'>
						<img src='./assets/image/logo.png' alt='logo' />
					</a>
					<div className='menu_section'>
						<nav className='navigation'>
							<ul>
								<li>
									<Link to='/' className='nav_list'>
										Home
									</Link>
								</li>
								<li>
									<Link className='nav_list' to='/explore'>
										Explore
									</Link>
								</li>
								<li>
									<Link
										className='nav_list'
										to='/mynfts'
										onClick={handleMyNFTsClick}
									>
										MyNFTs
									</Link>
								</li>
							</ul>
						</nav>
						<div>
							{avatarToDisplay && (
								<>
									<img
										src={avatarToDisplay}
										alt='User Avatar'
										style={{
											width: '40px',
											height: '40px',
											borderRadius: '50%',
											marginRight: '20px',
											cursor: 'pointer',
										}}
										onClick={() =>
											document.getElementById('avatarInput')?.click()
										}
									/>
									<input
										type='file'
										id='avatarInput'
										style={{ display: 'none' }}
										accept='image/*'
										onChange={handleAvatarChange}
									/>
								</>
							)}
							<a
								className='header_btn'
								onClick={userAddress ? disconnectWallet : connectWallet}
							>
								{userAddress ? (
									<>
										Connected{' '}
										<span style={{ fontSize: '0.8em', fontWeight: 'bold' }}>
											{userAddress.substring(0, 6)}...{userAddress.slice(-4)}
										</span>
									</>
								) : (
									'Connect Wallet'
								)}
							</a>
						</div>
					</div>
					<div className='hamburger_menu'>
						<input type='checkbox' id='menu' />
						<label
							htmlFor='menu'
							className='humburger'
							onClick={handleMenuOpen}
						>
							&#9776;
						</label>
						<nav
							className={`hamburger_menu_navigation ${
								isMenuOpen ? 'open' : ''
							}`}
						>
							<span className='close_button' onClick={handleMenuClose}>
								&times;
							</span>
							<ul>
								<li>
									<Link to='/' className='nav_list'>
										Home
									</Link>
								</li>
								<li>
									<Link className='nav_list' to='/explore'>
										Explore
									</Link>
								</li>
								<li>
									<Link
										className='nav_list'
										to='/mynfts'
										onClick={handleMyNFTsClick}
									>
										MyNFTs
									</Link>
								</li>
							</ul>
							<div>
								{avatarToDisplay && (
									<>
										<img
											src={avatarToDisplay}
											alt='User Avatar'
											style={{
												width: '40px',
												height: '40px',
												borderRadius: '50%',
												marginRight: '20px',
												cursor: 'pointer',
											}}
											onClick={() =>
												document.getElementById('avatarInput')?.click()
											}
										/>
										<input
											type='file'
											id='avatarInput'
											style={{ display: 'none' }}
											accept='image/*'
											onChange={handleAvatarChange}
										/>
									</>
								)}
								<a
									className='header_btn'
									onClick={userAddress ? disconnectWallet : connectWallet}
								>
									{userAddress ? (
										<>
											Connected{' '}
											<span style={{ fontSize: '0.8em', fontWeight: 'bold' }}>
												{userAddress.substring(0, 6)}...{userAddress.slice(-4)}
											</span>
										</>
									) : (
										'Connect Wallet'
									)}
								</a>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
