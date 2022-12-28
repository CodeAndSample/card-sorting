

import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
export const prerender = false;


export const load: PageLoad = async (event) => {
	// export from event the params
	const { params } = event;
	const { session, supabaseClient } = await getSupabase(event);


	const { data: tableData } = await supabaseClient.from('surveys')
	.select('*')
	.eq('project_id', params.project_id);
	console.log("Test:"+tableData);

	const { data: projectData } = await supabaseClient.from('projects').select('*').eq('id', params.project_id);;
	console.log("Test:"+projectData);
	// 	return { tableData, user: session.user };

	let user;

	try {
		if (session.user) {
			user = session.user;
		}
	} catch (error) {
		user = null;
	}


	return {
		projectData,
		tableData,
		user: user
	};
};
