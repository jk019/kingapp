<script lang="ts">
	import Counter from './Counter.svelte';
	import crown from '$lib/images/crown.webp';
	import crownFallback from '$lib/images/crown.png';
	import type { RequestEvent } from '@sveltejs/kit';
	import type { PageLoad } from './$types';
	import { onMount } from 'svelte';

	// gets data from server
	/* let { data } = $props(); */
	export let data;

	//////////////////////////////////////
	// API - Calls
	/////////////////////////////////////

	async function submitGame(event: SubmitEvent) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;

		const body = {
			id_player_one: currentkingId,
			id_player_two: Number(form.id_player_two.value),
			score_player_one: Number(form.score_player_one.value),
			score_player_two: Number(form.score_player_two.value),
			kinggame: true
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

	// get the current king
	let currentkingName;
	let currentkingId;
	onMount(async () => {
		const res = await fetch('/api/king');
		const result = await res.json();

		if (result.success) {
			currentkingName = result.king;
			currentkingId = result.id;
			console.log('current king: ' + currentkingName);
		} else {
			console.error('Fehler:', result.error);
		}
	});

	// get last 10 king-games
	let kinggames;
	onMount(async () => {
		const res = await fetch('/api/kinggames');
		const result = await res.json();

		if (result.success) {
			kinggames = result.data;
		} else {
			console.error('Fehler:', result.error);
		}
	});
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

		{currentkingName}
	</h1>

	<br />
</section>

<section>
	<!-- <h2><b>record match </b></h2> -->
	<form onsubmit={submitGame}>
		<div class="form-fields">
			<select name="id_player_two" id="id_player_two" class="cool-select">
				<option disabled selected value> challenger </option>
				{#each data.Player as Player}
					<option value={Player.id}>{Player.name}</option>
				{/each}
			</select>

			<label>
				<!-- Score player one: -->
				<input
					class="score-input"
					placeholder="King"
					name="score_player_one"
					type="number"
					required
				/>
			</label>

			<label>
				<!-- Score player two: -->
				<input
					class="score-input"
					placeholder="P2"
					name="score_player_two"
					type="number"
					required
				/>
			</label>
		</div>

		<!-- Button-Wrapper mit Zentrierung -->
		<div class="button-wrapper">
			<button type="submit">Spiel speichern</button>
		</div>
	</form>
</section>

<section>
	<br />
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
			{#each kinggames as game}
				<tr>
					<td>{game.player_one.name}</td>
					<td>{game.score_player_one}</td>
					<td>{game.player_two.name}</td>
					<td>{game.score_player_two}</td>
				</tr>
			{/each}</tbody
		>
	</table>
</section>

<style>

section{
	padding-bottom: 4%;
}

	.button-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 1rem;
	}

	form .form-fields > * {
		flex: 0 1 auto;
	}
	form .form-fields select,
	form .form-fields input[type='number'] {
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
	width: 100%;
	border-collapse: separate;
	border-spacing: 0;
	font-family: 'Segoe UI', sans-serif;
	font-size: 0.9rem;
	background-color: #f8fafc; /* sehr helles Grau-Blau */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
	border-radius: 12px;
	overflow: hidden;
}

thead {
	background-color: #e2e8f0; /* Slate-200 */
}

th {
	text-align: left;
	padding: 12px 16px;
	color: #1e293b; /* Slate-800 */
	font-weight: 600;
	letter-spacing: 0.5px;
	border-bottom: 2px solid #cbd5e1; /* Slate-300 */
}

td {
	padding: 12px 16px;
	color: #334155; /* Slate-700 */
	border-bottom: 1px solid #e2e8f0;
}

tbody tr:nth-of-type(even) {
	background-color: #f1f5f9; /* Slate-100 */
}

tbody tr:hover {
	background-color: #e0f2fe; /* Light blue on hover */
	transition: background-color 0.3s;
}

td:last-of-type,
th:last-of-type {
	text-align: center;
}


	button {
		padding: 0.5rem 1rem;
		background-color: #afb7c3; /* Slate-500 */
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #8c96a5; /* Slate-600 */
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

	.cool-select {
		appearance: none;
		background-color: rgba(255, 255, 255, 0.6);
		color: #111;
		padding: 0.6em 2.5em 0.6em 1em;
		border: none;
		border-radius: 0.75em;
		font-size: 1rem;
		position: relative;
		cursor: pointer;
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		background-image:
			linear-gradient(45deg, transparent 50%, #555 50%),
			linear-gradient(135deg, #555 50%, transparent 50%);
		background-position:
			calc(100% - 1.2em) center,
			calc(100% - 0.9em) center;
		background-size: 0.5em 0.5em;
		background-repeat: no-repeat;
		transition: background 0.3s ease;
	}

	.cool-select:hover,
	.cool-select:focus {
		background-color: rgba(255, 255, 255, 0.75);
		outline: none;
	}

	.score-input {
		appearance: textfield;
		background-color: rgba(255, 255, 255, 0.6);
		color: #111;
		padding: 0.6em 1em;
		border: none;
		border-radius: 0.75em;
		font-size: 1.2rem;
		font-weight: bold;
		width: 8rem;
		text-align: center;
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		transition:
			background 0.3s ease,
			transform 0.2s ease;
	}

	.score-input:focus {
		outline: none;
		background-color: rgba(255, 255, 255, 0.75);
		transform: scale(1.03);
	}

	/* Remove arrows in number input for Chrome, Safari, Edge */
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Remove arrows in Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
