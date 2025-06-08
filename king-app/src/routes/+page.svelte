<script lang="ts">
	import Counter from './Counter.svelte';
	import crown from '$lib/images/crown.webp';
	import crownFallback from '$lib/images/crown.png';
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

		Current King:<br />Janissss
https://svelte-grid.vercel.app/
	</h1>

	<br />
	<h2><b>record match</b></h2>

	<!-- src/routes/+page.svelte -->
	<div class="grid grid-cols-3 gap-4">
		<div class="bg-blue-200 p-4">Select player</div>
		<div class="p-4">Points king <Counter /></div>
		<div class="p-4">Points challenger <Counter /></div>
	</div>
	<button>submit</button>

	<br />
	<h2>previous matches</h2>
</section>

<style>

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
