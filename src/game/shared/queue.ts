class Queue<T extends defined> {
    private items: T[]

	constructor(...items: T[]) {
        this.items = items
    }

    enqueue(item: T): Queue<T> {
        const newItems = [...this.items, item]
        return new Queue(...newItems)
    }

    dequeue(): Queue<T> {
		return new Queue(...this.items.filter((_, i) => i !== 0))
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
