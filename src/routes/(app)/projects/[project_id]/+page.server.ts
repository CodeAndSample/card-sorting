import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, invalid, redirect, type ValidationError } from '@sveltejs/kit';
import type { Actions } from './$types';
import { v4 as uuidv4 } from 'uuid';

export const actions: Actions = {
	createSurvey: async (event) => {
		console.log("test");
		const { request, params } = event;
		const {  supabaseClient } = await getSupabase(event);

	
		// we are save, let the user create the post
		const formData = await request.formData();
		const content = formData.get('createContent');
	
		// transform string to json object
		const jsonContent = JSON.parse(content);
		const id: string = uuidv4();
		console.log(content);
		const { error: createProjectError, data: newSurvey } = await supabaseClient
			.from('surveys')
			.insert([
				{
					id: id,
					project_id: params.project_id,
					data: jsonContent,

				}
			]);

		if (createProjectError) {
			return invalid(500, {
				supabaseErrorMessage: createProjectError.message
			});
		}

		throw redirect(307, "/projects/" + params.project_id +'/surveys/' + id);
		return {
			newSurvey
		};
	  },
	  deleteProject: async (event) => {
		const { request, params } = event;
		const { session, supabaseClient } = await getSupabase(event);

		if (!session.user) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}
		// print project id
		console.log(params.project_id);


		// get all surveys from the project
		const { data: projects, error: surveysError } = await supabaseClient
			.from('projects')
			.select('*')
			.eq('id', params.project_id);

		console.log(projects);


		// delete survey from survey table and all related data from other tables with supabase based on the survey id
		const { error: deleteProjectError } = await supabaseClient
			.from('projects')
			.delete()
			.eq('id', params.project_id);

		
		

	

		if (deleteProjectError) {
			console.info(deleteProjectError);
			return invalid(500, {
				supabaseErrorMessage: deleteProjectError.message
			});
		}

		throw redirect(307, "/projects/" );

		return {
			
		};	  },
		deleteSurveys: async (event) => {
			const { request } = event;
			const { session, supabaseClient } = await getSupabase(event);
	
			if (!session.user) {
				// the user is not signed in
				throw error(403, { message: 'Unauthorized' });
			}
			// we are save, let the user create the post
			const formData = await request.formData();
			const content = formData.get('content');
	
			// delete survey from survey table and all related data from other tables with supabase based on the survey id
			const { error: deleteSurveysError } = await supabaseClient
				.from('surveys')
				.delete()
				.eq('id', content);
	
	
	
			if (deleteSurveysError) {
				return invalid(500, {
					supabaseErrorMessage: deleteSurveysError.message
				});
			}
			return {
				
			};
		  }

};




