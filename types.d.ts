interface ServerScriptService extends Instance {
	server: Folder & {
		systems: Folder
		inits: Folder
	}
}

interface ReplicatedStorage extends Instance {
	client: Folder & {
		systems: Folder
		inits: Folder
	}

	shared: Folder & {
		systems: Folder
	}
}
