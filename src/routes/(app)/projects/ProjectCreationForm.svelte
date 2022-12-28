<script lang="ts">
	// change the visbility of the element with the id "category-form" based on the value of the checkbox
	function toggleCategoryForm() {
		const categoryForm = document.getElementById('category-form');
		const checkbox = document.getElementById('predefined-categories');
		console.log(checkbox.checked);
		if (checkbox.checked) {
			categoryForm.style.visibility = 'visible';
			categoryForm.style.display = 'block';
		} else {
			// hide the element

			categoryForm.style.visibility = 'collapse';
			categoryForm.style.display = 'none';
		}
	}
</script>

<h2 class="h2">Hier können Sie ein Projekt erstellen</h2>
<form method="POST" action="?/createProject">
	<div class="form-control w-full max-w-xs">
		<label class="label">
			<span class="label-text">Name of the card-sorting project</span>
			<span class="label-text-alt">Alt label</span>
		</label>
		<input
			name="title"
			id="title"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
		/>
		<label class="label">
			<span class="label-text-alt">Alt label</span>
			<span class="label-text-alt">Alt label</span>
		</label>
	</div>
	<div class="form-control">
		<label class="label">
			<span class="label-text-alt">Items that have to be sorted</span>
			<span class="label-text-alt">Put every item in a new line</span>
		</label>
		<textarea class="textarea textarea-bordered h-24" placeholder="Item 1" name="items" />
	</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Have own categories</span>
			<span class="label-text-alt">This enables you to create own categories</span>

			<input
				type="checkbox"
				class="toggle"
				name="predefined_categories"
				id="predefined-categories"
				on:click={toggleCategoryForm}
			/>
		</label>
	</div>
	<div id="category-form">
		<div class="form-control">
			<label class="label">
				<span class="label-text">Categories for the card-sorting project</span>
				<span class="label-text-alt">Put every category in a new line</span>
			</label>
			<textarea
				class="textarea textarea-bordered h-24"
				placeholder="Category 1"
				name="categories"
			/>
		</div>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Open sort</span>
			<span class="label-text-alt">Nutzende sollen Kategorien erstellen können:</span>

			<input type="checkbox" checked="checked" class="checkbox" name="open_sort" />
		</label>
	</div>
	<div>
		<input type="submit" value="Submit" class="btn" />
	</div>
</form>

<style>
	#category-form {
		visibility: collapse;
		display: none;
	}
</style>
