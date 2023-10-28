import React, { useState } from 'react'
import '../styles/Header.css'

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const handleMenuOpen = () => {
		setIsMenuOpen(true)
	}

	const handleMenuClose = () => {
		setIsMenuOpen(false)
	}

	return (
		<header className='header'>
			<div className='container'>
				<div className='header_section'>
					<a href='#' className='logo'>
						{' '}
						<img src='./assets/image/logo.png' alt='logo' />{' '}
					</a>
					<div className='menu_section'>
						<nav className='navigation'>
							<ul>
								<li>
									<a className='nav_list' href='#'>
										Home
									</a>
								</li>{' '}
								{}
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
							<a className='header_btn' href='#'>
								Connect Wallet
							</a>{' '}
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
							</span>{' '}
							{/* X button */}
							<ul>
								<li>
									<a className='nav_list' href='#'>
										Explore
									</a>
								</li>{' '}
								{}
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
							<a className='header_btn' href='#'>
								Connect Wallet
							</a>
						</nav>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
