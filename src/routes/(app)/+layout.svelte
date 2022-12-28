<script lang="ts">
	import Navigation from '../../lib/components/Navigation.svelte';

	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	let loading = false;

	const handleLogout: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<svelte:head>
	<title>Email and Password Demo - Supabase Auth Helpers</title>
</svelte:head>

<div class="p-4 preview bg-cover bg-top" style="background-size: 5px 5px">
	<Navigation />

	<main class="flex-col w-full border-opacity-50  border-base-300  flex pt-4">
		<div class="grid card rounded-box place-items-center bg-white">
			{#if $page.data.session}
				<form action="/logout" method="post" use:enhance={handleLogout}>
					<button disabled={loading} type="submit">Sign out</button>
				</form>
			{/if}
		</div>
		<div class="divider" />
		<div class="grid rounded-box p-4 bg-base-100"><slot /></div>
	</main>
</div>

<style>
	.preview {
		background-image: radial-gradient(hsla(var(--bc) / 0.2) 0.5px, hsla(var(--b2) / 1) 0.5px);
	}
</style>
