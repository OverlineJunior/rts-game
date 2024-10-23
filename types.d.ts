interface ServerScriptService extends Instance {
	server: Folder
}

interface ReplicatedStorage extends Instance {
	client: Folder
	shared: Folder
}
