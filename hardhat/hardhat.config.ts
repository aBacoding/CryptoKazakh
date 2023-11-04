import '@nomiclabs/hardhat-waffle'
import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'

dotenv.config()

const config: HardhatUserConfig = {
	solidity: '0.8.0',
	networks: {
		sepolia: {
			url: process.env.INFURA_URI,
			accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
		},
	},
}

export default config
