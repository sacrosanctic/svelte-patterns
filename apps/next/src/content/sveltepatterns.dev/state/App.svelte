<input type="checkbox" id="state-toggle" hidden />
<label for="state-toggle"> Toggle state </label>
<div class="element">Controlled content</div>

<style>
	label {
		padding: 1em;
		border: 1px solid;
		cursor: pointer;

		&:hover {
			background-color: #fff3;
		}
	}

	.element {
		/* input unchecked */
		margin-top: 3rem;
		display: grid;
		place-items: center;
		width: 20em;
		height: 5em;
		border: 2px solid red;
		border-radius: 1em;
		background-color: #f004;
		text-align: center;
		rotate: 10deg;
		transition: all 0.3s;
	}

	#state-toggle:checked ~ .element {
		/* input checked */
		width: 8em;
		height: 10em;
		rotate: -10deg;
		border: 2px dashed blue;
		background-color: #00f4;
		border-radius: 0;
	}
</style>
