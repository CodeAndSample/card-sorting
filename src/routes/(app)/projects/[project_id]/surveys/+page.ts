import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
export const prerender = false;

interface ProjectsTable {
	id: string;
	created_at: string;
	project_name: string;
	created_by: string;
	open_sort: boolean;
	closed_sort: boolean;
	description: string;
	categories: [];
	organisation: string;
}

export const load: PageLoad = async (event) => {
	const { params } = event;
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: tableData } = await supabaseClient.from('surveys')
		.select('*')
		.eq('project_id', params.project_id);

	// if tableData is not null, then return the data
	// if (tableData)
	// 	if (params.project_id === tableData.id) {
	// 		return {
	// 			title: 'Hello world!',
	// 			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
	// 		};
	// 	}
	return { tableData, user: session.user };
};

