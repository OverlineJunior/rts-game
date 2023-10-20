interface ServerScriptService extends Instance {
	server: Folder & {
		systems: Folder
	}
}

interface ReplicatedStorage extends Instance {
	client: Folder & {
		systems: Folder
	}
	shared: Folder & {
		systems: Folder
	}
}
