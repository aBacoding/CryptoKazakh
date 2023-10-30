import blockies from 'ethereum-blockies'
import React, { useEffect, useState } from 'react'
import '../styles/Header.css'

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [userAddress, setUserAddress] = useState<string | null>(null)
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
		setUserAddress(null)
		setAvatar(null)
		setUploadedAvatar(null)
		localStorage.removeItem('isConnected')
	}

	return (
		<header className='header'>
			<div className='container'>
				<div className='header_section'>
					<a href='#' className='logo'>
						<img src='./assets/image/logo.png' alt='logo' />
					</a>
					<div className='menu_section'>
						<nav className='navigation'>
							<ul>
								<li>
									<a className='nav_list' href='#'>
										Home
									</a>
								</li>
								<li>
									<a className='nav_list' href='#'>
										Explore
									</a>
								</li>
								<li>
									<a className='nav_list' href='#'>
										Create
									</a>
								</li>
								<li>
									<a className='nav_list' href='#'>
										MyNFTs
									</a>
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
									<a className='nav_list' href='#'>
										Explore
									</a>
								</li>
								<li>
									<a className='nav_list' href='#'>
										Collections
									</a>
								</li>
								<li>
									<a className='nav_list' href='#'>
										Creators
									</a>
								</li>
								<li>
									<a className='nav_list' href='#'>
										MyNFTs
									</a>
								</li>
							</ul>
							<a className='header_btn' onClick={connectWallet}>
								{userAddress ? 'Connected' : 'Connect Wallet'}
							</a>
						</nav>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
