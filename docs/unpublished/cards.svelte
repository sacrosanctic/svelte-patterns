<script>
	// Initial deck (simplified)
	let suits = ['♠', '♣', '♥', '♦']
	let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

	// Pure fn
	const createDeck = () => suits.flatMap((suit) => ranks.map((rank) => ({ suit, rank })))

	// Create deck
	let deck = $state(createDeck())
	let hand = $state([])
	let playedCards = $state([])

	// Mutable fn
	const shuffle = () => {
		for (let i = deck.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1))
			;[deck[i], deck[j]] = [deck[j], deck[i]]
		}
	}
	const drawCard = () => deck.length && hand.push(deck.pop())
	const playCard = (index) => hand[index] && playedCards.push(hand.splice(index, 1)[0])
	function resetGame() {
		hand = []
		playedCards = []

		deck = createDeck()
		shuffle()
	}
</script>

<button onclick={() => (deck = shuffle(deck))}>Shuffle Deck</button>
<button onclick={drawCard} disabled={!deck.length}>Draw Card</button>
<button onclick={resetGame}>Reset</button>

<h3>Hand</h3>
<ul>
	{#each hand as card, i}
		<li>
			{card.rank}{card.suit} <button onclick={() => playCard(i)}>Play</button>
		</li>
	{/each}
</ul>

<h3>Played Cards</h3>
<ul>
	{#each playedCards as card}
		<li>{card.rank}{card.suit}</li>
	{/each}
</ul>

<h3>Deck: {deck.length} cards left</h3>
{JSON.stringify(deck)}
