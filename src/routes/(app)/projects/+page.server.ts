import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, invalid, redirect, type ValidationError } from '@sveltejs/kit';
import type { Actions } from './$types';
import { v4 as uuidv4 } from 'uuid';

export const actions: Actions = {
	createProject: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);

		if (!session.user) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}
		// we are save, let the user create the post
		const formData = await request.formData();

		// remove all line \r from a string
		const removeLineBreaks = (str) => {
			return str.replace(/(\r\n|\n|\r)/gm, '');
		};

		const title = formData.get('title');


		const items = formData.get('items').split('\n');

		// remove all line breaks from the items
		for (let i = 0; i < items.length; i++) {
			items[i] = removeLineBreaks(items[i]);
		}


		const open_sort = ((formData.get('open_sort') != null) ? true : false);
		const predefined_categories = ((formData.get('predefined_categories') != null) ? true : false);
		const categories = formData.get('categories').split('\n');

		// remove all line breaks from the items
		for (let i = 0; i < categories.length; i++) {
			categories[i] = removeLineBreaks(items[i]);
		}


		console.log(title);
		console.log(items);
		console.log(categories);
		console.log(open_sort);
		console.log(predefined_categories);

		// add one item at the begin of the categories array called "Uncategorized"
		categories.unshift('Uncategorized');


		
		// create an array of objects with the categories and the items in the categories 
		// put categories as name as objects and items as items as objects

		// for each value in the categories array create an object with the name of the category and an empty array for the items
		const data = categories.map((category: string) => {
			return {
				name: category,
				items: []
			};
		});

		// put all items in the first category of the data array
		for (let i = 0; i < items.length; i++) {
			data[0].items.push(items[i]);
		}



		


		const id: string = uuidv4();

		const { error: createProjectError, data: newProject } = await supabaseClient
			.from('projects')
			.insert([
				{
					id: id,
					project_name: title,
					created_by: session.user.id,
					open_sort: false,
					closed_sort: false,
					description: 'string',
					data: data,

					organisation: 'None'
				}
			]);

		if (createProjectError) {
			return invalid(500, {
				supabaseErrorMessage: createProjectError.message
			});
		}

		throw redirect(307, '/projects/' + id);
		return {
			newProject
		};
	},
	deleteProject: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);

		if (!session.user) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}
		// we are save, let the user create the post
		const formData = await request.formData();
		const content = formData.get('deleteContent');

		// delete project from project table and all related data from other tables with supabase based on the project id
		const { error: deleteProjectError } = await supabaseClient
			.from('projects')
			.delete()
			.eq('id', content);


		if (deleteProjectError) {
			return invalid(500, {
				supabaseErrorMessage: deleteProjectError.message
			});
		}
		return {
		};
	},

};




