import { ethers } from 'hardhat'

async function main() {
	// This will actually compile our contract and generate the necessary files we need to work with our contract under the artifacts directory.
	const TrendingItems = await ethers.getContractFactory('TrendingItems')

	// Here we deploy the contract
	const trendingItems = await TrendingItems.deploy()

	// Wait for it to be deployed
	await trendingItems.deployed()

	console.log('TrendingItems deployed to:', trendingItems.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
