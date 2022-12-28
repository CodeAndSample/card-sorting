<script lang="ts">
	import ProjectCreationForm from './ProjectCreationForm.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ testTable, user } = data);
</script>

<div class="prose">
	<ProjectCreationForm />

	<div>Protected content for {user.email}</div>
	<p>server-side fetched data with RLS:</p>
	{#if testTable}
		{#each testTable as project}
			<p>
				<a href="/projects/{project.id}">{project.project_name}</a>
			</p>
		{/each}
	{/if}
	<pre>{JSON.stringify(testTable, null, 2)}</pre>
	<p>user:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</div>
