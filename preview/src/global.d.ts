declare global {
	interface ObjectConstructor {
		entries<T extends object>(o: T): Entries<T>
	}
}
