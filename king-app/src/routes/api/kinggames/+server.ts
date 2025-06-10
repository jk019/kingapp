// src/routes/api/kinggames/+server.ts
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function GET() {
	const { data: kinggames, error } = await supabase
		.from('Game')
		.select(`
      *,
      player_one: id_player_one ( id, name ),
      player_two: id_player_two ( id, name )
    `)
		.eq('kinggame', true)
		.order('created_at', { ascending: false })
		.limit(10);

	if (error) {
		console.error('Fehler beim Abrufen der Kinggames:', error);
		return json({ success: false, error: error.message }, { status: 500 });
	}

	return json({ success: true, data: kinggames });
}
