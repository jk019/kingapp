<script lang="ts">
	import Counter from './Counter.svelte';
	import crown from '$lib/images/crown.webp';
	import crownFallback from '$lib/images/crown.png';
	import type { RequestEvent } from '@sveltejs/kit';

	// gets data from server
	/* let { data } = $props(); */
	export let data;

	let king = data.King;

	// function to submit data to server
	async function submitGame(event: SubmitEvent) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;

		const body = {
			id_player_one: Number(form.id_player_one.value),
			id_player_two: Number(form.id_player_two.value),
			score_player_one: Number(form.score_player_one.value),
			score_player_two: Number(form.score_player_two.value),
			kinggame: form.kinggame.checked
		};

		const res = await fetch('/api/game', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		const result = await res.json();
		if (result.success) {
			alert('Spiel gespeichert!');
			location.reload();
		} else {
			alert('Fehler: ' + result.error);
		}
	}

	async function testdata () {
		console.log(data);
	}

	console.log(king);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="crown">
			<picture>
				<source srcset={crown} type="image/webp" />
				<img src={crownFallback} alt="crown" />
			</picture>
		</span>

		{#if king}
			{king}
		{:else}
			<p>Kein Königsspiel vorhanden.</p>
		{/if}
	</h1>

	<br />
</section>

<section>
	<h2><b>record match </b></h2>
	<form onsubmit={submitGame}>
		<div class="form-fields">
			<label for="id_player_one">Player one:</label>
			<select name="id_player_one" id="id_player_one">
				<option disabled selected value> -- select player </option>
				{#each data.Player as Player}
					<option value={Player.id}>{Player.name}</option>
				{/each}
			</select>

			<label for="id_player_two">Player two:</label>
			<select name="id_player_two" id="id_player_two">
				<option disabled selected value> -- select player </option>
				{#each data.Player as Player}
					<option value={Player.id}>{Player.name}</option>
				{/each}
			</select>

			<label>
				Score player one:
				<input name="score_player_one" type="number" required />
			</label>

			<label>
				Score player two:
				<input name="score_player_two" type="number" required />
			</label>

			<label>
				Kinggame:
				<input name="kinggame" type="checkbox" />
			</label>
		</div>

		<button type="submit">Spiel speichern</button>
	</form>

	<!-- 	<br />
	<h2><b>record match (future design)</b></h2>

	<div class="grid grid-cols-3 gap-4">
		<div class="p-4">
			<label for="cars">Choose a player:</label>
			<select name="cars" id="cars">
				{#each data.Player as Player}
					<option value={Player.name}>{Player.name}</option>
				{/each}
			</select>
		</div>
		<div class="p-4">Points king <Counter /></div>
		<div class="p-4">Points challenger <Counter /></div>
	</div> -->
</section>

<section>
	<br />
	<h2><b>previous king matches</b></h2>
	<table>
		<thead>
			<tr>
				<th scope="col">Player one</th>
				<th scope="col">Score player one</th>
				<th scope="col">Player two</th>
				<th scope="col">Score player two</th>
			</tr>
		</thead>
		<tbody>
			{#each data.PreviousMatches as game}
				<tr>
					<td>{game.player_one.name}</td>
					<td>{game.score_player_one}</td>
					<td>{game.player_two.name}</td>
					<td>{game.score_player_two}</td>
				</tr>
			{/each}</tbody
		>
	</table>

	<button onclick={testdata}>
		trigger request
	</button>
</section>

<style>
	form .form-fields > * {
	flex: 0 1 auto;
}
form .form-fields select,
form .form-fields input[type="number"] {
	width: 8rem;
}
form .form-fields label {
	white-space: nowrap;
}

	form .form-fields {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		align-items: center;
	}

	form button {
		margin-top: 1rem;
	}

	table {
		border-collapse: collapse;
		border: 2px solid rgb(140 140 140);
		font-family: sans-serif;
		font-size: 0.8rem;
		letter-spacing: 1px;
	}

	thead {
		background-color: rgb(228 240 245);
	}

	th,
	td {
		border: 1px solid rgb(160 160 160);
		padding: 8px 10px;
	}

	td:last-of-type {
		text-align: center;
	}

	tbody > tr:nth-of-type(even) {
		background-color: rgb(237 238 242);
	}

	button {
		padding: 0.5rem 1rem;
		background-color: #1e90ff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #1c86ee;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.crown {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.crown img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		object-fit: contain;
		display: block;
	}
</style>
