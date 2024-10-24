class Queue<T> {
    private items: T[]

	constructor(...items: T[]) {
        this.items = items
    }

    enqueue(item: T): Queue<T> {
        return new Queue(...this.items, item)
    }

    dequeue(): Queue<T> {
		const [, ...newItems] = this.items || []
		return new Queue(...newItems)
    }

    isEmpty(): boolean {
        return this.items.size() === 0
    }

    size(): number {
        return this.items.size()
    }

    peek(): T | undefined {
        return this.items[0]
    }
}

export = Queue
