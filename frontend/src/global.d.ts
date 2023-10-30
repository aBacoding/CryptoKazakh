interface Window {
	ethereum?: {
		request: (arg: { method: string; params?: any[] }) => Promise<any>
		enable: () => Promise<string[]>
	}
	web3?: {
		eth: {
			getAccounts: () => Promise<string[]>
			currentProvider: any
		}
	}
}
