const names = [
	'Apple',
	'Banana',
	'Cherry',
	'Date',
	'Elderberry',
	'Fig',
	'Grape',
	'Honeydew',
	'Iced Fruit',
	'Jackfruit',
	'Kiwi',
	'Lemon',
	'Mango',
	'Nectarine',
	'Orange',
	'Papaya',
	'Quince',
	'Raspberry',
	'Strawberry',
	'Tangerine',
	'Uva',
	'Vanilla',
	'Watermelon',
	'Xigua',
	'Yam',
	'Zucchini',
]

export const db = Array.from({ length: names.length * 4 }).map((_, i) => {
	return {
		id: i + 1,
		name: names[i % names.length],
	}
})
