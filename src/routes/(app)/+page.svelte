<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';

	export let form: ActionData;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
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

<div class="hero bg-base-200">
	<div class="hero-content text-center mt-4 mb-4">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Hello there</h1>
			<p class="py-6">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<button class="btn btn-primary">Get Started</button>
		</div>
	</div>
</div>

<section class="columns mt-6 pt-6">
	<div class="column is-half is-offset-one-quarter">
		<h2 class="title text-4xl">Sign in</h2>

		{#if form?.error}
			<div class="block notification is-danger">{form.error}</div>
		{/if}
		<form method="post" use:enhance={handleSubmit}>
			<div class="field form-control">
				<label for="email" class="label">Email</label>
				<p class="control">
					<input
						id="email"
						name="email"
						value={form?.values?.email ?? ''}
						class="input input-bordered"
						type="email"
						placeholder="Email"
						required
					/>
				</p>
			</div>
			<div class="field form-control">
				<label for="password" class="label">Password</label>
				<p class="control">
					<input
						id="password"
						name="password"
						class="input input-bordered"
						type="password"
						placeholder="Password"
						required
					/>
				</p>
			</div>
			<div class="field form-control mt-6">
				<p class="control">
					<button disabled={loading} class="button is-fullwidth is-link btn btn-primary"
						>Sign in</button
					>
				</p>
			</div>
		</form>

		<div class="mt-6">
			<p class="has-text-centered">
				Don't have an account? <a href="/signup">Sign up</a>
			</p>
		</div>
	</div>
</section>
