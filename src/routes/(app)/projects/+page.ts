import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: PageLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/');
	}

	const { data: testTable } = await supabaseClient.from('projects').select('*');

	// const { data: tableData } = await getSupabaseClient().from('projects').select('*');
	// 	return { tableData, user: session.user };


	return {
		testTable,
		user: session.user
	};
};
