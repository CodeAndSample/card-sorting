<script lang="ts">
	import type { PageData } from './$types';
	import { baskets } from '$lib/store';
	import DragDropComponent from '$lib/components/DragDropComponent.svelte';

	export let data: PageData;

	let storeVariable: string;

	// function that updates the store
	function updateStoreVariable() {
		storeVariable = JSON.stringify($baskets, null, 2);
		console.info('storeVariable', storeVariable);

		// update the store with tableData.data
	}

	// await project data

	$: ({ tableData, projectData, user } = data);

	// set $baskets to data.projectData[0].data
	if (data.projectData[0].data) {
		$baskets = data.projectData[0].data;
	}
</script>

<!-- check whether user is not "no user" -->

<p>server-side fetched data with RLS:</p>
{#each tableData as survey, index}
	<p>
		<a href="/projects/{survey.project_id}/surveys/{survey.id}">Survey {index + 1}</a>
	</p>
{/each}
<DragDropComponent />

<form method="POST" action="?/createSurvey">
	<input
		type="hidden"
		name="createContent"
		value={storeVariable}
		id="content"
		cols="30"
		rows="10"
	/>

	<button
		type="submit"
		on:mouseover={updateStoreVariable}
		on:focus={updateStoreVariable}
		class="btn btn-primary">Submit</button
	>
</form>

{#if user}
	<h2>Protected content for {user.email}</h2>

	<h2>Hier können Sie ein Projekt löschen</h2>

	<form method="POST" action="?/deleteProject">
		<button type="submit" class="btn btn-error">Submit</button>
	</form>

	<h2>Hier können Sie alle Umfragen löschen</h2>

	<form method="POST" action="?/deleteSurveys">
		<button type="submit" class="btn btn-warning">Submit</button>
	</form>

	<p>ProjectData:</p>

	<pre>{JSON.stringify(projectData, null, 2)}</pre>
	<p>SurveyData:</p>

	<pre>{JSON.stringify(tableData, null, 2)}</pre>
	<p>user:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
{/if}
