# TODO

## About the heightmap

Replicating such a large map to the client is a heavy task.

My proposal is to separate this system in 2 parts:

1. The guy that handles the raycasts to gather terrain information on request
2. The actual heightmap, generated with the raycast guy

With the system split like this:

1. The client could use the raycast, which always gets the latest information.
Since the client doesn't handle unit movement, it won't use it much, so no performance worries.
2. The server will still have performant access to the heightmap.

### Challenge

How will we keep the heightmap updated? Remember, it should be variable - if someone builds something, the
heightmap should reflect on that.

### Extra

Possibly the most important information the raycast guy could gather from the terrain: what kind of tall it is.

Could be divided in:

1. Water:   Water units
2. Ground   Ground and Flying units
3. Tall     Flying units
4. SkyTall  None
