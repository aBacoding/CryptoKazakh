import axios from 'axios'
import FormData from 'form-data'

interface UploadResponse {
	success: boolean
	pinataURL?: string
	message?: string
}

export const uploadJSONToIPFS = async (
	JSONBody: Record<string, unknown>
): Promise<UploadResponse> => {
	const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
	// Use environment variables for sensitive data
	const key = process.env.REACT_APP_PINATA_KEY
	const secret = process.env.REACT_APP_PINATA_SECRET

	try {
		const response = await axios.post(url, JSONBody, {
			headers: {
				pinata_api_key: key || '',
				pinata_secret_api_key: secret || '',
			},
		})
		return {
			success: true,
			pinataURL: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
		}
	} catch (error) {
		console.error(error)
		return {
			success: false,
			message: (error as Error).message,
		}
	}
}

export const uploadFileToIPFS = async (file: File): Promise<UploadResponse> => {
	const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
	let data = new FormData()
	data.append('file', file)

	const metadata = JSON.stringify({
		name: 'testname',
		keyvalues: {
			exampleKey: 'exampleValue',
		},
	})
	data.append('pinataMetadata', metadata)

	const pinataOptions = JSON.stringify({
		cidVersion: 0,
		customPinPolicy: {
			regions: [
				{
					id: 'FRA1',
					desiredReplicationCount: 1,
				},
				{
					id: 'NYC1',
					desiredReplicationCount: 2,
				},
			],
		},
	})
	data.append('pinataOptions', pinataOptions)

	try {
		const response = await axios.post(url, data, {
			maxBodyLength: Infinity,
			headers: {
				'Content-Type': `multipart/form-data; boundary=${data.getBoundary()}`,
				pinata_api_key: process.env.REACT_APP_PINATA_KEY || '',
				pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET || '',
			},
		})
		console.log('Image uploaded:', response.data.IpfsHash)
		return {
			success: true,
			pinataURL: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
		}
	} catch (error) {
		console.error(error)
		return {
			success: false,
			message: (error as Error).message,
		}
	}
}
